import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './pages.routing';

import { LayoutModule } from '../shared/layout.module';
import { SharedModule } from '../shared/shared.module';

/* components */
import { PagesComponent } from './pages.component';
import { ErrorsHandlerModule } from '../shared/errors-handler.module';
import { PdfComponent } from './shared/reports/pdf/pdf.component';
import { FlexmonsterPivotModule } from 'ng-flexmonster';
import { MaterialModule } from '../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
    imports: [
        CommonModule,
        LayoutModule,
        SharedModule,       
        routing,
        ErrorsHandlerModule,
        FlexmonsterPivotModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule     
    ],
    declarations: [
        PagesComponent,
        PdfComponent
       
      
       
    ]
})
export class PagesModule { }
