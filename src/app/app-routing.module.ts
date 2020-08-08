import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientCardComponent} from './components/client/client-card/client-card.component';
import {ClientFormComponent} from './components/client/client-form/client-form.component';
import {ClientListComponent} from './components/client/client-list/client-list.component';
import {EmployeeCardComponent} from './components/employee/employee-card/employee-card.component';
import {EmployeeFormComponent} from './components/employee/employee-form/employee-form.component';
import {EmployeeListComponent} from './components/employee/employee-list/employee-list.component';
import {ProjectCardComponent} from './components/project/project-card/project-card.component';
import {ProjectFormComponent} from './components/project/project-form/project-form.component';
import {ProjectListComponent} from './components/project/project-list/project-list.component';


const routes: Routes = [
  {path: 'employee/:id', component: EmployeeCardComponent},
  {path: 'employee/form', component: EmployeeFormComponent},
  {path: 'employee/form/:id', component: EmployeeFormComponent},
  {path: 'employee/list', component: EmployeeListComponent},
  {path: 'client/:id', component: ClientCardComponent},
  {path: 'client/form', component: ClientFormComponent},
  {path: 'client/form/:id', component: ClientFormComponent},
  {path: 'client/list', component: ClientListComponent},
  {path: 'project/:id', component: ProjectCardComponent},
  {path: 'project/form', component: ProjectFormComponent},
  {path: 'project/form/:id', component: ProjectFormComponent},
  {path: 'project/list', component: ProjectListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
