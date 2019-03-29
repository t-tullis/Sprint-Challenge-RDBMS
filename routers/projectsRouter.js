const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig.js')

const Projects = require('../helpers/projectModel.js')

//Get all Projects
router.get('/', (req, res) => {
    Projects.getProjects().then(project => {
        res.status(200).json(project)
    }).catch(error => {
        res.status(500).json(error)
    })
})

  //Add a Project
  router.post('/', (req, res) => {
    Projects.addProject(req.body).then(project => {
        res.status(201).json(project)
    }).catch(error => {
        res.status(500).json({error: "There was an error adding this project to the database."})
    })
})

// Get project by ID
 router.get('/:id', (req, res) => {
     const { id } = req.params
    db('projects')
    .where({ 'projects.id': id })
    .join('actions', {'projects.id': 'actions.project_id'})
    .then(project => {
          res.status(200).json({project})
    }).catch(error => {
        res.status(500).json(error)
    })
})



module.exports = router