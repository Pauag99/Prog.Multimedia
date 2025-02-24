import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
img: any;  
  constructor(private router: Router) {}
 
  irABlackjack() {
    this.router.navigate(['/blackjack']);
  }

  irAStatics(){
    this.router.navigate(['/statics']);
  }

  irAPizzeria(){
    this.router.navigate(['/pizza']);
  }

}
