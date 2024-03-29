module.exports = class {
    constructor (server, clientObj, socket, emitter) {
        this.server = server
        this.clientObj = clientObj
        this.socket = socket,
        this.emitter = emitter
        this.exchange()
    }
    exchange () {
        const self = this
        self.socket.on('data', (chunk) => {
            let jsonChunk = null
            try { jsonChunk = JSON.parse(chunk) } catch (e) { jsonChunk = {} }
            // route
            self.clientNormalMethod(jsonChunk)
        })
    
        self.socket.pipe(self.socket)
    }
    // client require
    clientNormalMethod (jsonChunk) {
        const self = this
        switch (String(jsonChunk.method)) {
            // query index page
            case 'index':
                // return index.html
                self.socket.write('index.html')
            break
            // register
            case 'register':
                self.emitter.emit('register', jsonChunk, self.socket)
            break
            // login
            case 'login':
                self.emitter.emit('login', jsonChunk, self.socket)
            break
            // checklogin
            case 'checklogin':
                self.emitter.emit('checklogin', jsonChunk, self.socket)
            break
            default: break
        }
    }
}