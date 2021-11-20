import { Knex } from 'knex';

import tablenames from '../../src/constants/tablenames';
import { addUuid, addForeign } from '../../src/lib/tableUtil';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tablenames.regency, table => {
        addUuid(knex, table);
        addForeign(table, tablenames.province);
        table.string('name');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tablenames.regency);
}
