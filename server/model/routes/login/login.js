const Login  = require('../../functions/db_login/db_login')

module.exports = class {
    constructor (emitter=null) {
        this.emitter = emitter
    }

    // register
    register (data) {
        Login.register({
            'username': 'a',
            'password': 'a'
        }).then((res) => {
            console.log('注册结果 =>', res)
        }).catch((err) => {
            console.log('注册问题 =>', err)
        })
    }

    // check
    check (data) {
        console.log('checklogin =>', data)
        Login.check(data).then((res) => {
            console.log('登录状态检查结果 =>', res.result)
        })
    }
}