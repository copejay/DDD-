// GameTypes.ts
import { Schema } from './Schema';

export interface RoleRow {
    id: string;      // 主键
    name: string;
    level: number;
    hp: number;
}

//Schema类型检查是为了确保运行时不出错
export const RoleSchema: Schema<RoleRow> = {
    id:    { type: 'string' },
    name:  { type: 'string' },
    level: { type: 'number' },
    hp:    { type: 'number' },
};

export interface ItemRow {
    id: string;      // 主键
    name: string;
    count: number;
}

export const ItemSchema: Schema<ItemRow> = {
    id:    { type: 'string' },
    name:  { type: 'string' },
    count: { type: 'number' },
};
