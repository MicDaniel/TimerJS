class Stopwatch
{
    constructor(duration) {
        this.time = 0;
        this.duration = duration * 60; 
        this.start();
    }

    set duration(duration)
    {
        this._duration = duration;
    }
    get duration()
    {
        return this._duration;
    }

    set target(target)
    {
        this._target = target;
    }
   
    get target() 
    {
        return this._target;
    }

    get time() {
        return this._time;
    };

    set time(currentTime) {
        
        this._time = currentTime;
    };

    start()
    {
        if(!this.watch)
        {
            this.watch = setInterval(this.tick.bind(this), 1000);
        }
        console.log(this);
    }

    stop()
    {
        if(this.watch)
        {
            clearInterval(this.watch);
            this.seconds = 0;
            this.minutes = 0;
        }

    }

    static convertTime(time, isOverTime)
    {   
          
        this.minutes = Math.trunc(time / 60);
        this.seconds = time - this.minutes * 60; 
        if(isOverTime){
            return "-" + Stopwatch.showDigits(this.minutes) + ":" + Stopwatch.showDigits(this.seconds); 
        }
             
        return Stopwatch.showDigits(this.minutes) + ":" + Stopwatch.showDigits(this.seconds);  
       
    } 
    
    static showDigits(number)
    {
        if (number < 10) {
            return   number = '0' + number;
        }
        return number;
    }

    tick()
    {
        let timeShow;
        this.time += 1;
        let dd = this.duration - this.time;
        let isOverTime = false;
        if(dd < 0) 
        {
            dd = dd * -1;
            isOverTime = true; 
        }
        timeShow = Stopwatch.convertTime(dd,isOverTime); 
    
        if(this.target)
        {
            console.log({ time: timeShow, isTime: isOverTime });
            this.target.dispatchEvent(new CustomEvent('tick', { detail: { time: timeShow, isOverTime:isOverTime }}));  
        }
    }

}
