import { Observable, Subject, Subscription, timer } from 'rxjs';

export class Timer {
    private timeElapsed: number = 0;
    private timer: Observable<number> | null = null;
    private subscription: Subscription | null = null;

    private readonly step: number;

    update = new Subject<number>();

    constructor(step: number) {
        this.timeElapsed = 0;
        this.step = step;
    }

    start() {
        this.timer = timer(this.step, this.step);
        this.subscription = this.timer.subscribe(() => {
            this.timeElapsed = this.timeElapsed + this.step;
            this.update.next(this.timeElapsed);
        });
    }

    pause() {
        if (this.timer && this.subscription) {
            this.subscription.unsubscribe();
            this.timer = null;
        } else {
            this.start();
        }
    }

    stop() {
        if (this.timer && this.subscription) {
            this.subscription.unsubscribe();
            this.timer = null;
        }
    }

    reset(){
        this.stop();
        this.timeElapsed = 0;
    }
}