const db = require('../data/dbConfig.js');

module.exports = {
    getProjects,
    addProject
}

function getProjects() {
    return db('projects');
  }

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }));
    }