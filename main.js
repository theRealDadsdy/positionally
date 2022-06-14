let positionally = require('./positionally')
let fs = require('fs')

let [filename, flags, ...input] = process.argv.slice(2)

if(!filename) console.log('Usage: node main.js <filename> [single string of flags] [inputs]'), process.exit()

let code = require('fs').readFileSync(filename, 'utf8');


for(let i = 0; i < input.length; i++) {
    let result;
    try {
        result = eval(input[i])
    } catch(e) {
        result = input[i]
    }
    input[i] = result;
}
positionally(code, input, flags)