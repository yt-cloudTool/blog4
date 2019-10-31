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

    // register
    static async register (obj) {
        const username = obj.username
        const password = obj.password

        // check user name
        let check_username = await this.checkHasUser(username)
        console.log('check has user =>', check_username.result)
        // if username exists then throw err
        if (check_username.result.length >= 1) { 
            throw { 'msg': 'exists', 'evidence': check_username.result.length }
        }

        // create userid
        const userid = await UUID.byTime()

        console.log('do register =>')
        // do register
        return await new mysqlPool().query('insert into user (userid, username, password) values (?, ?, ?)', [userid, username, password])
    }

    static async login (obj) {
        const self = this
        return await new mysqlPool().trans([
            {
                sql: 'insert into user (userid, username, password) values (?, ?, ?)',
                valueArr: [await UUID.byTime(), await UUID.byTime(), await UUID.byTime()]
            },
            {
                sql: 'insert into user (userid, username, password) values (?, ?, ?)',
                valueArr: [await UUID.byTime(), await UUID.byTime(), await UUID.byTime()]
            },
        ])
    }

    // check login
    static async check (obj) {
        console.log('check login =>', obj)
        
    }

    // check has user
    static async checkHasUser (username) {
        return await new mysqlPool().query('select * from user where username = ?', [username])
    }   
}