const router = require('express').Router();
const db = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    db.get()
    .then(payload => {
        res.status(200).json(payload);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error getting the actions' });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.get(id)
    .then(payload => {
        if(payload) {
            res.status(200).json(payload);
        } else {
            res.status(404).json({ error: 'Action with that Id was not found' })
        }
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error getting the action' });
    });
});

router.post('/', (req, res) => {
    const action = req.body;

    if(!action.description || !action.project_id || !action.notes) {
        return res.status(400).json({ error: 'Name and Description are required' });
    } else {
        db.insert(action)
        .then(payload => {
            res.status(201).json(payload);
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error creating the action' });
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
        res.status(500).json({ error: 'There was an error updating the action' });
    });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(payload => {
        res.status(200).json(payload);
    })
    .catch(error => {
        res.status(500).json({ message: 'There was an error deleting the action' })
    })
})

module.exports = router;