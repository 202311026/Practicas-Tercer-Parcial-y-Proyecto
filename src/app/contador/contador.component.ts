import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contador',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="background: lightgreen; padding: 30px; border-radius: 10px; margin: 0 auto; width: 80%;">
      <h2>CONTADOR DE CLICS</h2>
      <p style="font-size: 24px;">Clics: <strong>{{clicks}}</strong></p>
      <button (click)="sumarClick()" 
              style="padding: 15px 30px; font-size: 18px; background: blue; color: white; border: none; border-radius: 5px; cursor: pointer;">
        HAZ CLIC AQUÍ
      </button>
      <p><small>Presiona el botón para aumentar el contador</small></p>
    </div>
  `
})
export class ContadorComponent {
  clicks: number = 0;
  
  sumarClick() {
    this.clicks = this.clicks + 1;
  }
}