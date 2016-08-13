import { Routes,
  RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  { path: 'crisis', loadChildren: 'app/crisis/crisis.module' },
  { path: 'heroes', loadChildren: 'app/hero/hero.module' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true, enableTracing: false });

// module.exports = { routes, routing }

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

interface a {
  a?: Number;
  b?: number;
}

interface func {
  f1?: () => void;
  f2?: () => void;
}



export class fc implements a, func {
  a: number;
  b: number;
  f1() {
    console.log('自定义函数');
  }
  static attach<T>(second: T) {
    let result = new this();
    return result = <fc & T>Object.assign(result, second);
  }
}


var obj: a = { a: 12, b: 13 };
var result = attach(new fc(), obj);
result.f1();

var aa: a = { a: 13 };
var func3: func = { f1: function () { console.log('动态扩展对象') } };
var result2 = extend(aa, func3);
result2.f1();

function attach<T, U>(first: T, second: U): T & U {
  let result = <T & U>Object.assign(first, second);
  return result;
}


function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  return result;
}

