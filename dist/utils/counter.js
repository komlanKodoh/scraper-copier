"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeCounter {
    constructor() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.counter = undefined;
    }
    start() {
        this.counter = setInterval(() => {
            this.seconds++;
            if (this.seconds >= 60)
                this.minutes++;
            if (this.minutes >= 60)
                this.hours++;
        }, 1000);
    }
    pause() {
        if (this.counter) {
            clearTimeout(this.counter);
            console.log("counter paused");
        }
        else {
            console.log("Operation failed: no interval to clear");
        }
    }
    reset() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
    stop() {
        this.counter = undefined;
    }
}
exports.default = TimeCounter;
//# sourceMappingURL=counter.js.map