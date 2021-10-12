const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {URLSearchParams} = require('url')
const { EDESTADDRREQ } = require('constants')

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

    // session data
    const SESSION_DATA = {}
    
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
    })
    
    //parse session
    let needSetCookie = false
    let userId = req.cookie.userId
    if (userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
    }else{
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    //deal with post data
    getPostData(req).then(postData => {
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