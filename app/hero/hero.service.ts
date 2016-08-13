import { Injectable } from '@angular/core';
import {Service1} from './service1';
import {Service2} from './service2';

export class Hero {
  constructor(public id: number, public name: string) { }
}

const HEROES: Hero[] = [
  new Hero(11, 'Mr. Nice'),
  new Hero(12, 'Narco'),
  new Hero(13, 'Bombasto'),
  new Hero(14, 'Celeritas'),
  new Hero(15, 'Magneta'),
  new Hero(16, 'RubberMan')
];

const FETCH_LATENCY = 500;

@Injectable()
export class HeroService {

  constructor(private s1: Service1, private s2: Service2) {
    this.s1 && this.s1.getName1();
    this.s2 && this.s2.getName2(); 
  }

  getHeroes() {
    return new Promise<Hero[]>(resolve => {
      setTimeout(() => { resolve(HEROES); }, FETCH_LATENCY);
    });
  }

  getHero(id: number | string) {
    return this.getHeroes()
      .then(heroes => heroes.find(hero => hero.id === +id));
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/