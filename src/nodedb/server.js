
let dispactOrgRequest = require ('./org/index.js');
let InjectPool = require('./singlePool.js');
let connection = require('./db.js');

let http = require('http');

//注入基础属性
InjectPool.add('connection', connection)


//字典注入
let mappingDic = new Map();
mappingDic.set('org',dispactOrgRequest);


http.createServer(function request(request , response){
    urlFetchMapping(request , response)
}).listen(8780)


//url controller
function urlFetchMapping(  request , response ){
    if (request.url === '/favicon.ico') { response.end(); return;} 
    mappingDic.get(request.url.split('/')[2])(request , response);  
}
