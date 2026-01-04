import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from './models/pokemon.model';
import { PokemonSelectorComponent } from './components/pokemon-selector/pokemon-selector.component';
import { BattleComponent } from './components/battle/battle.component';
import { StatsComponent } from './components/stats/stats.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonSelectorComponent, BattleComponent, StatsComponent],
  template: `
    <div class="app-container">
      <header class="gameboy-header">
        <div class="header-content">
          <h1>POKÉMON GAME BOY</h1>
          <div class="header-buttons">
            <button class="header-button" (click)="showStats()" *ngIf="!isInBattle">ESTADÍSTICAS</button>
            <button class="header-button" (click)="resetGame()" *ngIf="!isInBattle">REINICIAR</button>
          </div>
        </div>
      </header>
      
      <main class="gameboy-main">
        <div *ngIf="!isInBattle && !showingStats">
          <app-pokemon-selector 
            (teamSelected)="onTeamSelected($event)">
          </app-pokemon-selector>
        </div>
        
        <div *ngIf="isInBattle">
          <app-battle 
            [playerTeam]="selectedTeam"
            (battleEnded)="onBattleEnded()">
          </app-battle>
        </div>
        
        <div *ngIf="showingStats">
          <app-stats></app-stats>
        </div>
      </main>
      
      <footer class="gameboy-footer">
        <div class="footer-content">
          <p>© Pokémon Game Boy v1.0 | ¡Usa los botones para jugar!</p>
          <div class="controls-info">
            <span>SELECCIONAR: Elegir Pokémon</span>
            <span>START: Comenzar Batalla</span>
            <span>A: Seleccionar/Atacar</span>
            <span>B: Cancelar/Volver</span>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667788 0%, #445566 100%);
      display: flex;
      flex-direction: column;
    }
    
    .gameboy-header {
      background: linear-gradient(to bottom, #0f380f, #204020);
      padding: 15px 20px;
      border-bottom: 5px solid #306230;
      box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    }
    
    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .gameboy-header h1 {
      color: #9bbc0f;
      font-family: 'Press Start 2P', cursive;
      font-size: 18px;
      margin: 0;
      text-shadow: 3px 3px 0 #0f380f;
      letter-spacing: 2px;
    }
    
    .header-buttons {
      display: flex;
      gap: 15px;
    }
    
    .header-button {
      background: linear-gradient(to bottom, #306230, #0f380f);
      color: #9bbc0f;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      font-size: 11px;
      cursor: pointer;
      border: 3px solid #8bac0f;
      transition: all 0.2s;
      box-shadow: 0 4px 0 #0f380f;
    }
    
    .header-button:hover {
      background: linear-gradient(to bottom, #8bac0f, #306230);
      transform: translateY(-2px);
      box-shadow: 0 6px 0 #0f380f;
    }
    
    .header-button:active {
      transform: translateY(2px);
      box-shadow: 0 2px 0 #0f380f;
    }
    
    .gameboy-main {
      flex: 1;
      padding: 30px 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .gameboy-footer {
      background: linear-gradient(to top, #0f380f, #204020);
      padding: 15px 20px;
      border-top: 5px solid #306230;
      color: #9bbc0f;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
    }
    
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    
    .footer-content p {
      margin: 0 0 10px 0;
    }
    
    .controls-info {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
    }
    
    .controls-info span {
      background: rgba(155, 188, 15, 0.1);
      padding: 5px 10px;
      border-radius: 5px;
      border: 1px solid #306230;
    }
  `]
})
export class AppComponent {
  isInBattle = false;
  showingStats = false;
  selectedTeam: Pokemon[] = [];

  onTeamSelected(team: Pokemon[]) {
    this.selectedTeam = team;
    this.isInBattle = true;
    this.showingStats = false;
  }

  onBattleEnded() {
    this.isInBattle = false;
    this.selectedTeam = [];
  }

  showStats() {
    this.showingStats = true;
    this.isInBattle = false;
  }

  resetGame() {
    this.isInBattle = false;
    this.showingStats = false;
    this.selectedTeam = [];
  }
}