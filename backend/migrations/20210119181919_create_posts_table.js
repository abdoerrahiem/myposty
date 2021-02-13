exports.up = function (knex) {
  return knex.schema.createTable('posts', function (table) {
    table.increments()
    table.integer('user').unsigned()
    table.string('title')
    table.string('content')
    table.date('date')
    table.timestamps(true, true)

    table.foreign('user').references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('posts')
}
