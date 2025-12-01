

// GameDBService.ts
import { GameDB } from './GameDB';

export class GameDBService {
    private static _instance: GameDBService;
    private _db: GameDB | null = null;

    private constructor() {}

    static get instance(): GameDBService {
        if (!this._instance) {
            this._instance = new GameDBService();
        }
        return this._instance;
    }

    init() {
        if (!this._db) {
            this._db = GameDB.loadFromStorage();
        }
    }

    get db(): GameDB {
        if (!this._db) {
            throw new Error('GameDBService 未初始化，请先调用 init()');
        }
        return this._db;
    }

    reload() {
        this._db = GameDB.loadFromStorage();
    }

    clear() {
        this._db = new GameDB();
    }
}
