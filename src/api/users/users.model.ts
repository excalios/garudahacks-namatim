import { Model } from 'objection';

import tablenames from 'constants/tablenames';
import schema from './users.schema.json';
import Disability from 'api/disabilities/disabilities.model';
import Province from 'api/provinces/provinces.model';
import Regency from 'api/provinces/regencies/regencies.model';
import District from 'api/provinces/regencies/districts/districts.model';
import Subdistrict from 'api/provinces/regencies/districts/subdistricts/subdistricts.model';

export default class User extends Model {
    id!: string;
    name!: string;
    email!: string;
    password?: string;
    birth_date?: string;
    id_card_number?: string;
    last_job?: string;
    last_salary?: number;
    is_validated?: boolean;

    // Foreign Key
    province_id!: string;
    regency_id!: string;
    district_id!: string;
    subdistrict_id!: string;

    static get tableName() {
        return tablenames.user;
    }

    static get jsonSchema() {
        return schema;
    }

    static get relationMappings() {
        return {
            disabilities: {
                relation: Model.ManyToManyRelation,
                modelClass: Disability,
                join: {
                    from: `${this.tableName}.id`,
                    through: {
                        from: `${tablenames.user_disability}.${this.tableName}_id`,
                        to: `${tablenames.user_disability}.${tablenames.disability}_id`,
                    },
                    to: `${tablenames.disability}.id`,
                },
            },
            province: {
                relation: Model.BelongsToOneRelation,
                modelClass: Province,
                join: {
                    from: `${this.tableName}_id`,
                    to: `${tablenames.province}_id`,
                },
            },
            regency: {
                relation: Model.BelongsToOneRelation,
                modelClass: Regency,
                join: {
                    from: `${this.tableName}_id`,
                    to: `${tablenames.regency}_id`,
                },
            },
            district: {
                relation: Model.BelongsToOneRelation,
                modelClass: District,
                join: {
                    from: `${this.tableName}_id`,
                    to: `${tablenames.district}_id`,
                },
            },
            subdistrict: {
                relation: Model.BelongsToOneRelation,
                modelClass: Subdistrict,
                join: {
                    from: `${this.tableName}_id`,
                    to: `${tablenames.subdistrict}_id`,
                },
            },
        };
    }
}
