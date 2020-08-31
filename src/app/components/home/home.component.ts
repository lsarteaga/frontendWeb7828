import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { HomeService } from '../../core/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = [];
  cardsForHandset: [];
  cardsForWeb = [];
  isHanset = false;
  isHandsetObserver: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(({ matches }) => {
        if (matches) {
          return true;
        }
        return false;
      })
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public homeService: HomeService
  ) {}

  ngOnInit() {
    this.isHandsetObserver.subscribe((currentObserverValue) => {
      this.isHanset = currentObserverValue;
      this.loadCards();
    });
    this.homeService.getDeals().subscribe(
      (response) => {
        this.cardsForHandset = response.handsetCards;
        this.cardsForWeb = response.webCards;
        this.loadCards();
      },
      (error) => {
        alert('Hubo un error desde el servidor, intentelo mas tarde');
      }
    );
  }

  loadCards() {
    this.cards = this.isHanset ? this.cardsForHandset : this.cardsForHandset;
  }
  getImage(imageName: string): string {
    // return 'url(' + 'https://proyecto-javascript-8ecde.web.app/images/' + imageName + '.jpg' + ')';
    return 'url(' + 'http://localhost:5000/images/' + imageName + '.jpg' + ')';
  }
}
