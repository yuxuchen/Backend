
const http = require('http');
const {URLSearchParams} = require('url')

const paraToObject= (entries)=>{
    const result = {};
    for(const [key , value] of entries){
        result[key] = value;
    }
    return result;
}

const server = http.createServer((req,res) =>{
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0];
    const q = new URLSearchParams(url.split('?')[1]);
    const query = paraToObject(q)
    //set response format as json
    res.setHeader('Content-type', 'application/json');

    //return data
    const resData = {
        method,
        url,
        path,
        query
    }

    //return
    if(method === 'GET'){
        res.end(
            JSON.stringify(resData)
        )
    }

    if(method === 'POST'){
        let postData = '';
        req.on('data', chunk =>{
            postData += chunk.toString()
        })
        req.on('end', ()=>{
            resData.postData = postData;
            res.end(
                JSON.stringify(resData)
            )
        })
    }
})
// const server = http.createServer((req, res) =>{
//     //method/url/query
//     console.log('method:', req.method);
//     const url = req.url;
//     console.log('url:', url);
//     req.query = new URLSearchParams(url.split('?')[1])
//     let oIterator = req.query.entries()
//     for(var pair of oIterator) {
//         console.log('{',pair[0]+ ': '+ pair[1],'}'); 
//      }
//     res.end(
//         JSON.stringify(req.query)
//     )
// })

server.listen(8000);
console.log('ok')