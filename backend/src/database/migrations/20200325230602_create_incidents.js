exports.up = function(knex) {
    return knex.schema/*.withSchema('public')*/.createTable('incidents', function (table) {
        table.increments();

        table.string('titulo', 100).notNullable();
        table.text('description');
        table.decimal('value', 100).notNullable();

        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
