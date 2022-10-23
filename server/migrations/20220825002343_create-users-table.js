
exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments()
    tbl.text('username', 120).notNullable().unique().index()
    tbl.text('password', 200).notNullable()
    tbl.text('imageUrl').notNullable() 
    tbl.timestamps(true, true) 
  })

  .createTable('destinations', tbl => {
    tbl.increments()
    tbl.text('title').notNullable()
    tbl.text('description').notNullable()
    tbl.text('imageUrl').notNullable()
    tbl.integer('user_id').notNullable().unsigned().references('id').inTable('user').onDelete('CASCADE').onUpdate('CASCADE')
    tbl.timestamps(true, true)
})
};

exports.down = function(knex) {
  return knex.schema.dropTableExists("users").dropTableExists("destinations")
}
