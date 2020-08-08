import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faIdCard, faPhone, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import {Client} from '../../../shared/models/client/client';
import {ClientService} from '../../../core/services/client/client.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  faIdCard = faIdCard;
  faPhone = faPhone;
  faHome = faHome;
  faUser = faUser;
  client: Client;
  title: string;
  form: FormGroup;
  submitted = false;

  constructor(private clientService: ClientService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params =>{
      if(params['id']){
        this.clientService.retrieve(params['id'])
          .subscribe(result =>
            {
              this.client = result;
              this.client.idclient = params['id'];
              this.title = "Actualizando " + this.client.name;
            }
          );
      }
      else {
        this.client = new Client();
        this.title = 'Nuevo registro';
      }
    });

    this.form = this.formBuilder.group({
      name : ['', [Validators.required]],
      cardId : ['', [Validators.required]],
      phone : ['', [Validators.required]],
      direction : ['', [Validators.required]],
      percentaje_depreciation : ['']
    });
  }

}
