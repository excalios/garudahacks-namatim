import { Model } from 'objection';

import tablenames from 'constants/tablenames';
import schema from './subdistricts.schema.json';

export default class Subdistrict extends Model {
    id!: string;
    district_id!: string;
    name!: string;

    static get tableName() {
        return tablenames.subdistrict;
    }

    static get jsonSchema() {
        return schema;
    }
}
