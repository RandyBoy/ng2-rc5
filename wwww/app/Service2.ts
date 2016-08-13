import {Injectable} from '@angular/core';

@Injectable()
export class Service2 {
    /**
     *
     */
    constructor() {
        console.log(this);
        
    }
    getName2() {
        return '--name2'
    }
}
