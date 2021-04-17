import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/others/dashboard/dashboard.component';
import { PruebaComponent } from './components/others/prueba/prueba.component';
import { AdminComponent } from './components/others/admin/admin.component';
import {PeopleComponent} from './components/others/people/people.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'create',
        component: PruebaComponent
      },
      {
        path: 'edit/:id',
        component: PeopleComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
