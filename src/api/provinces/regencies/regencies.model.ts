import { Model } from 'objection';

import tablenames from 'constants/tablenames';
import schema from './regencies.schema.json';

export default class Regency extends Model {
    id!: string;
    province_id!: string;
    name!: string;

    static get tableName() {
        return tablenames.regency;
    }

    static get jsonSchema() {
        return schema;
    }
}
