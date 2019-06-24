import { Routes, RouterModule } from '@angular/router';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dairy/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dairy/login'
  }
];

export const routing = RouterModule.forRoot(appRoutes);
