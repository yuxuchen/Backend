const {login} = require ('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const {set} = require('../db/redis')



const handleUserRouter = (req, res) =>{
    const method = req.method;

    if(method === 'POST' && req.path === '/api/user/login'){
        console.log('req.body', req.body)
        const {username, password} = req.body;
        const result = login(username, password)
        return result.then(data =>{
            if(data.username){
                //set session
                req.session.username = data.username;
                req.session.realname = data.realname;
                //synchronize to redis
                set(req.sessionId, req.session)
                console.log('req.session is', req.session)
                return new SuccessModel()
            }
            return new ErrorModel('fail to login in!')
        })
    }

    //login test
    if (method === 'GET' && req.path === '/api/user/login-test'){
        console.log('req.session.username',req.session.username)
        if(req.session.username){
            return Promise.resolve(new SuccessModel({session: req.session}))
        }
        return Promise.resolve(new ErrorModel('not login!'))
    }
}

module.exports = handleUserRouter