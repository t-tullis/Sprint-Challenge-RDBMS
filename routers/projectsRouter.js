const express = require('express');
const router = express.Router();

const Projects = require('../helpers/projectModel.js')


  //Add a Project
  router.post('/', (req, res) => {
    Projects.insert(req.body).then(project => {
        res.status(201).json(project)
    }).catch(error => {
        res.status(500).json({error: "There was an error adding this project to the database."})
    })
})


router.get('/', (req, res) => {
    Projects.get().then(project => {
        res.status(200).json({project})
    }).catch(error => {
        res.status(500).json({error : "The projects could not be retrieved"})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id).then(project => {
        if(project === 0){
            res.status(404).json({ errorMessage: "The project with that ID does not exist" })
        }
        res.status(200).json({project})
    }).catch(error => {
        res.status(500).json({ error: "There was an error getting a project with that ID"})
    })
})

module.exports = router