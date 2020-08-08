import { Component, OnInit } from '@angular/core';
import { faEye, faPlus, faPencilAlt,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Project} from '../../../shared/models/project/project';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/core/services/project/project.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  faTrash=faTrash;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  projects : Project[];
  title:string;
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  last = '-';

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.count();
  }

  init() : void{
    this.pages = [];    
    this.currentPage = 1;
    this.last = '-'; 
  }

  count(): void {
    this.projectService.count().subscribe(
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
    this.projectService.list(pg, this.limit).subscribe(
      result => {
        console.log(result);
        this.projects = result      
      }
    )
  }


  delete(project: Project): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `El registro de id ${project.idclient} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.projectService.delete(project.idemployee).subscribe(
          result => {                        
            this.loadPage(this.currentPage);
          }
        );
      }
    });
  }

}
