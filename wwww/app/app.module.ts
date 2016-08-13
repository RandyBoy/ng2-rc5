import { NgModule, ComponentFactoryResolver }      from '@angular/core';
import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TestComponent, DynamicComponent} from "./test";
import {Service1} from './Service1';
import {Service2} from './Service2';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, TestComponent, DynamicComponent],
  exports: [],
  bootstrap: [AppComponent],
  providers: [Service1, Service2]
})
export class AppModule { }
