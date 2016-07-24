
exports.up = function(knex, Promise) {
  return  knex.schema.hasTable('saved_item').then((exists) => {
    if (exists) {
        return;
    }

    return knex.schema.createTable('saved_item', function (table) {
      table.increments();
      table.string('external_id');
      table.string('provider');
      table.integer('user_id');
      table.json('data')
      table.boolean('sent');
    });
  });
};

exports.down = function(knex, Promise) {

};
