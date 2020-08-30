import { Component, OnInit } from '@angular/core';
import {
  faEye,
  faPlus,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { ContractService } from '../../../core/services/contract/contract.service';
import { Contract } from '../../../shared/models/contract/contract';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css'],
})
export class ContractListComponent implements OnInit {
  faEye = faEye;
  faPlus = faPlus;
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  contracts: Contract[];
  numberPages: number;
  numberDocs: number;
  limit = 10;
  currentPage = 1;
  pages: Array<number> = [];
  title: string;

  constructor(private contractService: ContractService) {}

  ngOnInit(): void {
    this.count();
  }

  init(): void {
    this.title = 'Contratos Asociados';
    this.pages = [];
    this.currentPage = 1;
  }

  count(): void {
    this.contractService.count().subscribe((result) => {
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
    this.contractService.list(pg, this.limit).subscribe((result) => {
      console.log(result);
      this.contracts = result;
    });
  }

  delete(contract: Contract): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `El registro de código ${contract.idcontract}  será eliminado permanentemente`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
      })
      .then((option) => {
        if (option.value) {
          this.contractService
            .delete(contract.idcontract)
            .subscribe((result) => {
              this.loadPage(this.currentPage);
            });
        }
      });
  }
}
