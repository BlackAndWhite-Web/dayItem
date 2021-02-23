// 事件总线；
// 观察者模式
// vue&react中的区别和应用；
// 产出文章;

// 1. event的数据结构 map来代替
// 2. once的含义，执行一次以后，就解除监听器，只触发一次；
class EventBus {
    constructor() {
        this._event = new Map();
    }
    emit(type, ...args) {
        const handle = this._event.get(type);
        if(Array.isArray(handle)) {
            for(let i = 0; i< handle.length; i++) {
                handle[i].call(this, ...args);
            }
        } else {
            return;
        }
    }

    on(type, fn) {
        const handle = this._event.get(type);
        if(!handle) {
            this._event.set(type, [fn]);
        } else {
            handle.push(fn);
        }
    }

    once(type, fn) {
        const self = this;
        function handler() {
            self.off(type);
            fn.apply(null, arguments);
        }
        this.on(type, handler)
    }

    off(type, fn) {
        const handle = this._event.get(type);
        if(!fn) {
            this._event.delete(type)
        } else {
            handle.splice(handle.findIndex(e => e === fn), 1);
        }
    }
}
