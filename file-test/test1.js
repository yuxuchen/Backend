const fs = require('fs');
const path = require('path')

const filename = path.resolve(__dirname, 'data.txt')

//read file
// fs.readFile(filename, (err, data)=>{
//     if(err){
//         console.log(err)
//         return
//     }
//     //data is binary should be converted to a string
//     console.log(data.toString())
// }) 

//write file
// const content = ' \t write new content\n';
// const opt={
//     flag: 'a' //append new content, cover by using flag = 'w'
// }
// fs.writeFile(filename, content, opt, (err)=>{
//     if(err){
//         console.error(err)
//     }
// })

//judge if content exist
fs.access(filename + '1' , fs.constants.F_OK, (err) => {
    console.log(`${err ? 'does not exist' : 'exists'}`)
})