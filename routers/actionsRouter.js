const express = require('express');
const router = express.Router();

const Actions = require('../helpers/actionsModel.js')

//Get all actions
router.get('/', (req, res) => {
    Actions.get().then(actions => {
        res.status(200).json({actions})
    }).catch(error => {
        res.status(500).json({error : "The actions could not be retrieved"})
    })
})

  //Add a Action
  router.post('/', (req, res) => {
    Actions.insert(req.body).then(action => {
        res.status(201).json(action)
    }).catch(error => {
        res.status(500).json({error: "There was an error adding this action to the database."})
    })
})


module.exports = router