
import { Routes, RouterModule } from '@angular/router';
import { MilkComponent } from './milk.component';
import { MilkingComponent } from './add-milk-records/milking.component';
import { MilkRecordsComponent } from './milk-records/milk-records.component';


const childRoutes: Routes = [
  {
      path: '',
      component: MilkComponent,
      children: [
          { path: '', redirectTo: 'add-record', pathMatch: 'full' },
          { path: 'add-record', component: MilkingComponent },
          { path: 'view-records', component: MilkRecordsComponent }         
      ]
  }
];

export const routing = RouterModule.forChild(childRoutes);
