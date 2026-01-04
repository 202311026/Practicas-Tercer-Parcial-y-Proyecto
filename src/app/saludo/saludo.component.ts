import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saludo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="background: lightblue; padding: 30px; border-radius: 10px; margin: 0 auto; width: 80%;">
      <h2>¡HOLA! SOY UN COMPONENTE DE ANGULAR</h2>
      <p>Este es el primer componente - muestra un mensaje fijo</p>
    </div>
  `
})
export class SaludoComponent {}