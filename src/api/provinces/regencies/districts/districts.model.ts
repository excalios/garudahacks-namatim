import { Model } from 'objection';

import tablenames from 'constants/tablenames';
import schema from './districts.schema.json';

export default class District extends Model {
    id!: string;
    regency_id!: string;
    name!: string;

    static get tableName() {
        return tablenames.district;
    }

    static get jsonSchema() {
        return schema;
    }
}
