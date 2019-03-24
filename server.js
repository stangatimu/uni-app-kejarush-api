const http = require('http'),
        app = require('./app');

const port = process.env.PORT || 4000;
const ip = process.env.IP;
const server = http.createServer(app);

server.listen(port,ip, function(){
    console.log('\n server running on port 4000...\n')
})
