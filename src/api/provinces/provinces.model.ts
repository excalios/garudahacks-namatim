import { Model } from 'objection';

import tablenames from 'constants/tablenames';
import schema from './provinces.schema.json';

export default class Province extends Model {
    id!: string;
    name!: string;

    static get tableName() {
        return tablenames.province;
    }

    static get jsonSchema() {
        return schema;
    }
}
