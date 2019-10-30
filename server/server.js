const Net      = require('net')
const serverEmitter = require('events')
const { PORT } = require('../config')
const { Handler_events, Custom_events }   = require('./model/events/events')

// events
class Emitter extends serverEmitter {}


module.exports = class {
    constructor (obj) {
        // some params
        this.obj = obj
        // custom events
        this.emitter = null
        // server obj
        this.server = null
        // client obj
        this.clientObj = {
            // number of connection
            number: 0,
            clientArr: []
        }

        // custom events
        this.emitterCustom()
        // create server init
        this.init()
    }

    /* 初始化 | init */
    async init () {
        // create server
        await this.createServer()
        // event
        this.event()
    }

    /* 创建服务器 | create server */
    async createServer () {
        this.server = await Net.createServer().listen(PORT, () => { console.log(`server create at ${PORT}`) })
    }

    /* 自定义事件 | custom events */
    emitterCustom () {
        this.emitter = new Emitter()
        new Custom_events(this.emitter)
    }

    /* 消息事件 | msg event */
    event () {
        const self = this
        // connect
        self.server.on('connection', (socket) => {
            // number of connection
            self.clientObj.number = socket.server._connections
            console.log('server connection =>', this.clientObj.number)
            socket.setEncoding('utf8')
            // model -> events
            new Handler_events(self.server, self.clientObj, socket, self.emitter)
            socket.on('end', () => { self.clientObj.number -= 1; console.log('is disconnect, current number =>', self.clientObj.number) })
        })
        // err
        self.server.on('error', (err) => { throw err })
    }
}