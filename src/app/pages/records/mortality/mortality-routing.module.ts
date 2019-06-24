
import { Routes, RouterModule } from '@angular/router';
import { MortalityComponent } from './mortality.component';


const childRoutes: Routes = [

          { path: '', redirectTo: 'mortality-records', pathMatch: 'full' },
          { path: 'mortality-records', component: MortalityComponent }
];

export const routing = RouterModule.forChild(childRoutes);
