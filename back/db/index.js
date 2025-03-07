//引入數據庫
const mysql = require('mysql2')
require('dotenv').config();
//引入env密碼
const host = process.env.hostQoo
const port = process.env.portQoo
const user = process.env.userQoo
const password = process.env.passwordQoo
const database = process.env.databaseQoo
//連接數據庫
const db = mysql.createPool({
    host,
    port,
    user,
    password,
    database
})
//對外暴露數據庫
module.exports = db