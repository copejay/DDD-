// GameTypes.ts
import { Schema } from './Schema';

interface RoleBaseInfo {
  name: string;
  level: number;
  exp: number;
}

// interface RoleEquipList{
//     weapons:{id:string,up:boolean}[];
// }

// interface RoleSkillList{
//     skills:{id:string,up:boolean}[];
// }

export interface RoleRow {
    id: string;      // 主键
    baseInfo:RoleBaseInfo;
    equipList:{id:string,up:boolean}[];
    skillList:{id:string,up:boolean}[];
    // name: string;
    // templateID:string;
    // level: number;
    // exp: number;
    // infoList:{};
}

//Schema类型检查是为了确保运行时不出错
export const RoleSchema: Schema<RoleRow> = {
    id:    { type: 'string' },
    baseInfo: { type: 'object' },
    equipList: { type: 'array' },
    skillList: { type: 'array' },
    // name:  { type: 'string' },
    // templateID: { type: 'string' },
    // level: { type: 'number' },
    // exp:    { type: 'number' },
};

// export interface ItemRow {
//     id: string;      // 主键
//     name: string;
//     count: number;
// }

// export const ItemSchema: Schema<ItemRow> = {
//     id:    { type: 'string' },
//     name:  { type: 'string' },
//     count: { type: 'number' },
// };
export interface CurrencyRow{
    id:string;
    count:number;
}

export const CurrencySchema:Schema<CurrencyRow>={
    id:{type:'string'},
    count: { type: 'number' },
}


export interface WeaponRow{
    id:string;
    archiveTime:number;
    name:string;
    info:string;

    level:number;
}

export const WeaponSchema: Schema<WeaponRow> = {
    id:        { type: 'string' },
    archiveTime: { type: 'number' },
    name:      { type: 'string' },
    info:      { type: 'string' },
    level:     { type: 'number' },
};


export interface StackItemRow{
    id:string;
    count:number;
}

export const StackItemSchema: Schema<StackItemRow> = {
    id: { type: 'string' },
    count:  { type: 'number' },
}


export interface FormationRow{
    id:string;
    FormationRole:[];
}

export const FormationSchema: Schema<FormationRow> = {
    id: { type: 'string' },
    FormationRole: { type: 'array' },
}