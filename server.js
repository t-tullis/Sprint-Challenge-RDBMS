const express = require('express')

const server = express();

//Routers
const projectsRouter = require('./routers/projectsRouter.js')
const actionsRouter = require('./routers/actionsRouter.js')

//middleware
server.use(express.json());
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)

server.get('/', (req,res) => {
    res.send(`Sprint Challenge RDBMS`)
})

module.exports = server;