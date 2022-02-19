import Logger from "./Logger";

/**
 * @param counterLoop something very very cool
 */
export interface Config {
  counterLoop: number;
  max: number;
}

export class Limiter {
  currentLoad: number = 0;
  queue: Function[] = [];
  interval: NodeJS.Timer | null = null;

  constructor(public config: Config) {}

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
    if (this.interval) clearInterval(this.interval);
  }

  reset() {
    this.currentLoad = 0;
    this.queue = [];
  }

  executeAll() {
    this.queue.forEach((action) => action());
  }

  accountFor(loadChange: number) {
    this.currentLoad += loadChange;
    this.processQueue();
  }

  canAddLoad(): boolean {
    return this.currentLoad < this.config.max;
  }

  execute(action: Function) {
    this.accountFor(1);
    return action();
  }

  requestApproval<A>(action: A) {
    if (this.canAddLoad()) {
      this.accountFor(1);
      return action;
    } else {
      const promise = new Promise<A>((resolve) => {
        this.queue.push(() => {
          resolve(action);
        });
      });

      return promise;
    }
  }

  private processQueue(): void {
    const emptySpace = this.config.max - this.currentLoad;

    for (let idx = 0; idx < emptySpace; idx++) {
      const action = this.queue.shift();

      // TODO Action should always be defined, I should ideally write some tests
      // TODO and perform a type Casting if it is in fact not an issue

      if (!action) continue;
      action();
    }
  }
}

const limiter = new Limiter({ counterLoop: 5, max: 50 });
