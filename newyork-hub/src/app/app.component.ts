import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Importamos el enrutador para las rutas
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent { 
  constructor(private router: Router) {}

  irAInicio(){
    this.router.navigate(['/inicio']);
  }
}
