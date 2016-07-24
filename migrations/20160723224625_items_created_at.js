
exports.up = function(knex, Promise) {
  return knex.schema.table('saved_item', function (table) {
    table.dateTime('created_at');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('saved_item', function (table) {
    table.dropColumn('created_at');
  });
};
