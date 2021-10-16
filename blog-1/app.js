const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {get, set} = require('./src/db/redis')
const {access} = require('./src/utils/log')
const {URLSearchParams} = require('url')

//   // session data
// const SESSION_DATA = {}

const getCookieExpires = () =>{
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000) )
    console.log('d toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

//deal with post data
const getPostData = (req) =>{
    const promise = new Promise((resolve, reject)=>{
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = '';
        req.on('data', chunk =>{
            postData += chunk.toString()
        })
        req.on('end', ()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        }) 
    })
    return promise
}

const serverHandler = (req, res) => {
    res.setHeader('Content-type', 'application/json');
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    //acquire url
    const url = req.url;
    req.path = url.split('?')[0];

    //parse url
    const paraToObject = (entries) => {
        const result = {};
        for (const [key, value] of entries){
            result[key] = value;
        }
        return result
    }

    const q = new URLSearchParams(url.split('?')[1]);
    const query = q.entries();
    req.query = paraToObject(query)

  
    
    // parse url
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item =>{
        if(!item){
            return
        }
        const arr = item.split('=')
        const key = arr[0];
        const val = arr[1];
        req.cookie[key] = val;
        console.log('req.cookie is',req.cookie)
    })
    
    // //parse session
    // let needSetCookie = false
    // let userId = req.cookie.userId
    // console.log('userId', req.cookie.userId)
    // if (userId){
    //     if(!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {}
    //     }
    // }else{
    //     needSetCookie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]
    // console.log('session_data', SESSION_DATA[userId])

    //parse session by using redis
     let needSetCookie = false
     let userId = req.cookie.userId
     if(!userId){
         needSetCookie = true
         userId = `${Date.now()}_${Math.random()}`
         //initialize session value in redis
         set(userId, {})
     }

     //acquire session
    req.sessionId = userId;
    console.log("req.sessionId", req.sessionId)
    get(req.sessionId).then(sessionData =>{
        console.log('sessionData',sessionData)
        if (sessionData == null){
            //initialize session value in redis
            set(req.sessionId, {})
            req.session = {}
        }else{
            //set session
            req.session = sessionData
        }
        console.log('req.session',req.session)
        //deal with post data
        return getPostData(req)
    })
        .then(postData => {
        req.body = postData
    

        //blog router
        // const blogData = handleBlogRouter(req,res)
        // if (blogData){
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        // return
        // }
        const blogResult = handleBlogRouter(req,res)
        if (blogResult){

            blogResult.then(blogData =>{
                if (needSetCookie){
                    //set cookies
                res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}` )
                }
                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //user router
        // const userData = handleUserRouter(req,res)
        // if (userData){
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        // return
        // }
        const userResult = handleUserRouter(req, res)
            if(userResult){
                userResult.then(userData => {
                    if (needSetCookie){
                        //set cookies
                    res.setHeader('Set-Cookie', `userId=${userId}; path=/; httpOnly; expires=${getCookieExpires()}` )
                    }
                    res.end(
                        JSON.stringify(userData)
                    )
                })
                return
        }
        
        //router not found
       res.writeHead(404, {'Content-type':'text/plain'})
       res.write('404 page not found');
       res.end()
    })
}

module.exports = serverHandler