import { Component, OnInit } from '@angular/core';
import {
  faHome,
  faUser,
  faIdCard,
  faPhone,
  faDirections,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from '../../../core/services/contract/contract.service';
import { Contract } from '../../../shared/models/contract/contract';

@Component({
  selector: 'app-contract-card',
  templateUrl: './contract-card.component.html',
  styleUrls: ['./contract-card.component.css'],
})
export class ContractCardComponent implements OnInit {
  faDirections = faDirections;
  faHome = faHome;
  faUser = faUser;
  faPhone = faPhone;
  faIdCard = faIdCard;
  contract: Contract = new Contract();
  title: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.contractService.retrieve(params['id']).subscribe((result) => {
          this.contract = result;
          this.contract.idcontract = params['id'];
          this.title = this.contract.idcontract;
          console.log(result);
        });
      }
    });
  }

  toList(): void {
    this.router.navigate(['contract/list']);
  }
}
