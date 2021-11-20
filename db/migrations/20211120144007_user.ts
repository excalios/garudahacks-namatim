import { Knex } from 'knex';

import tablenames from '../../src/constants/tablenames';
import { addForeign, addUuid } from '../../src/lib/tableUtil';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(
        tablenames.user,
        (table: Knex.CreateTableBuilder) => {
            addUuid(knex, table);
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.date('birth_date');
            table.string('id_card_number', 16).notNullable();
            table.string('last_job');
            table.string('last_salary');
            table.boolean('is_validated').notNullable().defaultTo(false);
            addForeign(table, tablenames.province);
            addForeign(table, tablenames.regency);
            addForeign(table, tablenames.district);
            addForeign(table, tablenames.subdistrict);
        }
    );
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tablenames.user);
}
