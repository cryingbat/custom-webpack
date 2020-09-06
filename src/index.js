export class Vue {
    constructor() {
        this.insatll = false
    }

    noUse() {
        console.log('i have noUse');
    };
    sayHi() {
        console.log('hello', this.insatll);
    };
}