const fs = require('fs')
const path = require('path')

//write log
function writeLog(writeStream, log){
    writeStream.write(log + '\n')
}

//create write stream
function createWriteStream(filename){
    const fullFileName = path.join(__dirname, '../','../','logs',filename)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags:'a'
    })
    return writeStream
}

//write access log
const accessWriteStream = createWriteStream('access.log');
function access(log){
    writeLog(accessWriteStream,log)
}

module.exports={ access }