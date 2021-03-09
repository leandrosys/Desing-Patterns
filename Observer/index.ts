import animationProgress  from './animateprogress'

interface Observer {
    update: (data: any) => void;
}

interface Subject {
    subscribe: (observer: Observer) => void;
    unsubscribe: (observer: Observer) => void;
}

class Progressbar implements Subject {
    observers: Observer[] = [];

    constructor() {
        const el: HTMLInputElement = document.querySelector('#value')
        el.addEventListener('input', () => {
            this.notify(el.value)
            animationProgress(el, el.value)
        })
    }

    subscribe(observer: Observer) {
        this.observers.push(observer)
    }

    unsubscribe(observer: Observer) {
        const index = this.observers.findIndex(obs => {
            return obs === observer
        });

        this.observers.slice(index, 1);
    }

    notify(data: any) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class ProgessDisplay implements Observer {
    private el: HTMLInputElement;

    constructor() {
        this.el = document.querySelector('#progress')
    }

    update(data: any) {
        animationProgress(this.el, data)
    }
}

const value = new Progressbar()
const progress = new ProgessDisplay()

value.subscribe(progress)