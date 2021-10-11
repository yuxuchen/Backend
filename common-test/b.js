const {add, mul}  = require('./a')
const _ = require('lodash')
const sum = add(8,10)
const mule = mul(8, 10)

const arr = _.concat([1,2],3)

console.log(sum,mule)
console.log('arr:', arr)
