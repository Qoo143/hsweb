//先引入express框架
const express = require('express');

//使用express框架之路由
const router = express.Router()

//導入login路由處理模組
const loginHandler = require('../router_handle/login')


//導入expreseJoi (用以帶入判斷 joi 規則)
const expressJoi = require('@escook/express-joi');
//導入驗證規則  在limit中的index定義的
const { login_limit } = require('../limit/login.js')

//帳號驗證 帶入 login_limit 限制 ( 帳號 與 密碼 )
router.post('/register', expressJoi(login_limit), loginHandler.register)
router.post('/login', expressJoi(login_limit), loginHandler.login)

//將模組暴露出去
module.exports = router