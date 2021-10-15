const {
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

//unified login verify
const loginCheck = (req) => {
    if(!req.session.username){
        return Promise.resolve(
            new ErrorModel('not login!')
        )
    }
}

const handleBlogRouter = (req, res) =>{
    const method = req.method;
    const id = req.query.id
   
    // get blog list
    if(method === 'GET' && req.path === '/api/blog/list'){
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''
        //const listData = getList(author, keyword);
        //return new SuccessModel(listData)

        if(req.query.isadmin){
            //admin page
          const loginCheckResult = loginCheck(req)
          if(loginCheckResult){
          //not login
            return loginCheck
      }
        author = req.session.username
        }
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    //Get details
    if(method === 'GET' && req.path === '/api/blog/detail'){
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //new blog
    if(method === 'POST' && req.path === '/api/blog/new'){
      const loginCheckResult = loginCheck(req)
      if(loginCheckResult){
          //not login
          return loginCheckResult
      }
        req.body.author = req.session.username;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //update blog
    if(method === 'POST' && req.path === '/api/blog/update'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
          //not login
          return loginCheckResult
      }
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('fail to update the blog')
            }
        })
    }

    //delete blog
    if(method === 'POST' && req.path === '/api/blog/del'){
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
          //not login
          return loginCheckResult
      }
        const author = req.session.username;
        const result = delBlog(id, author)
        return result.then(val =>{
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('fail to delete the model')
            }
        })
        
    }
}

module.exports = handleBlogRouter;