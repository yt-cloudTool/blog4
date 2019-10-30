const mysql = require('mysql2')
const { MYSQL } = require('../../config')
const mysqlPool = mysql.createPool({
    ...MYSQL
})
module.exports = class {
    constructor (obj) {
        this.obj = obj
    }

    // default table
    init () {

    }

    // method
    query (sql, valueArr, timeout=180000) {
        return new Promise((resolve, reject) => {
            mysqlPool.getConnection((err, connection) => {

                connection.release()

                if (err) { reject(err) }

                connection.query({ "sql" : sql, "values" : valueArr, "timeout": timeout }, (err, result, fields) => {
                    if (err) { reject(err) } else {  resolve({ result, fields }) }
                })
            })
        })
    }    
}