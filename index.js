const express = require('express');
const server = express();
const PORT = 3000;
const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());
server.use('/projects', projectsRouter);
server.use('/actions', actionsRouter);

server.get('/', (req, res) => res.status(200).json({ message: 'API Running' }));

server.listen(PORT, console.log(`Server running at port ${PORT}`));