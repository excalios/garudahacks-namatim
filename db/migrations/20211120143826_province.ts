import { Knex } from 'knex';

import tablenames from '../../src/constants/tablenames';
import { addUuid } from '../../src/lib/tableUtil';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tablenames.province, table => {
        addUuid(knex, table);
        table.string('name');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tablenames.province);
}
