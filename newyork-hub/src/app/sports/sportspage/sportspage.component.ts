import { Component } from '@angular/core';
import { SportsListComponent } from "../sports-list/sports-list.component";
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-sportspage',
  imports: [SportsListComponent, MapComponent],
  templateUrl: './sportspage.component.html',
  styleUrl: './sportspage.component.scss'
})
export class SportspageComponent {

}
