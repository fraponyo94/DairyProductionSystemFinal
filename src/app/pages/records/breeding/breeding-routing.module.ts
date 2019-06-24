
import { Routes, RouterModule } from '@angular/router';
import { MainBreedingComponent } from './main-breeding/main-breeding.component';

const childRoutes: Routes = [     
      { path: '', component:  MainBreedingComponent }

];

export const routing = RouterModule.forChild(childRoutes);
