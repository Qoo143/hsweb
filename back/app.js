//導入express框架
const express = require('express');
//創建express實例
const app = express()

const Joi = require('joi')


//導入cors (處理跨域請求)
const cors = require('cors');
//全局掛載cors
app.use(cors())

//導入body-parser(express已經內置)
const bodyParser = require('body-parser');
//parse application/x-www-form-urlencoded
//extended 為false時，值為數組或字符串、為true時，值可以為任意類型
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json  111112222222
app.use(bodyParser.json())


//這是掛載 全局錯誤 處理中間鍵
//後續調用時 可能會手動寫字串err，也可能帶入物件err
app.use((req, res, next) => {
  //status=0為成功、=1為失敗，默認設置為1，方便處理失敗的情況
  res.cc = (err, status = 1) => {
    res.send({
      status,//攜帶成功與否的狀態碼(自定義屬性)
      //判斷message是否為 "錯誤物件" 還是 "字串"
      //若是物件，則需提取該物件的message屬性 字串則直接使用
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})


const jwtconfig = require('./jwt_config/index.js')
const { expressjwt: jwt } = require('express-jwt')
//除了登入與註冊之外，其餘所有地方都需要攜帶此token
app.use(jwt({
  secret: jwtconfig.jwtSecretKey,
  algorithms: ['HS256'],
}).unless({
  path: [/^\/api\//]
}))


//導入路由模組
const loginRouter = require('./router/login')
app.use('/api', loginRouter)


//對不符合joi規則的情況進行報錯
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) return res.cc(err)
  return res.cc(err)
})



//綁定和監聽指定的端口和主機
app.listen(3007, () => {
  console.log('http://127.0.0.1');
})