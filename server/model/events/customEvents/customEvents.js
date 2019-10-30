const Route_login = require('../../routes/login/login')

module.exports = (emitter) => {
    /* 注册 | register */
    emitter.on('register', (data) => {
        /* 异步进行 | async */
        setImmediate(() => {
            new Route_login(emitter).register(data)
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
            new Route_login(emitter).check(data)
        })
    })
}