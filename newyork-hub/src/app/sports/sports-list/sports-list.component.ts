import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { SoundService } from '../../services/sound.service';


@Component({
  selector: 'app-sports-list',
  imports: [],
  templateUrl: './sports-list.component.html',
  styleUrl: './sports-list.component.scss'
})
export class SportsListComponent implements OnInit{

  constructor(private soundService: SoundService){}

  ngOnInit(): void {
    this.soundService.playSound('gym.mp3', 0.20);

  }
}
