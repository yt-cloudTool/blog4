const Login  = require('../../functions/db_login/db_login')

module.exports = class {
    constructor (emitter=null, socket=null) {
        this.emitter = emitter
        this.socket  = socket
    }

    // register
    register (data) {
        const self = this
        Login.register({
            'username': 'b',
            'password': 'b'
        }).then((res) => {
            console.log('注册结果 =>', res.result.warningStatus)
            try {
                self.socket.write(JSON.stringify({
                    "msg": '註冊成功',
                    "data": res.result,
                }))
            } catch (e) {
                throw e
            }
            
        }).catch((err) => {
            console.log('注册问题 =>', err)
            try {
                self.socket.write(JSON.stringify(err))
            } catch (e) { 
                throw e
            }
        })
    }

    // login
    login (data) {
        const self = this
    }

    // check
    check (data) {
        console.log('checklogin =>', data)
        Login.check(data).then((res) => {
            console.log('登录状态检查结果 =>', res.result)
        })
    }
}