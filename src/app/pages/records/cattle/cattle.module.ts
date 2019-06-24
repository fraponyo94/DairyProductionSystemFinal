import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  routing } from './cattle-routing.module';
import { CattleComponent } from './cattle.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddCattleComponent } from './add-cattle.components/add-cattle.component';
import { CalfComponent } from './calf/calf.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CattleListComponent } from './cattle-list/cattle-list.component';
import { CalfDetailsComponent } from './calf/calf-details/calf-details.component';

@NgModule({
  declarations: [ CattleComponent,AddCattleComponent,CalfComponent, CattleListComponent, CalfDetailsComponent],
  imports: [
    CommonModule,
    routing,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,   
    FlexLayoutModule,
    MDBBootstrapModule.forRoot() 
  ],
  entryComponents: [
    CalfDetailsComponent
  ],
})
export class CattleModule { }
