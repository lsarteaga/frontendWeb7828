import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../core/services/client/client.service';
import {Client} from '../../../shared/models/client/client';
import {faEye, faPlus, faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  clients: Client[];
  numberPages: number;
  numberDocs: number;
  limit: number = 10;
  currentPage: number = 1;
  pages: Array<number> = [];
  title: string;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.count();
  }
  init(): void {
    this.title = 'Listado de clientes';
    this.pages = [];
    this.currentPage = 1;
  }

  count(): void {
    this.clientService.count().subscribe(
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

  changeLimit($event) {
    this.limit = $event.target.value;
    this.calcNumberPages();
  }

  loadPage(pg: number) {
    this.currentPage = pg;
    this.clientService.list(pg, this.limit).subscribe(
      result => {
        console.log(result);
        this.clients = result;
      }
    );
  }

  delete(client: Client): void {
    swal.fire({
      title: '¿Está seguro?',
      text: `El registro de código ${client.name}  será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((option) => {
      if (option.value) {
        this.clientService.delete(client.idclient).subscribe(
          result => {
            this.loadPage(this.currentPage);
          }
        );
      }
    });
  }
}
