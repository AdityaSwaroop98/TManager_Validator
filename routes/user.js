const express = require('express');
const router = express.Router();


const User = require('../models/User');
const Task = require('../models/task');

router.get('/', (req, res) => {
    User.find({}).then((result) => {
        res.send(result);
    })
})

router.get('/:userId/task', (req, res) => {
    Task.find({ _userId: req.params.userId }).then((result) => {
        res.send(result);
    })
})

router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });
    user.save().then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        })

})

router.post('/:userId/task', (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        _userId: req.params.userId
    });
    task.save().then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        })

})

router.delete('/:id', (req, res) => {
    User.findOneAndRemove({ _id: req.params.id }).then((removed) => {
        res.json(removed);
    })

    Task.findOneAndRemove({ _userId: req.params.id }).then((removedtask) => {
        res.json(removedtask);
    })
});

router.delete('/:userId/task/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _userid: req.params.userId
    }).then((removed) => {
        res.json(removed);
    })
});


router.patch('/:userId', (req, res) => {
    User.findOneAndUpdate({
        _id: req.params.userId
    }, { $set: req.body }).then(() => {
        res.send("OK");
    }).catch((err) => {
        res.send(err);
    })
});


router.patch('/:userId/task/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _userid: req.params.userId
    }, { $set: req.body }).then((updated) => {
        res.json(updated);
    })
});
module.exports = router;