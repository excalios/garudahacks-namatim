import { Knex } from 'knex';

function addUuid(knex: Knex, table: Knex.CreateTableBuilder) {
    table
        .uuid('id')
        .primary()
        .index()
        .unique()
        .notNullable()
        .defaultTo(knex.raw('gen_random_uuid()'));
}

function addForeign(table: Knex.CreateTableBuilder, refTable: string) {
    table
        .uuid(`${refTable}_id`)
        .references('id')
        .inTable(refTable)
        .notNullable()
        .onDelete('cascade');
}

export { addUuid, addForeign };
