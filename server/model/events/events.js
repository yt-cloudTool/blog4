/*
    ruler: 
    client to server data is: {
        method: String,
        data: String,
        authorization: String
    }
    server to client data is: {
        data: String,
        code: Number,
        msg: String
    }
*/

// query index page
const customEvents  = require('./customEvents/customEvents')
const handlerEvents = require('./handlerEvents/handlerEvents')

// events custom
class Custom_events {
    constructor (emitter) { 
        customEvents(emitter)
    }
}

// events handler
class Handler_events {
    constructor (server, clientObj, socket, emitter) {
        new handlerEvents(server, clientObj, socket, emitter)
    }
}

module.exports = {
    /* 自定义事件 | custom events */
    Custom_events,
    /* 分配事件 | dispatch events*/
    Handler_events
}