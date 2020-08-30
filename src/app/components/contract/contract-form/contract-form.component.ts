import { Component, Input, OnInit } from '@angular/core';
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
import { Contract } from '../../../shared/models/contract/contract';
import { ContractService } from '../../../core/services/contract/contract.service';
import { Client } from '../../../shared/models/client/client';
import { ClientService } from '../../../core/services/client/client.service';

@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
})
export class ContractFormComponent implements OnInit {
  faTimes = faTimes;
  faSave = faSave;
  faIdCard = faIdCard;
  faPhone = faPhone;
  faQuoteLeft = faQuoteLeft;
  faHome = faHome;
  faUser = faUser;
  contract: Contract = new Contract();
  title: string;
  form: FormGroup;
  submitted = false;
  clients: Client[];

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contractService: ContractService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.contract.idemployee = this.activatedRoute.snapshot.paramMap.get(
        'idEmployee'
      );
      console.log(params['idEmployee']);

      console.log(this.contract.idemployee);
      if (params['id']) {
        this.contractService.retrieve(params['id']).subscribe((result) => {
          this.contract = result;
          this.contract.idcontract = params['id'];
          this.title = 'Actualizando ' + this.contract.idcontract;
        });
      } else {
        this.contract = new Contract();
        this.title = 'Nuevo registro';
      }
    });

    this.form = this.formBuilder.group({
      cost: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      idemployee: ['', [Validators.required]],
      idclient: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.contractService.save(this.contract).subscribe((result) => {
      this.submitted = false;
      if (result !== undefined) {
        if (result.icon === 'success') {
          this.router.navigate(['employee/card/', this.contract.idemployee]);
          return;
        }
      }
    });
  }

  onReset() {
    this.contract = new Contract();
    this.form.reset();
    this.submitted = false;
  }

  listClients() {
    this.clientService.listAll().subscribe((result) => {
      this.clients = result;
    });
  }
}
