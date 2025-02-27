import { Component } from '@angular/core';
import { SportsListComponent } from "../sports-list/sports-list.component";

@Component({
  selector: 'app-sportspage',
  imports: [SportsListComponent],
  templateUrl: './sportspage.component.html',
  styleUrl: './sportspage.component.scss'
})
export class SportspageComponent {

}
