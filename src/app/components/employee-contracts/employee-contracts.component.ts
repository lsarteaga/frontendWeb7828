import { Component, Input, OnInit } from '@angular/core';
import {
  faEye,
  faPlus,
  faPencilAlt,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert2';
import { Contract } from '../../shared/models/contract/contract';
import { ContractService } from '../../core/services/contract/contract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-contracts',
  templateUrl: './employee-contracts.component.html',
  styleUrls: ['./employee-contracts.component.css'],
})
export class EmployeeContractsComponent implements OnInit {
  @Input() idEmployee: string;
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

  constructor(
    private contractService: ContractService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.count();
  }

  init(): void {
    this.title = 'Contratos Asociados';
    this.pages = [];
    this.currentPage = 1;
  }

  count(): void {
    this.contractService.count2(this.idEmployee).subscribe((result) => {
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
    this.contractService
      .list2(pg, this.limit, this.idEmployee)
      .subscribe((result) => {
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

  onClick(idEmployee: string) {
    console.log(idEmployee);
    this.router.navigate(['contract/employee/form/', idEmployee]);
  }
}
