import { Model } from 'objection';

import tablenames from 'constants/tablenames';
import schema from './disabilities.schema.json';
import User from 'api/users/users.model';

export default class Disability extends Model {
    id?: string;
    name!: string;

    static get tableName() {
        return tablenames.disability;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        return {
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: `${this.tableName}.id`,
                    through: {
                        from: `${tablenames.user_disability}.${this.tableName}_id`,
                        to: `${tablenames.user_disability}.${tablenames.user}_id`,
                    },
                    to: `${tablenames.user}.id`,
                },
            },
        }
    }
}
