const db = require('../data/dbConfig.js');

module.exports = {
    getActions,
    addActions
}

function getActions() {
    return db('actions');
  }

function addActions(action) {
    return db('actions')
        .insert(action)
        .then(ids => ({ id: ids[0] }));
    }