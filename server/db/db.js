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

                if (err) { reject(err) }

                connection.query({ "sql" : sql, "values" : valueArr, "timeout": timeout }, (err, result, fields) => {
                    connection.release()
                    if (err) { reject(err) } else {  resolve({ result, fields }) }
                })
            })
        })
    }
    
    // transaction
    /*
        sql_kvObj_arr item ->
        {
            sql: '',
            valueArr: []
        }
    */
    trans (sql_kvObj_arr, timeout=180000) {
        return new Promise((resolve, reject) => {
            mysqlPool.getConnection((err, connection) => {
                if (err) {
                    reject(err)
                    // throw err
                }
                connection.beginTransaction( async (err1) => {
                    if (err1) {
                        reject(err1)
                        // throw err1
                    }
                    console.log('start transaction =>')
                    
                    let arr_asyncFunc = []
                    // do each sql
                    for (let ite of sql_kvObj_arr) {
                        arr_asyncFunc.push(
                            function () {
                                connection.query({ "sql" : ite.sql, "values" : ite.valueArr, "timeout": timeout }, (err2, result, fields) => {
                                    if (err2) {
                                        console.log('transaction err =>', err2)
                                        connection.rollback(() => {
                                            reject(err2)
                                            // throw err2
                                        })
                                    }
                                })
                            }
                        )
                    }

                    // exec sql
                    for (let ite2 of arr_asyncFunc) {
                        await ite2()
                    }

                    // commit
                    connection.commit((err3, info) => {
                        if (err3) {
                            console.log('commit err =>', err3)
                            connection.rollback((err4) => {
                                connection.release()
                                reject(err3)
                                throw err3
                            })
                        } else {
                            console.log('commit success =>')
                            connection.commit()
                            resolve(info)
                        }
                    })
                })
            })
        })
    }
}