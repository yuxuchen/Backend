const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: 'titleA',
            content: 'contentA',
            createTime: 12334556,
            author: 'iris'
        },
        {
            id: 2,
            title: 'titleB',
            content: 'contentB',
            createTime: 12334556,
            author: 'liz'
        },
    ]
}

const getDetail = (id) => {
    //return fake data
    return {
        id: 1,
        title: 'titleA',
        content: 'contentA',
        createTime: 12334556,
        author: 'iris'
    }
}

const newBlog = (blogData = {}) =>{
    //blogData is an object, contains title content attribute
    return{
        id:3 //the id of new blog is 3
    }
}

const updateBlog = (id, blogData = {}) => {
    //id is the blog need update
    //blogData is an object need title and content
    console.log('update blog', id, blogData)
    return true
}

const delBlog = (id) =>{
//id is the blog need to be deleted
    return true
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}