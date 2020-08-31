import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Employee } from 'src/app/shared/models/employee/employee';
import { EmployeeService } from 'src/app/core/services/employee/employee.service';
import {
  faEye,
  faPlus,
  faPencilAlt,
  faAd,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-emploee-detalis',
  templateUrl: './emploee-detalis.component.html',
  styleUrls: ['./emploee-detalis.component.css']
})
export class EmploeeDetalisComponent implements OnInit {

  faTrash = faAd;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  @Output() emploteToAdd= new EventEmitter<Employee>();
  employees: Employee[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.lisEmployees();
  }

  lisEmployees(){
    this.employeeService.listAll().subscribe(
      result=>{
        this.employees = result;
      }
    )
  }

  emitEmployee(employee: Employee){
    this.emploteToAdd.emit(employee);
  }

}
