
exports.up = function(knex, Promise) {
    return knex.schema.createTable('actions', function(table) {
      table.increments();
  
      table
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects');
  
      table
      .string('description', 128)
      .notNullable();
      
      table
      .text('notes')
      .notNullable();
      
      table
      .boolean('completed')
      .defaultTo(false);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('actions');
  };
