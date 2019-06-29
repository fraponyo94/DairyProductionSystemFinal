import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './profile.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ErrorsHandlerModule } from 'src/app/shared/errors-handler.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        routing,
        ErrorsHandlerModule,
        ReactiveFormsModule
      
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule { }
