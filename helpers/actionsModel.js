const db = require('../data/dbConfig.js');
const mappers = require('./booleanMappers.js');

module.exports = {
    getActions,
    addActions
}

function getActions(id) {
    let query = db('actions');

    if (id) {
      query
        .where({'id': id})
        .first()
        .then(action => mappers.actionToBody(action));
    }
    return query.then(actions => {
      return actions.map(action => mappers.actionToBody(action));
    });
  }

function addActions(action) {
    return db('actions')
        .insert(action)
        .then(ids => ({ id: ids[0] }));
    }