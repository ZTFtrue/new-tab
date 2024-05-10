var fs = require('fs')
// import fs from 'fs';

function changeFile(type) {
    var path = './dist/manifest.json'
    var data = fs.readFileSync(path).toString()
    var json = JSON.parse(data)
    if(type=='chrome'){
        delete json.background.scripts
        delete json.browser_specific_settings
    }else if(type=='firefox'){
        delete json.background.service_worker
        // json.content_security_policy.extension_pages = 
        // "style-src 'self' 'unsafe-inline'; script-src 'self' 'wasm-unsafe-eval'; object-src 'self';default-src 'self'"
            //   "content_security_policy": "script-src 'self'; object-src 'self'",
    }
    var fd = fs.openSync(path, 'w+')

    fs.writeSync(fd, JSON.stringify(json))
    fs.closeSync(fd)
}
if (process.argv[2] === '--chrome') {
    changeFile(`chrome`)
} else if (process.argv[2] === '--firefox') {
    changeFile(`firefox`)
}