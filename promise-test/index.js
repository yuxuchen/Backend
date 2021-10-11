const { SSL_OP_EPHEMERAL_RSA } = require('constants');
const fs = require('fs');
const path = require('path');


// //callback method to gain file content
// function getFileContent(fileName, callback){
//     const fullFileName = path.resolve(__dirname, 'files', fileName)
//     fs.readFile(fullFileName, (err, data) =>{
//         if(err){
//             console.error(err)
//             return
//         }
//         callback(
//             JSON.parse(data.toString())
//         )
//     })
// }

// //test 
// getFileContent('a.json', aData => {
//     console.log('a data', aData)
//     getFileContent(aData.next, bData =>{
//         console.log('b data', bData);
//         getFileContent(bData.next, cData =>{
//             console.log('c data', cData)
//         })
//     })
// })

//use promise
function getFileContent(fileName){
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, 'files', fileName)
        fs.readFile(fullFileName, (err, data) =>{
            if(err){
                reject(err)
                return
            }
            resolve(
                JSON.parse(data.toString())
            )
        })
    })
    return promise
}

getFileContent('a.json')
.then(aData => {
    console.log('a data', aData)
    return getFileContent(aData.next)
})
.then(bData =>{
    console.log('b data', bData)
    return getFileContent(bData.next)
})
.then(cData =>{
    console.log('c data', cData)
})

//
