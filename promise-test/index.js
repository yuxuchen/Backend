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
        const fullFileName = path.resolve(__dirname,'/files', fileName)
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

// getFileContent('a.json')
// .then(aData => {
//     console.log('a data', aData)
//     return getFileContent(aData.next)
// })
// .then(bData =>{
//     console.log('b data', bData)
//     return getFileContent(bData.next)
// })
// .then(cData =>{
//     console.log('c data', cData)
// })

async function readFileData() {
        try{
            const aData = await getFileContent('a.json')
        console.log('a data', aData)
        const bData = await getFileContent('b.json')
        console.log('b data', bData)
        const cData = await getFileContent('c.json')
        console.log('c data', cData)
        }catch(err){
            console.error(err)
        }
        
    
}

 readFileData()

// async function readAData() {
//     const aData = await getFileContent('a.json')
//     return aData
// }
// async function test(){
//     const aData = await readAData()
//     console.log(aData)
// }

// test()