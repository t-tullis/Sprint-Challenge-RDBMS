const express = require('express');
const router = express.Router();
const db = require('../data/dbConfig.js')

const Projects = require('../helpers/projectModel.js')

//Getting projects 
const getProjectWithActions = async id => {
    try {
      const project = await db('projects').where({ id });
      const actions = await db.select('actions. *')
        .from('projects')
        .join('actions', {'projects.id': 'actions.project_id'})
        .where({ 'projects.id': id });
      return { ...project[0], actions };
    } catch (error) {
      console.log(error);
      return error;
    }
  };

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


  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const projects = await getProjectWithActions(id);
      if(projects.actions.length === 0){
      res.status(404).json({ message: "This project does not exist." })
      }else{
          res.status(200).json({projects});
      }
    } catch (error) {
      res.status(500).json({ error: 'There was a problem getting that project.' });
    }
  });
module.exports = router