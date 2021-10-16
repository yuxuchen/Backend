const redis = require('redis')

//create server
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err =>{
    console.error(err)
})

//test
redisClient.set('myname', 'lili', redis.print)
redisClient.get('myname', (err, val) =>{
    if(err){
        console.error(err)
        return
    }
    console.log('val', val)

    //quit
    redisClient.quit()
})