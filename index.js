const express = require('express');
const server = express();
const PORT = 3000;
const projectsRouter = require('./projects/projects-router');

server.use(express.json());
server.use('/projects', projectsRouter)

server.get('/', (req, res) => res.status(200).json({ message: 'API Running' }));

server.listen(PORT, console.log(`Server running at port ${PORT}`));