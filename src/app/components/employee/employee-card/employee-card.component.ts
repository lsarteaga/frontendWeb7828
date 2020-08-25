import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee/employee';
import {
  faPhone,
  faUniversity,
  faSave,
  faTimes,
  faUsers,
  faDirections,
  faIdCard,
  faHome,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit {
  faUser = faUsers;
  faDirections = faDirections;
  faPhone = faPhone;
  faIdCard = faIdCard;
  faUniversity = faUniversity;
  faArrowLeft = faArrowLeft;

  employee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params['id']) {
        this.employee = new Employee();
        this.employeeService.retrieve(params['id']).subscribe((result) => {
          this.employee = result;
          this.employee.idemployee = params['id'];
          console.warn(result);
        });
      }
    });
  }
}
