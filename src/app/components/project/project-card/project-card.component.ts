import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../../core/services/project/project.service';
import { Project } from '../../../shared/models/project/project';
import {
  faPhone,
  faUniversity,
  faSave,
  faTimes,
  faUsers,
  faDirections,
  faIdCard,
  faHome,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent implements OnInit {
  faUser = faUsers;
  faDirections = faDirections;
  faPhone = faPhone;
  faIdCard = faIdCard;
  faUniversity = faUniversity;
  faArrowLeft = faArrowLeft;
  project: Project;
  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.project = new Project();
        this.projectService.retrieve(params['id']).subscribe((result) => {
          this.project = result;
          this.project.idproject = params['id'];
          console.warn(result);
        });
      }
    });
  }
}
