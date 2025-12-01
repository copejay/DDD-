// Table.ts
import { Schema, validateBySchema } from './Schema';

export class Table<T extends { id: string }> {
    private rows: { [id: string]: T } = {};
    private tableName: string;
    private schema: Schema<T>;

    constructor(tableName: string, schema: Schema<T>, initData?: { [id: string]: T }) {
        this.tableName = tableName;
        this.schema = schema;
        if (initData) {
            // 初始化时也做一次校验
            for (const id in initData) {
                const checked = validateBySchema<T>(this.tableName, this.schema, initData[id], id);
                this.rows[id] = checked;
            }
        }
    }

    // 按 id 获取一条
    get(id: string): T | undefined {
        return this.rows[id];
    }

    // 是否存在
    exists(id: string): boolean {
        return id in this.rows;
    }

    // 获取所有（避免 Object.values 兼容问题，使用 Object.keys）
    getAll(): T[] {
        return Object.keys(this.rows).map((k) => this.rows[k]);
    }

    // 条件查询
    where(predicate: (row: T) => boolean): T[] {
        return this.getAll().filter(predicate);
    }

    // 插入 / 更新（会校验 schema）
    set(id: string, data: T) {
        const checked = validateBySchema<T>(this.tableName, this.schema, data, id);
        this.rows[id] = checked;
    }

    // 删除一条
    delete(id: string) {
        if (id in this.rows) {
            delete this.rows[id];
        }
    }

    // 行数
    count(): number {
        return Object.keys(this.rows).length;
    }

    // 导出为纯数据（用于存档）
    export(): { [id: string]: T } {
        return this.rows;
    }
}
