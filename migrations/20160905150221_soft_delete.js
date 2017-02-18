
exports.up = function(knex, Promise) {
  return knex.schema.table('saved_item', function (table) {
    table.boolean('deleted');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('saved_item', function (table) {
    table.dropColumn('deleted');
  });
};
