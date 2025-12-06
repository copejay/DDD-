// GameDB.ts
import { Table } from './Table';
import { SaveService } from './SaveService';
import { RoleRow, RoleSchema, ItemRow, ItemSchema } from './GameTypes';

export interface GameDBRaw {
    roles?: { [id: string]: RoleRow };
    items?: { [id: string]: ItemRow };
    // 以后可以继续加其它表：skills / tasks / mails ...
}

export class GameDB {
    readonly roles: Table<RoleRow>;
    readonly items: Table<ItemRow>;

    constructor(raw?: GameDBRaw) {
        //RoleRow是用来约束每个row的输入
        //RoleSchema用来进行运行中类型检查
        //这两个配合起来，在编译时检查一次，再使用过程中又会进行检测
        this.roles = new Table<RoleRow>('roles', RoleSchema, raw?.roles);
        this.items = new Table<ItemRow>('items', ItemSchema, raw?.items);
    }

    // 导出成可序列化的纯数据，用于存档
    export(): GameDBRaw {
        return {
            roles: this.roles.export(),
            items: this.items.export(),
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


