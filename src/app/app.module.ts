import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeCardComponent } from './components/employee/employee-card/employee-card.component';
import { EmployeeFormComponent } from './components/employee/employee-form/employee-form.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeService } from './core/services/home/home.service';
import { MaterialModule } from './modules/material/material.module';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { ContractCardComponent } from './components/contract/contract-card/contract-card.component';
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ContractFormComponent } from './components/contract/contract-form/contract-form.component';
import { AdvanceCardComponent } from './components/advance/advance-card/advance-card.component';
import { AdvanceListComponent } from './components/advance/advance-list/advance-list.component';
import { AdvanceFormComponent } from './components/advance/advance-form/advance-form.component';
import { ContractService } from './core/services/contract/contract.service';
import { AdvanceService } from './core/services/advance/advance.service';
import { EmployeeContractsComponent } from './components/employee-contracts/employee-contracts.component';
import { ContractProjectsComponent } from './components/contract-projects/contract-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCardComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    ClientFormComponent,
    ClientListComponent,
    ClientCardComponent,
    ProjectFormComponent,
    ProjectListComponent,
    ProjectCardComponent,
    MasmasPipe,
    NavComponent,
    HomeComponent,
    ContractCardComponent,
    ContractListComponent,
    ContractFormComponent,
    AdvanceCardComponent,
    AdvanceListComponent,
    AdvanceFormComponent,
    EmployeeContractsComponent,
    ContractProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    EmployeeService,
    ClientService,
    ProjectService,
    HomeService,
    AdvanceService,
    ContractService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
