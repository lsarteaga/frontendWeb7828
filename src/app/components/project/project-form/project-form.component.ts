import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  faIdCard,
  faPhone,
  faHome,
  faUser,
  faQuoteLeft,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../shared/models/project/project';
import { ProjectService } from '../../../core/services/project/project.service';
import { Employee } from '../../../shared/models/employee/employee';
import { EmployeeService } from '../../../core/services/employee/employee.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  faTimes = faTimes;
  faSave = faSave;
  faIdCard = faIdCard;
  faPhone = faPhone;
  faQuoteLeft = faQuoteLeft;
  faHome = faHome;
  faUser = faUser;
  project: Project = new Project();
  title: string;
  form: FormGroup;
  submitted = false;
  employees: Employee[];
  projectStatus: ['En Progeso', 'Finalizado', 'Iniciado'];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log(this.project.idcontract);
      if (params['id']) {
        this.projectService.retrieve(params['id']).subscribe((result) => {
          this.project = result;
          this.project.idproject = params['id'];
          this.title = 'Actualizando Proyecto ' + this.project.idproject;
        });
      } else {
        this.project = new Project();
        this.project.idcontract = params['idContract'];
        this.title = 'Nuevo registro';
      }
    });

    this.form = this.formBuilder.group({
      address: ['', [Validators.required]],
      status: ['', [Validators.required]],
      description: ['', [Validators.required]],
      projectType: ['', [Validators.required]],
      idcontract: ['', [Validators.required]],
    });
    this.listEmployees();
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    console.warn(this.project.idcontract);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.projectService.save(this.project).subscribe((result) => {
      this.submitted = false;
      if (result !== undefined) {
        if (result.icon === 'success') {
          this.router.navigate(['contract/card/', this.project.idcontract]);
          return;
        }
      }
    });
  }

  onReset() {
    this.project = new Project();
    this.form.reset();
    this.submitted = false;
  }

  listEmployees() {
    this.employeeService.listAll().subscribe((result) => {
      this.employees = result;
    });
  }
}
