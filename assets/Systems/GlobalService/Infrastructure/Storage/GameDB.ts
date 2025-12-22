// GameDB.ts
import { Table } from './Table';
import { SaveService } from './SaveService';
import { RoleRow, RoleSchema,
     ItemRow, ItemSchema ,
     WeaponRow,WeaponSchema,
     StackItemRow,StackItemSchema,
     FormationRow,FormationSchema} from './GameTypes';

export interface GameDBRaw {
    roles?: { [id: string]: RoleRow };
    items?: { [id: string]: ItemRow };
    weapons?: { [id: string]: WeaponRow };
    stackItems?: { [id: string]: StackItemRow };
    formations?: { [id: string]: FormationRow };
    // 以后可以继续加其它表：skills / tasks / mails ...
}

export class GameDB {
    readonly roles: Table<RoleRow>;
    readonly items: Table<ItemRow>;
    readonly weapons: Table<WeaponRow>;
    readonly stackItems: Table<StackItemRow>;
    readonly formations: Table<FormationRow>;
    
    constructor(raw?: GameDBRaw) {
        //RoleRow是用来约束每个row的输入
        //RoleSchema用来进行运行中类型检查
        //这两个配合起来，在编译时检查一次，再使用过程中又会进行检测
        this.roles = new Table<RoleRow>('roles', RoleSchema, raw?.roles);
        this.items = new Table<ItemRow>('items', ItemSchema, raw?.items);
        this.weapons = new Table<WeaponRow>('weapons', WeaponSchema, raw?.weapons);
        this.stackItems = new Table<StackItemRow>('stackItems', StackItemSchema, raw?.stackItems);
        this.formations = new Table<FormationRow>('formations', FormationSchema, raw?.formations);
    }

    // 导出成可序列化的纯数据，用于存档
    export(): GameDBRaw {
        return {
            roles: this.roles.export(),
            items: this.items.export(),
            weapons: this.weapons.export(),
            stackItems: this.stackItems.export(),
            formations: this.formations.export(),
        };
    }

    // 方便统一存档
    saveToStorage(key: string = 'gameData') {
        const data = this.export();
        SaveService.save(key, data);
    }

    // 静态方法：从存储中加载
    static loadFromStorage(key: string = 'gameData'): GameDB {
        const raw = SaveService.load<GameDBRaw>(key) || {};
        return new GameDB(raw);
    }
}


