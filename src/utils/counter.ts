// export default class TimeCounter {
//   hours: number;
//   minutes: number;
//   seconds: number;
//   counter: NodeJS.Timer;

//   constructor() {
//     this.hours = 0;
//     this.minutes = 0;
//     this.seconds = 0;
//     this.counter = undefined;
//   }

//   public start(): void {
//     this.counter = setInterval(() => {
//       this.seconds++;
//       if (this.seconds >= 60) this.minutes++;
//       if (this.minutes >= 60) this.hours++;
//     }, 1000);
//   }

//   public pause(): void {
//     if (this.counter) {
//       clearTimeout(this.counter);
//       console.log("counter paused");
//     } else {
//       console.log("Operation failed: no interval to clear");
//     }
//   }

//   public reset(): void {
//     this.hours = 0;
//     this.minutes = 0;
//     this.seconds = 0;
//   }

//   public stop(): void {
//     this.counter = undefined;
//   }
// }
