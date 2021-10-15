const fs =require('fs')
const path = require('path')
const readline = require('readline')

//filename 
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

//read stream
const readStream = fs.createReadStream(fileName)

//readline
const rl = readline.createInterface({
    input:readStream
})
let sum = 0;
let chromeNum=0;

//readline and calculate sum of lines
rl.on('line', (lineData)=>{
    if(!lineData){
        return
    }
    sum++
    const arr =lineData.split('--')
    if(arr[2] && arr[2].indexOf('Chrome')>0){
        chromeNum++
    }
})

//finish listening
rl.on('close',()=>{
    console.log('percentage of chrome: ', + chromeNum/sum)
})