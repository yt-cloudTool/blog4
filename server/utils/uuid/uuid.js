const util     = require('util')
const execFile = util.promisify(require('child_process').execFile)
const path     = require('path')

/*
    byTime -> time
    byName -> name
*/

module.exports = class {
    constructor () {

    }

    // create uuid by time
    static async byTime () {
        const { error, stdout, stderr } = await execFile(`${path.join(__dirname, './src/a.out')}`, ['time', '666'])
        if (error) {
            throw error
        }
        console.log('uuid byTime c =>', stdout)

        return stdout
    }

    // by name
    static async byName () {
        const { stdout } = await execFile(`${path.join(__dirname, './src/a.out')}`, ['name', '666'])
        console.log('uuid byName c =>', stdout)

        return stdout
    }
}