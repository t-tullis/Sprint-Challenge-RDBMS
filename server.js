const express = require('express')

const server = express();

//Routers

//middleware
server.use(express.json());

server.get('/', (req,res) => {
    res.send(`Sprint Challenge RDBMS`)
})

module.exports = server;