"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Limiter = void 0;
class Limiter {
    constructor(config) {
        this.config = config;
        this.currentLoad = 0;
        this.queue = [];
        this.interval = null;
    }
    /**
     * Start the timing process;
     */
    start() {
        // just making sure that the interval is not running to avoid duplicating intervals;
        this.stop();
        this.interval = setInterval(() => {
            this.currentLoad = 0;
            this.processQueue();
        }, this.config.counterLoop);
        return this;
    }
    stop() {
        if (this.interval)
            clearInterval(this.interval);
    }
    reset() {
        this.currentLoad = 0;
        this.queue = [];
    }
    executeAll() {
        this.queue.forEach((action) => action());
    }
    accountFor(loadChange) {
        this.currentLoad += loadChange;
        this.processQueue();
    }
    canAddLoad() {
        return this.currentLoad < this.config.max;
    }
    execute(action) {
        this.accountFor(1);
        return action();
    }
    requestApproval(action) {
        if (this.canAddLoad()) {
            this.accountFor(1);
            return action;
        }
        else {
            const promise = new Promise((resolve) => {
                this.queue.push(() => {
                    resolve(action);
                });
            });
            return promise;
        }
    }
    processQueue() {
        const emptySpace = this.config.max - this.currentLoad;
        for (let idx = 0; idx < emptySpace; idx++) {
            const action = this.queue.shift();
            // TODO Action should always be defined, I should ideally write some tests
            // TODO and perform a type Casting if it is in fact not an issue
            if (!action)
                continue;
            action();
        }
    }
}
exports.Limiter = Limiter;
const limiter = new Limiter({ counterLoop: 5, max: 50 });
//# sourceMappingURL=Limiter.js.map