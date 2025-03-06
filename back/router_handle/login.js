//連接資料庫
const db = require('../db/index')
//導入bcrypt加密中間鍵
const bcrypt = require('bcryptjs')
//導入生成jwt token
const jwt = require('jsonwebtoken')
//導入jwt配置文件，用於加密與解密
const jwtconfig = require('../jwt_config/index.js')


//------------------<<註冊模塊>>-------------------

//req是前端傳過來的數據，也就是request，res是後端傳來的數據，也就是response
exports.register = (req, res) => {
  //先利用req.body獲取請求體
  const regInfo = req.body

  //1. 判斷"帳號"或"密碼"是否為空
  if (!regInfo.account || !regInfo.password) {
    return res.send({
      //以下為自訂屬性
      status: 1,
      message: '帳號或密碼不得為空'
    })
  }

  //2. 檢查帳號是否已經存在於資料庫
  //需要使用MySQL語句
  const sql1 = 'select * from users where account = ?'
  //帶入參數(查詢語句, 傳進的請求體.帳號, method)
  //若有查詢到 會有回傳值 並且length>0
  db.query(sql1, regInfo.account, (err, results) => {
    if (err) {
      // 表示執行 SQL 發生錯誤（語法錯誤、連線問題、資料表不存在等）
      return res.cc(err)
    }
    //----------------------
    if (results.length > 0) {
      return res.send({
        //以下為自訂屬性
        status: 1,
        message: '帳號已存在'
      })
    }
    //3.對密碼進行加密
    //此處使用bcrypt.js 
    //參數(要傳入的參數, 加密後的長度)
    regInfo.password = bcrypt.hashSync(regInfo.password, 10)

    //4.將數據插入資料庫的users表
    //此處插入 ? 代表所有符合規定之資料皆插入
    const sql2 = 'insert into users set ?'
    //註冊身分
    const identity = '用戶'
    //註冊時間
    const create_time = new Date()
    db.query(sql2, ({
      account: regInfo.account,
      password: regInfo.password,
      //身分
      identity,
      //創建時間
      create_time,
      //初始值為0 表示非凍結
      status: 0
      //
    }), (err, results) => {
      if (err) {
        // 表示執行 SQL 發生錯誤（語法錯誤、連線問題、資料表不存在等）
        return res.cc(err)
      }
      //affectedRows 為影響的行數，插入失敗影響行數 = 0
      if (results.affectedRows !== 1) {
        return res.send({
          //以下為自訂屬性
          status: 1,
          message: '創建帳號失敗 '
        })
      }
      res.send({
        //以下為自訂屬性
        status: 1,
        message: '創建帳號成功 '
      })
    })
  })


}

//------------------<<登陸模塊>>-------------------

exports.login = (req, res) => {
  const loginfo = req.body
  //第一步，查看數據表中有沒有前端傳過來的帳號
  //並使用sql查詢語句
  const sql1 = 'select * from users where account = ?'
  db.query(sql1, loginfo.account, (err, results) => {

    //第一個if : sql執行出錯或資料庫連線失敗.
    if (err) return res.cc(err) //res.cc當中 (傳參為(err, status = 1))
    //第二個if : 檢查查詢結果是否符合你的邏輯需求
    //次處為查找 req攜帶的帳號 是否已經建檔 有建檔才會回傳"一個長度為 1 的陣列"
    //results[0] 就是那筆使用者資料的物件
    if (results.length !== 1) return res.cc('登陸失敗')

    //第二步 : 對前端傳過來的密碼進行解密
    const compareResults = bcrypt.compareSync(loginfo.password, results[0].password)
    if (!compareResults) {
      return res.cc('登陸失敗')
    }

    //第三步 : 判斷帳號是否凍結
    if (results[0].status === 1) res.cc('帳號已被凍結')

    //第四步 : 生成token返回給前端 
    //但token不是所有資料都需要 因此部分屬性作初始化
    //剔除加密後的密碼、頭像、創建與更新時間
    const user = {
      //先做一次深拷貝，查找出results[0]陣列，放入user物件
      ...results[0],
      //再將此持找到的 results[0] 部分屬性清除
      password: '',
      ImageUrl: '',
      create_time: '',
      updata_time: '',
    }

    //生成一個 JSON Web Token (JWT)。 並賦值給tokenStr
    //並且給予有效時間'7小時'
    const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
      expiresIn: '7h'
    })

    //最後登陸成功
    res.send({
      results: results[0],  //給前端進一步處理或展示
      status: 0,            //登陸成功狀態碼
      message: '登錄成功',
      token: 'Bearer ' + tokenStr, //Bearer 為固定用法 並且最後保留1個空格
    })
  })
}