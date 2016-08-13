// Exact copy except import UserService from shared
import { Component, ViewContainerRef, Injector, ViewChild, OnInit, ComponentMetadata }   from '@angular/core';

import { HeroService } from './hero.service';
import { UserService } from '../shared/user.service';
import {DynamicComponentLoader} from '../shared/DynamicComponentLoader';
import {DynamicComponent, TestComponent} from '../shared/test';

@Component({
  template: `
    <h2>Heroes of {{userName}}</h2>
    <button on-click ="loadComp()">加载新组件</button>
    <div id="child" #child1></div>
    <router-outlet></router-outlet>

  `,
  providers: [HeroService]
})
export class HeroComponent implements OnInit {
  userName = '';
  @ViewChild('child1', { read: ViewContainerRef }) child: ViewContainerRef;
  constructor(userService: UserService,
    private dcl: DynamicComponentLoader,
    location: ViewContainerRef,
    injector: Injector) {
    this.userName = userService.userName;
    dcl.loadNextToLocation(DynamicComponent, location);
    dcl.loadNextToLocation(TestComponent, location, []);
    dcl.loadAsRoot(TestComponent, '#child', injector);
  }

  ngOnInit() {
    const metadata = new ComponentMetadata({
      moduleId: module.id,
      selector: 'dynamic-component-load-html',
      template: '<h1>这是动态加生成的组件</h1>'
    });
    const cmpClass = class DynamicComponent {
      login(modelValue: any): boolean {
        console.log("dynamicLoginComponent:" + JSON.stringify(modelValue));
        return false;
      }
    };
    const decoratedCmp = Component(metadata)(cmpClass);
    this.dcl.loadNextToLocation(decoratedCmp, this.child);
  }
  loadTest: Boolean;
  loadComp() {
    this.loadTest ? this.dcl.loadNextToLocation(TestComponent, this.child) :
      this.dcl.loadNextToLocation(DynamicComponent, this.child);
    this.loadTest = !this.loadTest;
  }

}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/