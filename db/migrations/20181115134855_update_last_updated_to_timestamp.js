exports.up = (knex, Promise) => {
  return knex.schema.alterTable('courses', (t) => {
    t.timestamp('last_updated').notNullable().alter();
  });
};

exports.down = (knex, Promise) => {
  return knex.schema.alterTable('courses', (t) => {
    t.date('last_updated').notNullable().alter();
  });
};
