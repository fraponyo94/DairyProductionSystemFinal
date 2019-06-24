
import { Routes, RouterModule } from '@angular/router';
import { HealthComponent } from './health.component';



const childRoutes: Routes = [

          { path: '', redirectTo: 'cattle/health', pathMatch: 'full' },
          { path: 'cattle/health', component: HealthComponent },
         
      ];

export const routing = RouterModule.forChild(childRoutes);
