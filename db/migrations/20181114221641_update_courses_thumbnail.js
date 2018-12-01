exports.up = (knex, Promise) => {
  return knex.schema.table('courses', (table) => { table.text('thumbnail_img'); });
};


exports.down = (knex, Promise) => {
  return knex.schema.table('courses', (table) => { table.dropColumn('thumbnail_img'); });
};
