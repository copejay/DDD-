

export type FieldType='string'|'number'|'boolean'|'object'|'array'|'any';

export interface FieldSchema{
    type:FieldType;
    optional?:boolean;
}

export type Schema<T>={
    [K in keyof T]:FieldSchema;
};

export function validateBySchema<T>(
    tableName:string,
    schema:Schema<T>,
    data:any,
    id:string
):T{
    if(typeof data !=='object'|| data===null){
        console.error(`[schema] Table=${tableName},id=${id},data is not object:`,data);
        throw new Error('Invalid data type (not object)');
    }

    for(const key in schema){
        const rule=schema[key];
        const value=(data as any)[key];

        if(value===undefined||value===null){
            if(!rule.optional){
                console.error(
                    `[Schema] Table=${tableName},id=${id} 缺少必要字段:${String(key)}`
                );
                throw new Error(`Missing required field:${String(key)}`);
            }
            continue;
        }
        if(rule.type==='any') continue;

        const realType=Array.isArray(value)?'array':typeof value;

        if(realType !== rule.type){
            console.error(
                `[Schema] Table=${tableName},id=${id} 字段类型错误:${String(
                    key
                )},期望=${rule.type},实际=${realType}`,
                data
            );
            throw new Error(
                `Field type mismatch:${String(key)} expected=${rule.type},got=${realType}`
            );
        }
    }

    for(const key in data){
        if(!(key in schema)){
            console.warn(
                `[Schema]Table = ${tableName},id=${id} 存在schema 未定义字段：${key}`
            );
        }
    }
    return data as T;
}