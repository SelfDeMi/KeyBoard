import ajax from './axios'

export const reqLogin = (username,password) => ajax('/login',{
    username,password
})
//注册
export const reqRegister = (username,password) => ajax('/register',{
    username,password
})
// 发邮件
export const reqSendEmail = (identifyCode,toEmail) => ajax('/register/identicode',{
    identifyCode,toEmail
})
// 写入数据库
export const reqInsertDB = (username,password,cookie,email) => ajax('/register/insertdb',{
    username,password,cookie,email
})
//根据用户名查询用户
export const reqFindUser = (username) => ajax('/find',{
    username
})
//根据cookie本地缓存自动登录
export const reqFindCookie = (cookie) => ajax('/cookie',{
    cookie
})