

export * from "./DataBaseService/Application/DataBaseService";

export * from "./TemplateService/Application/TemplateService";



//导出存储限制
export type {RoleRow} from "./Infrastructure/Storage/GameTypes"
export type {ItemRow} from "./Infrastructure/Storage/GameTypes"
export type {WeaponRow} from "./Infrastructure/Storage/GameTypes"
export type {StackItemRow} from "./Infrastructure/Storage/GameTypes"

//导出池化管理
export * from "./Infrastructure/Pool/PoolManager";