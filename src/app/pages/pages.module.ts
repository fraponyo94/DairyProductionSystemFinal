import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { ErrorsHandlerModule } from '../shared/errors-handler.module';






@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,       
        routing,
        ErrorsHandlerModule

     
    ],
    declarations: [
        PagesComponent
       
      
       
    ]
})
export class PagesModule { }
