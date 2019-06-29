import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../shared/guards/auth-guard.service';


export const childRoutes: Routes = [  

    {
        path: 'dairy',
        component: PagesComponent ,    
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadChildren: './login/login.module#LoginModule'},        
            { path: 'employees', loadChildren: './records/employees/employees.module#EmployeesModule'},
            { path: 'milking', loadChildren: './records/milking/milking.module#MilkingModule'},
            { path: 'cattle' , loadChildren: './records/cattle/cattle.module#CattleModule'},
            { path: 'breeding', loadChildren: './records/breeding/breeding.module#BreedingModule' },
            { path: 'health' , loadChildren: './records/health/health.module#HealthModule'},
            { path: 'mortality', loadChildren: './records/mortality/mortality.module#MortalityModule' },
            { path: 'profile', redirectTo: 'home',pathMatch: 'full' },
            { path: 'home', loadChildren: './profile/profile.module#ProfileModule' }          
          

          
           

        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
