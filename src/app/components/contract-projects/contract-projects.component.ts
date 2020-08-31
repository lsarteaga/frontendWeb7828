import { Component, Input, OnInit } from '@angular/core';
import {
  faEye,
  faPlus,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Project } from '../../shared/models/project/project';
import { ProjectService } from '../../core/services/project/project.service';

@Component({
  selector: 'app-contract-projects',
  templateUrl: './contract-projects.component.html',
  styleUrls: ['./contract-projects.component.css'],
})
export class ContractProjectsComponent implements OnInit {
  @Input() idContract: string;
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  projects: Project[];
  numberPages: number;
  numberDocs: number;
  limit = 10;
  currentPage = 1;
  pages: Array<number> = [];
  title: string;

  constructor(private router: Router, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.count();
  }

  init(): void {
    this.title = 'Proyectos Asociados';
    this.pages = [];
    this.currentPage = 1;
  }

  count(): void {
    this.projectService.count2(this.idContract).subscribe((result) => {
      console.log(result);
      this.numberDocs = result.numberDocs;
      this.calcNumberPages();
    });
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

  changeLimit($event) {
    this.limit = $event.target.value;
    this.calcNumberPages();
  }

  loadPage(pg: number) {
    this.currentPage = pg;
    this.projectService
      .list2(pg, this.limit, this.idContract)
      .subscribe((result) => {
        console.log(result);
        this.projects = result;
      });
  }

  delete(project: Project): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `El registro de código ${project.idproject}  será eliminado permanentemente`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((option) => {
        if (option.value) {
          this.projectService.delete(project.idproject).subscribe((result) => {
            this.loadPage(this.currentPage);
          });
        }
      });
  }
}
