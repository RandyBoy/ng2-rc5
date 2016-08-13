

import {Injectable, Inject, Optional, ReflectiveInjector, NgModule, NgModuleRef, Injector} from '@angular/core';
import {Service2} from './service2';
import {Http} from '@angular/http';


@Injectable()
export class Service1 {

    constructor( private s2: Service2) {
        // let rejector = ReflectiveInjector.resolveAndCreate([Service2]);
        // this.s2 = rejector.get(Service2);
        this.s2 && this.s2.getName2();
    }

    getName1() {
        console.log(this)
        return '--name1'
    }
}

//// let rejector = ReflectiveInjector.resolveAndCreate([Service2]);
        // this.s2 = rejector.get(Service2);