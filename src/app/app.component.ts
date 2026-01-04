import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaludoComponent } from './saludo/saludo.component';
import { ContadorComponent } from './contador/contador.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SaludoComponent, ContadorComponent],
  template: `
    <div style="padding: 20px; text-align: center;">
      <h1>PRÁCTICA ANGULAR - DOS COMPONENTES</h1>
      <p>Componente 1 arriba, Componente 2 abajo</p>
      
      <!-- Componente de Saludo -->
      <app-saludo></app-saludo>
      
      <br><br><hr><br><br>
      
      <!-- Componente Contador -->
      <app-contador></app-contador>
    </div>
  `
})
export class AppComponent {
  title = 'practica-rapida';
}