

// 全局事件中心
export class EventBus {
    private listeners: Map<string, Set<(data?: any) => void>> = new Map();

    // 订阅事件
    on(event: string, listener: (data?: any) => void) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(listener);
    }

    // 取消订阅
    off(event: string, listener: (data?: any) => void) {
        const set = this.listeners.get(event);
        if (!set) return;
        set.delete(listener);
    }

    // 派发事件
    emit(event: string, data?: any) {
        const set = this.listeners.get(event);
        if (!set) return;

        for (const listener of set) {
            listener(data);
        }
    }

    // 清空某事件
    clear(event: string) {
        this.listeners.delete(event);
    }

    // 清空全部
    clearAll() {
        this.listeners.clear();
    }
}

// 全局单例
export const GlobalEventBus = new EventBus();
