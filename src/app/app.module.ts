import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { EmployeeService } from './core/services/employee/employee.service';
import { ClientService } from './core/services/client/client.service';
import { ProjectService } from './core/services/project/project.service';
import { ServiceInterceptor } from './core/interceptors/service.interceptor';

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
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [EmployeeService, ClientService, ProjectService, {
    provide: HTTP_INTERCEPTORS,
    useClass: ServiceInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
