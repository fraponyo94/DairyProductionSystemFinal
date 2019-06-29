import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';

import { GlobalService } from './services/global.service';



import { MenuComponent } from './layouts/menu/menu.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ContentTopComponent } from './layouts/content-top/content-top.component';
import { PagesTopComponent } from './layouts/pages-top/pages-top.component';
import { MaterialModule } from './material/material.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        MaterialModule,
        MDBBootstrapModule.forRoot()
    ],
    providers: [
        GlobalService
    ],
    declarations: [
        MenuComponent,
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent
          
           ],
    exports: [
        SidebarComponent,
        PagesTopComponent,
        ContentTopComponent      
       
    ]
})
export class LayoutModule { }
