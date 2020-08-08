import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Employee} from '../../../shared/models/employee/employee';
import { EmployeeService } from '../../../core/services/employee/employee.service'
import { faEye, faPlus, faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  faTrash=faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  employees: Employee[];

  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];

  title = "Listado de empleados";
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.count();
  }


  init() : void{
    this.pages = [];    
    this.currentPage = 1;    
  }
  count(): void {
    this.employeeService.count().subscribe(
      result => {        
        console.log(result);
        this.numberDocs = result.numberDocs;                           
        this.calcNumberPages();
      }
    );
  }

  calcNumberPages() {   
    this.init();    
    this.numberPages = Math.floor(this.numberDocs / this.limit);
    this.numberPages++;            
    for (let index = 1; index <= this.numberPages; index++) {            
      this.pages.push(index);
    }    
    this.loadPage(this.currentPage);
  }
  changeLimit($event){
    this.limit = $event.target.value;
    this.calcNumberPages();
  }

  loadPage(pg : number){    
    this.currentPage = pg;    
    this.employeeService.list(pg, this.limit).subscribe(
      result => {
        console.log(result);
        this.employees = result      
      }
    )
  }

  delete(employe: Employee): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `El registro de ${employe.name} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.employeeService.delete(employe.idemployee).subscribe(
          result => {                        
            this.loadPage(this.currentPage);
          }
        );
      }
    });
  }
 

}
