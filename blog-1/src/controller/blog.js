const {exec} = require('../db/mysql')
const xss = require('xss') 

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1`;
    if(author) {
        sql += ` and author = '${author}' `
    }
    if(keyword){
        sql += `and title like %${keyword}%`
    }
    sql += ` order by createtime desc;`
    //return promise
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from blogs where id = '${id}'`
    return exec(sql).then(rows =>{
        return rows[0]
    })
}

const newBlog = (blogData = {}) =>{
    //blogData is an object, contains title content attribute
    const title = xss(blogData.title);
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now();

    const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createTime}, '${author}')
    `

    return exec(sql).then(insertData =>{
        console.log('insertData is', insertData)
        return{
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    //id is the blog need update
    //blogData is an object need title and content
    const title = blogData.title;
    const content = blogData.content;

    const sql = `
    update blogs set title = '${title}', content = '${content}' where id = '${id}'
    `
    return exec(sql).then(updateData => {
        console.log('updateData is', updateData)
        if(updateData.affectedRows >0 ){
            return true
        }
        return false
    })
}

const delBlog = (id, author) =>{
//id is the blog need to be deleted
    const sql = `delete from blogs where id='${id}' and author= '${author}';`
    console.log(sql)
    return exec(sql).then(delData => {
        console.log(delData)
        if (delData.affectedRows >0){
            return true
        }
        return false
    })
}



module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}