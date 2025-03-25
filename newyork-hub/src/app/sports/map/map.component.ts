import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private map: any;

  ngOnInit(): void {
    this.initMap();
    this.getUserLocation();
  }

  // Método para inicializar el mapa en una ubicación por defecto
  private initMap(): void {
    this.map = L.map('map').setView([39.571465, -0.517826], 15); // Ubicación predeterminada

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  // Método para obtener la ubicación del usuario
  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.map.setView([latitude, longitude], 15);

        L.marker([latitude, longitude])
          .addTo(this.map)
          .bindPopup('Tu ubicación actual')
          .openPopup();
      }, () => {
        console.error('No se pudo obtener la ubicación del usuario.');
      });
    } else {
      console.error('La geolocalización no es compatible con este navegador.');
    }
  }
}
