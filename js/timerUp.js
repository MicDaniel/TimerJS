class Timer extends Stopwatch {
    constructor(duration) {
        super(duration);
    }

    start() {
        if(!this.watch) {
            this.watch = setInterval(this.tick.bind(this), 1000);
        }
        console.log(this);
    }

    static convertTime(time, isOverTime) {
        this.minutes = Math.trunc(time / 60);
        this.seconds = time - this.minutes * 60;
        
        return super.showDigits(this.minutes) + ':' + super.showDigits(this.seconds);
    }

    tick() {
        let timeShow;
        this.time += 1;
        let counter = this.duration - this.time;
        let isOverTime = false;
        
        if(counter < 0) {
            isOverTime = true;
        }

        timeShow = Timer.convertTime(this.time, this.isOverTime);

        if(this.target) {
            console.log({ time: timeShow, isTimeOver: isOverTime});
            this.target.dispatchEvent(new CustomEvent('tick', { detail: { time: timeShow, isOverTime:isOverTime}}));
        }
    }
} 