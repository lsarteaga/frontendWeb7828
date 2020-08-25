import { Component, OnInit } from '@angular/core';
import {
  faPhone,
  faUniversity,
  faSave,
  faTimes,
  faUsers,
  faDirections,
  faIdCard,
  faHome,
  faBackspace,
  faQuoteLeft,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { Employee } from 'src/app/shared/models/employee/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  faHome = faHome;
  faQuoteLeft = faQuoteLeft;

  faSave = faSave;
  faUsers = faUsers;
  faTimes = faTimes;
  faDirections = faDirections;
  faIdCard = faIdCard;
  faBackspace = faBackspace;
  faUniversity = faUniversity;
  faPhone = faPhone;
  faArrowLeft = faArrowLeft;

  form: FormGroup;
  title: string;
  submitted = false;
  employee = new Employee();
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.employeeService.retrieve(params['id']).subscribe((result) => {
          this.employee = result;
          this.employee.idemployee = params['id'];
          this.title = 'Actualizando Registro';
        });
      } else {
        this.employee = new Employee();
        this.title = 'Realizar Registro';
      }
    });
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.min(0)]],
      surname: ['', [Validators.required, Validators.min(0)]],
      cardId: ['', [Validators.required, Validators.min(0)]],
      profession: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onReset(): void {
    this.form.reset();
    this.submitted = false;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      console.warn('forma invalida');
      return;
    }
    this.employeeService.save(this.employee).subscribe((result) => {
      console.warn(result);
      this.submitted = false;
      if (result.icon === 'success') {
        Swal.fire(result);
        this.router.navigate(['employee/list']);
        return;
      }
    });
  }
}
