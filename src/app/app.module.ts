import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeCardComponent } from './components/employee/employee-card/employee-card.component';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { ClientListComponent } from './components/client/client-list/client-list.component';
import { ClientCardComponent } from './components/client/client-card/client-card.component';
import { ProjectFormComponent } from './components/project/project-form/project-form.component';
import { ProjectListComponent } from './components/project/project-list/project-list.component';
import { ProjectCardComponent } from './components/project/project-card/project-card.component';
import { MasmasPipe } from './shared/pipes/masmas.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    EmployeeCardComponent,
    ClientFormComponent,
    ClientListComponent,
    ClientCardComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ProjectCardComponent,
    MasmasPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
