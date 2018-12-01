exports.up = (knex, Promise) => knex.schema.createTable('courses', (table) => {
  table.increments('id').primary().notNullable();
  table.string('title').notNullable();
  table.string('subtitle').notNullable();
  table.string('teacher_names').notNullable();
  table.integer('avg_rating').notNullable();
  table.integer('rating_count').notNullable();
  table.integer('student_count').notNullable();
  table.date('last_updated').notNullable();
  table.integer('price').notNullable();
  table.string('lang').notNullable();
  table.string('subtitle_lang').notNullable();
  table.float('course_len').notNullable();
  table.boolean('isOnDiscount').notNullable();
  table.float('current_price').notNullable();
  table.float('discount').notNullable();
  table.integer('num_of_articles').notNullable();
  table.integer('dwl_resources_count').notNullable();
  table.string('discountCountdown', 12).notNullable();
  table.boolean('hasTag').notNullable();
  table.string('tag', 30).notNullable();
});

exports.down = (knex, Promise) => knex.schema.dropTableIfExists('courses');
