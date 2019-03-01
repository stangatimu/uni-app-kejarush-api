const http = require('http'),
        app = require('./app');

const port = process.env.PORT || 3000;
const ip = process.env.IP;
const server = http.createServer(app);

server.listen(port,ip, function(){
    console.log('server running on port 3000...')
})
