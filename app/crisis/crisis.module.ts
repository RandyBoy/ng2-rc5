import { NgModule }      from '@angular/core';
// import { CommonModule }  from '@angular/common';
import { SharedModule }       from '../shared/shared.module';

import { CrisisListComponent }    from './crisis-list.component';
import { CrisisDetailComponent }  from './crisis-detail.component';
import { CrisisService } from './crisis.service';
import { routing }       from './crisis.routing';

@NgModule({
  imports: [SharedModule, routing],
  declarations: [CrisisDetailComponent, CrisisListComponent],
  providers: [CrisisService]
})
export default class CrisisModule { }


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/