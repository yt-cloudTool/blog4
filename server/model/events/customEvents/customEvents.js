const Login = require('../methods/login/login')

module.exports = (emitter) => {
    /* 注册 | register */
    emitter.on('register', (data) => {
        /* 异步进行 | async */
        setImmediate(() => {
            // console.log('register =>', data)
            Login.register({
                'username': 'b',
                'password': 'b'
            }).then((res) => {
                console.log('注册结果 =>', res)
            }).catch((err) => {
                console.log('注册问题 =>', err)
            })
        })
    })

    /* 登录 | login */
    emitter.on('login', (res) => {
        /* 异步进行 | async */
        setImmediate(() => {
            console.log('login =>', res)
        })
    })

    /* 检查登录 | checklogin */
    emitter.on('checklogin', (data) => {
        /* 异步进行 | async */
        setImmediate(() => {
            console.log('checklogin =>', data)
             // 检查登录状态 | check login status
            Login.check(data).then((res) => {
                console.log('登录状态检查结果 =>', res.result)
            })
        })
    })
}