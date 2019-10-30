const mysqlPool = require('../../../db/db')
const UUID      = require('../../../utils/uuid/uuid')
module.exports = class {
    constructor (server, clientObj, socket) {
        this.server    = server
        this.clientObj = clientObj
        this.socket    = socket
        this.method    = method

        this.active()
    }

    active () {

    }

    // check has user
    static async checkHasUser (username) {
        return await new mysqlPool().query('select ? from user', [username])
    }    

    // register
    static async register (obj) {
        const username = obj.username
        const password = obj.password

        // check user name
        let check_username = await this.checkHasUser(username)
        console.log('check has user =>', check_username.result)

        // create userid
        const userid = await UUID.byTime()

        if (check_username.result.length >= 1) { throw check_username.result.length }
        console.log('do register =>')
        // do register
        return await new mysqlPool().query('insert into user (userid, username, password) values (?, ?, ?)', [userid, username, password])
    }

    // check login
    static async check (chunk) {
        console.log('check chunk =>', chunk)
        return await new mysqlPool().query(`select * from user`,[])
    }
}