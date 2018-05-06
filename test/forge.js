const fs = require('fs')
const forge = require('../node-forge')

const httpsHSM = require('../')

httpsHSM({
    host: '127.0.0.1',
    port: 8000,
    path: '/t',
    headers: {
        'content-type': 'application/json;charset=UTF-8'
    },
    body: {
        name: 'Hello World!',
        age: 2046
    },
    async getCA() {
        return [fs.readFileSync('./test/ca-crt.pem').toString()]
    },
    async getCert() {
        return fs.readFileSync('./test/client1-crt.pem').toString()
    },
    async rsaSign(b) {
        const privateKeyStr = fs.readFileSync('./test/client1-key.pem').toString()
        const privateKey = forge.pki.privateKeyFromPem(privateKeyStr)
        return privateKey.sign(b, null)
    },
    debug: false
}).then((r) => {
    console.log(r)
}, (e) => {
    console.error(e)
})