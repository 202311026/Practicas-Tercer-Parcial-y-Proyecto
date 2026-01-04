import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattleStats } from '../../models/pokemon.model';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gameboy-screen">
      <div class="screen-header">
        <h2>ESTADÍSTICAS DE BATALLA</h2>
        <button class="back-button" (click)="goBack()">VOLVER</button>
      </div>
      
      <div class="stats-container">
        <div class="stats-grid">
          <div class="stat-card" *ngFor="let stat of stats">
            <div class="stat-header">
              <h3>{{ stat.playerName }}</h3>
              <span class="stat-date">{{ stat.date }}</span>
            </div>
            
            <div class="stat-team">
              <strong>Equipo:</strong>
              <div class="team-names">
                <span *ngFor="let pokemon of stat.pokemonTeam" class="team-pokemon">
                  {{ pokemon }}
                </span>
              </div>
            </div>
            
            <div class="stat-numbers">
              <div class="stat-row">
                <span>Batallas Ganadas:</span>
                <span class="stat-value">{{ stat.battlesWon }}</span>
              </div>
              <div class="stat-row">
                <span>Batallas Perdidas:</span>
                <span class="stat-value">{{ stat.battlesLost }}</span>
              </div>
              <div class="stat-row">
                <span>Daño Infligido:</span>
                <span class="stat-value">{{ stat.totalDamageDealt }}</span>
              </div>
              <div class="stat-row">
                <span>Daño Recibido:</span>
                <span class="stat-value">{{ stat.totalDamageReceived }}</span>
              </div>
              <div class="stat-row">
                <span>Tiempo Jugado:</span>
                <span class="stat-value">{{ formatTime(stat.timePlayed) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="no-stats" *ngIf="stats.length === 0">
          <p>No hay estadísticas de batalla disponibles aún.</p>
          <p>¡Juega algunas batallas para ver tus estadísticas aquí!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .gameboy-screen {
      background-color: #8bac0f;
      border: 8px solid #0f380f;
      border-radius: 10px;
      padding: 20px;
      color: #0f380f;
      font-family: 'Press Start 2P', cursive;
      max-width: 800px;
      margin: 0 auto;
      min-height: 600px;
    }
    
    .screen-header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #306230;
      padding-bottom: 15px;
      position: relative;
    }
    
    .screen-header h2 {
      font-size: 16px;
      margin: 0;
      color: #0f380f;
    }
    
    .back-button {
      position: absolute;
      top: 0;
      right: 0;
      background: #306230;
      color: #9bbc0f;
      border: none;
      padding: 8px 15px;
      border-radius: 5px;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      cursor: pointer;
      border: 2px solid #0f380f;
    }
    
    .back-button:hover {
      background: #0f380f;
    }
    
    .stats-container {
      max-height: 500px;
      overflow-y: auto;
      padding: 10px;
    }
    
    .stats-grid {
      display: grid;
      gap: 20px;
    }
    
    .stat-card {
      background: #306230;
      border: 3px solid #0f380f;
      border-radius: 10px;
      padding: 15px;
      color: #9bbc0f;
    }
    
    .stat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #0f380f;
    }
    
    .stat-header h3 {
      margin: 0;
      font-size: 14px;
      color: #9bbc0f;
    }
    
    .stat-date {
      font-size: 9px;
      color: #8bac0f;
    }
    
    .stat-team {
      margin-bottom: 15px;
    }
    
    .team-names {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 5px;
    }
    
    .team-pokemon {
      background: #0f380f;
      padding: 3px 10px;
      border-radius: 15px;
      font-size: 9px;
    }
    
    .stat-numbers {
      display: grid;
      gap: 8px;
    }
    
    .stat-row {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
    }
    
    .stat-value {
      color: #8bac0f;
      font-weight: bold;
    }
    
    .no-stats {
      text-align: center;
      padding: 50px 20px;
      color: #306230;
    }
    
    .no-stats p {
      margin: 10px 0;
      font-size: 12px;
    }
  `]
})
export class StatsComponent implements OnInit {
  stats: BattleStats[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadStats();
  }

  async loadStats() {
    this.stats = await this.statsService.getStats();
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  }

  goBack() {
    window.history.back();
  }
}