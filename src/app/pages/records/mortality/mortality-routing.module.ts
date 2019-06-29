
import { Routes, RouterModule } from '@angular/router';
import { MainMortalityComponent } from './main-mortality/main-mortality.component';


const childRoutes: Routes = [

          { path: '', redirectTo: 'mortality-records', pathMatch: 'full' },
          { path: 'mortality-records', component: MainMortalityComponent }
];

export const routing = RouterModule.forChild(childRoutes);
