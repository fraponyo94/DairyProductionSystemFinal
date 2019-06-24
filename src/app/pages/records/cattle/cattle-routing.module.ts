
import { Routes, RouterModule } from '@angular/router';
import { CattleComponent } from './cattle.component';
import { AddCattleComponent } from './add-cattle.components/add-cattle.component';
import { CalfComponent } from './calf/calf.component';
import { CattleListComponent } from './cattle-list/cattle-list.component';

const childRoutes: Routes = [
  {
      path: '',
      component: CattleComponent,
      children: [
          { path: '', redirectTo: 'add/cow', pathMatch: 'full' },
          { path: 'add/cow', component: AddCattleComponent },
          { path: 'add/calf', component: CalfComponent},
          { path: 'view/records',component: CattleListComponent }
                 
      ]
  }
];

export const routing = RouterModule.forChild(childRoutes);