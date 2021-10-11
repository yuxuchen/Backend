let a = 'http://www.a.com/?user=aaa&id=233';

const b = new URLSearchParams(a.split('?')[1])
const oIterator = b.entries()

// for(const pair of oIterator) {
//     console.log('{',pair[0]+ ': '+ pair[1],'}'); 
//  }

 const paraToObject= (entries)=>{
    const result = {};
    for(const [key , value] of entries){
        result[key] = value;
    }
    return result;
}

const query = paraToObject(oIterator)
console.log(query)