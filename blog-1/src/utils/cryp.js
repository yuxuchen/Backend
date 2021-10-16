const crypto = require('crypto')

//secret key
const SECRET_KEY = 'Wjiol_8776#'

//md5 encrypt
function md5(content){
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

//encrypt function
function genPassword(password){
    const str = `password= ${password} & key = ${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassword
}