import { Knex } from 'knex';

import tablenames from '../../src/constants/tablenames';
import { addForeign, addUuid } from '../../src/lib/tableUtil';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tablenames.user_disability, table => {
        addUuid(knex, table);
        addForeign(table, tablenames.user);
        addForeign(table, tablenames.disability);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tablenames.user_disability);
}
