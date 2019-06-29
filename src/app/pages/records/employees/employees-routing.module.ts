
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';
import { authorities } from '../shared/model/models ';


const childRoutes: Routes = [       
          { path: '', 
          component: EmployeesComponent
          // canActivate: [AuthGuard],
          // data: { roles: [authorities.Admin]}
            
        }, ];

export const routing = RouterModule.forChild(childRoutes); 