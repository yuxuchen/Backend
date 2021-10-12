const {
    getList, 
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const handleBlogRouter = (req, res) =>{
    const method = req.method;
    const id = req.query.id
   
    // get blog list
    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        //const listData = getList(author, keyword);
        //return new SuccessModel(listData)
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
        // const data = newBlog(req.body)
        // return new SuccessModel(data)

        const author = 'zhang';
        req.body.author = author;
        const result = newBlog(req.body);
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    //update blog
    if(method === 'POST' && req.path === '/api/blog/update'){
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
        const author = 'zhang';
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