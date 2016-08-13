import { NgModule,
  ModuleWithProviders } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule }         from '@angular/forms';

import { AwesomePipe }         from './awesome.pipe';
import { HighlightDirective }  from './highlight.directive';
import { TitleComponent }      from './title.component';
import { UserService }         from './user.service';
import {DynamicComponent, TestComponent} from './test';
import {DynamicComponentLoader} from './DynamicComponentLoader';

@NgModule({
  imports: [CommonModule],
  declarations: [AwesomePipe, HighlightDirective, TitleComponent, DynamicComponent, TestComponent],
  exports: [AwesomePipe, HighlightDirective, TitleComponent, DynamicComponent, TestComponent,
    CommonModule, FormsModule]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserService, DynamicComponentLoader]
    };
  }
}


@NgModule({
  exports: [SharedModule],
  providers: [UserService]
})
export class SharedRootModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/