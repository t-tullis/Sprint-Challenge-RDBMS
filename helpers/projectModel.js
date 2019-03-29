const db = require('../data/dbConfig.js');
const mappers = require('./booleanMappers.js');

module.exports = {
    getProjects,
    addProject,
    getProjectActions
}


function getProjects(id) {
    let query = db('projects');

    if (id) {
      query.where({'projects.id': id}).first();

      const promises = [query, getProjectActions(id)]; // [ projects, actions ]

      return Promise.all(promises).then(function(results) {
        let [project, actions] = results;
        project.actions = actions;

        return mappers.projectToBody(project);
      });
    }

    return query.then(projects => {
      return projects.map(project => mappers.projectToBody(project));
    });
  }

  function getProjectActions(projectId) {
    return db('actions')
      .where('project_id', projectId)
      .then(actions => actions.map(action => mappers.actionToBody(action)));
  }

function addProject(project) {
    return db('projects')
        .insert(project)
        .then(ids => ({ id: ids[0] }));
    }