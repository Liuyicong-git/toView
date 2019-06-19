
let url = require('url')
let SinglePool = require('../singlePool.js');
let connection =  null;
let Result = require('../result.js')

const deleteComponentInfo = (req , res) => {
    let param = url.parse(req.url,true).query;
    let sql = `delete FROM vue_template where id =  ${param.num} ` ;
    connection.query(sql , function(error, data) {
        let result =  JSON.stringify(data);
        res.end( JSON.stringify(new Result(result)))
    })     
}

/**
 *  查询组件基础信息
 * @param {*} req 
 * @param {*} res 
 */
 const getComponentInfo = (req ,res)=>{
    let param = url.parse(req.url,true).query;
    let sql = 'SELECT * FROM vue_template ' +  (param.num ? `where id = ${param.num} `: '')  ;
    connection.query(sql , function(error, data) {
        let result =  JSON.stringify(data);
        res.end( JSON.stringify(new Result(result)))
    })     
}

/**
 * 新增组件基础信息
 * @param {*} req 
 * @param {*} res 
 */
const addComponentInfo = (req ,res) =>{
    let sql = 'insert into vue_template(name , vue_template, attrs ,data_template , css_code) values (? ,? , ? , ?, ?)'   
    let body = '';     
    req.on('data', function(chunk){    
        body += chunk;
    });
    req.on('end', function(){    
        let params = JSON.parse(body)
        let  componentSql_Params = [params.name ,params.vue_template, params.attrs , params.data_template , params.css_code];
        //增 add
        connection.query(sql,componentSql_Params,function (err, result) {
            if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
            }       
        res.end(JSON.stringify(new Result({})) );
        });
    });
}

const updateComponentInfo = (req , res) => {
    let sql = 'update vue_template set  name = ? , vue_template = ? , attrs = ? , data_template = ? , css_code = ? where id = ?';
    let body = '';     
    req.on('data', function(chunk){    
        body += chunk;
    }); 
    req.on('end', function(){    
        let params = JSON.parse(body)
        let  componentSql_Params = [params.name ,params.vue_template, params.attrs , params.data_template, params.css_code, params.id];
        //修改 add
        connection.query(sql,componentSql_Params,function (err, result) {
            if(err){
            console.log('[Update ERROR] - ',err.message);
            return;
            }       
        res.end(JSON.stringify(new Result({})));
        });
    });
}

let mappingDic = new Map();
mappingDic.set('getComponentInfo' , getComponentInfo )
mappingDic.set('addComponentInfo' , addComponentInfo )
mappingDic.set('updateComponentInfo' , updateComponentInfo )
mappingDic.set('deleteComponentInfo' , deleteComponentInfo )


let dispactOrgRequest = (req , res)=>{
    connection = connection ?  connection : SinglePool.get('connection');
    let index = url.parse(req.url).pathname.lastIndexOf('/') + 1;
    mappingDic.get(url.parse(req.url).pathname.substr(index))(req,res)
}




module.exports = dispactOrgRequest;