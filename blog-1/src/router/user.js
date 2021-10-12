const {login} = require ('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');


const handleUserRouter = (req, res) =>{
    const method = req.method;

    if(method === 'GET' && req.path === '/api/user/login'){
        const {username, password} = req.query;
        const result = login(username, password)
        return result.then(data =>{
            if(data.username){
                //set session
                req.session.username = data.username;
                req.session.realname = data.realname;
                console.log('req.session is', req.session)
                return new SuccessModel()
            }
            return new ErrorModel('fail to login in!')
        })
    }

    //login test
    if (method === 'GET' && req.path === '/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(new SuccessModel({session :req.session}))
        }
        return Promise.resolve(new ErrorModel('not login!'))
    }
}

module.exports = handleUserRouter