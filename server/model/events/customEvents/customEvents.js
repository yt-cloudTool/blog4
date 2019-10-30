const Route_login = require('../../routes/login/login')

module.exports = (emitter) => {
    /* 注册 | register */
    emitter.on('register', (data, socket) => {
        /* 异步进行 | async */
        setImmediate(() => {
            new Route_login(emitter, socket).register(data)
        })
    })

    /* 登录 | login */
    emitter.on('login', (res, socket) => {
        /* 异步进行 | async */
        setImmediate(() => {
            new Route_login(emitter, socket).login(data)
        })
    })

    /* 检查登录 | checklogin */
    emitter.on('checklogin', (data, socket) => {
        /* 异步进行 | async */
        setImmediate(() => {
            new Route_login(emitter, socket).check(data)
        })
    })

    /*  */
}