class AlarmClock {
    constructor() {
      this.alarmCollection = [];
      this.timerId = null;
    }
   
    addClock(time, callback, id) {
      if (id === undefined) {
        throw new Error('error text');
      }
   
      if (this.alarmCollection.some((item) => item.id === id)) {
        console.error('Ошибка!!! Звонок уже существует');
        return;
      }
   
      this.alarmCollection.push({ time, callback, id });
    }
   
    removeClock(id) {
   
      let bar = this.alarmCollection.length;
   
         
      this.alarmCollection = this.alarmCollection.filter((item) => item.id !== id);
      return bar === this.alarmCollection.length;
   
    }
   
    getCurrentFormattedTime() {
        return new Date().toLocaleTimeString("ru-Ru", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
   
    start() {
      if (this.timerId) {
        return;
      }
   
      this.timerId = setInterval(() => {
        this.alarmCollection.forEach((clock) => {
          if (this.getCurrentFormattedTime() === clock.time) {
            clock.callback();
          }
        });
      }, 1000);
      
         
    }
   
    stop() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
   
    }
   
    printAlarms() {
      this.alarmCollection.forEach((item) => console.log(`id: ${item.id};`, `time: ${item.time}.`));
    }
   
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
    }
   
  }
  let a = new AlarmClock;
  a.addClock(42, 5, 21);
  a.addClock(4, 5, 1);
  a.addClock(54, 5, 83);
  a.addClock(94, 5, 93);
  console.log(a.getCurrentFormattedTime());
  console.log(a.removeClock(15));
  console.log(a.alarmCollection);
  a.printAlarms()
   