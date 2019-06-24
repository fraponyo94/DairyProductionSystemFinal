
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';


const childRoutes: Routes = [       
          { path: '', component: EmployeesComponent }
      
];

export const routing = RouterModule.forChild(childRoutes); 