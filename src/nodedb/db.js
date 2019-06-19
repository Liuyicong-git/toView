let mysql = require('mysql');
let dbBaseInfo = {
    host     : '47.105.169.142',
    user     : 'root',
    password : '~Aa12345',
    database : 'db_autoview'
}
let connection = mysql.createConnection(dbBaseInfo)
connection.connect();
module.exports = connection;