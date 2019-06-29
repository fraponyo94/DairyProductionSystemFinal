import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AuthGuard } from 'src/app/shared/guards/auth-guard.service';

const childRoutes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    }
];

export const routing = RouterModule.forChild(childRoutes);
