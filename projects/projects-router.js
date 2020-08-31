const router = require('express').Router();
const db = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    db.get()
    .then(payload => {
        res.status(200).json(payload);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error getting the projects' });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.get(id)
    .then(payload => {
        if(payload) {
            res.status(200).json(payload);
        } else {
            res.status(404).json({ error: 'Project with that Id was not found' })
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error getting the project' });
    });
});

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;

    db.getProjectActions(id)
    .then(payload => {
        res.status(200).json(payload);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error getting the actions' })
    })
});

router.post('/', (req, res) => {
    const project = req.body;

    if(!project.name || !project.description) {
        return res.status(400).json({ error: 'Name and Description are required' });
    } else {
        db.insert(project)
        .then(payload => {
            res.status(201).json(payload);
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error creating the project' });
        });
    }
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    db.update(id, updates)
    .then(payload => {
        res.status(200).json(payload);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error updating the project' });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(payload => {
        res.status(200).json(payload);
    })
    .catch(error => {
        res.status(500).json({ message: 'There was an error deleting the user' })
    })
})

module.exports = router;