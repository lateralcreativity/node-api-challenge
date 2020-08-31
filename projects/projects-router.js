const router = require('express').Router();
const db = require('../data/helpers/projectModel');

router.get('/', (req, res) => {
    db.get()
    .then(payload => {
        res.status(200).json(payload);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error getting the users' });
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
        res.status(500).json({ error: 'There was an error getting the user' });
    });
})

module.exports = router;