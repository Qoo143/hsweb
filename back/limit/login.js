const joi = require('joi')


//帳號：必須是 6~12 字元的英數字，且不允許非英數字符號，必填。
//密碼：必須是 6~12 字元的英數字，且不能是純數字，必填。
//對帳號進行驗證
const account = joi.string().alphanum().min(6).max(12).required()
//對密碼進行驗證
const password = joi.string().pattern(/^(?![0-9]+$)[a-z0-9]{1,50}$/).min(6).max(12).required()

exports.login_limit = {
    //表示對req.body裡面的數值進行驗證
    body: {
        account,
        password
    }
}
