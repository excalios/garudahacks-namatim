import { Knex } from 'knex';

import tableNames from '../../src/constants/tablenames';

import provinces from './Zones/provinces';
import regencies from './Zones/regencies';
import districts from './Zones/districts';
import subdistricts from './Zones/subdistricts';

export async function seed(knex: Knex): Promise<void> {
    // https://raw.githubusercontent.com/mddarmawan/Wilayah-Administratif-Indonesia/master/mysql/indonesia.sql

    // Insert province data
    await knex(tableNames.province).del();

    await knex(tableNames.province).insert(provinces);

    await knex(tableNames.regency).del();

    await knex(tableNames.regency).insert(regencies);

    await knex(tableNames.district).del();

    await knex(tableNames.district).insert(districts);

    await knex(tableNames.subdistrict).del();

    // Needs batch insert due to data size
    await knex.batchInsert(tableNames.subdistrict, subdistricts, 500);
}
