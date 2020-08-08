import { Component, OnInit } from '@angular/core';
import { faHome, faUser, faIdCard, faPhone, faDirections } from '@fortawesome/free-solid-svg-icons';
import {ClientService} from '../../../core/services/client/client.service';
import {Client} from '../../../shared/models/client/client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.css']
})
export class ClientCardComponent implements OnInit {
  faDirections = faDirections;
  faHome = faHome;
  faUser = faUser;
  faPhone = faPhone;
  faIdCard = faIdCard;
  client: Client = new Client();
  //
  title: string;

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.clientService.retrieve(params['id'])
          .subscribe(result =>
            {
              this.client = result;
              this.client.idclient = params['id'];
              this.title = this.client.name;
            }
          );
      }
    });
  }
  toList(): void {
    this.router.navigate(['client/list']);
  }
}
