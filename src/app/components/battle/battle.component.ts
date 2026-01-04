import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon, BattleState, Move } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-battle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="battle-container" [style.backgroundImage]="'url(' + backgroundImage + ')'">
      <div class="gameboy-frame">
        <div class="screen-area">
          <div class="battle-screen">
            <!-- Fondo de batalla estilo Game Boy -->
            <div class="battle-background"></div>
            
            <!-- Pokémon Enemigo -->
            <div class="enemy-pokemon">
              <div class="pokemon-display">
                <img [src]="battleState.enemyPokemon?.frontSprite" 
                     [alt]="battleState.enemyPokemon?.name"
                     class="pokemon-sprite enemy-sprite"
                     [class.shake]="isEnemyTakingDamage">
              </div>
              <div class="health-container enemy-container">
                <div class="health-info">
                  <span class="pokemon-name">{{ battleState.enemyPokemon?.name || '???' }}</span>
                  <span class="pokemon-level">Nv.50</span>
                </div>
                <div class="health-bar enemy-health">
                  <div class="health-bar-inner">
                    <div class="health-bar-fill" [style.width.%]="getEnemyHealthPercentage()"></div>
                    <div class="health-bar-pixels" *ngFor="let pixel of getHealthPixels(getEnemyHealthPercentage())"></div>
                  </div>
                  <div class="health-numbers">
                    <span class="current-hp">{{ battleState.enemyHealth }}</span>
                    <span class="hp-separator">/</span>
                    <span class="max-hp">{{ battleState.enemyPokemon?.maxHp || 0 }}</span>
                    <span class="hp-label">PS</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Pokémon Jugador -->
            <div class="player-pokemon">
              <div class="pokemon-display">
                <img [src]="battleState.playerPokemon?.backSprite" 
                     [alt]="battleState.playerPokemon?.name"
                     class="pokemon-sprite player-sprite"
                     [class.shake]="isPlayerTakingDamage">
              </div>
              <div class="health-container player-container">
                <div class="health-info">
                  <span class="pokemon-name">{{ battleState.playerPokemon?.name || '???' }}</span>
                  <span class="pokemon-level">Nv.50</span>
                </div>
                <div class="health-bar player-health">
                  <div class="health-bar-inner">
                    <div class="health-bar-fill" [style.width.%]="getPlayerHealthPercentage()"></div>
                    <div class="health-bar-pixels" *ngFor="let pixel of getHealthPixels(getPlayerHealthPercentage())"></div>
                  </div>
                  <div class="health-numbers">
                    <span class="current-hp">{{ battleState.playerHealth }}</span>
                    <span class="hp-separator">/</span>
                    <span class="max-hp">{{ battleState.playerPokemon?.maxHp || 0 }}</span>
                    <span class="hp-label">PS</span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Registro de Batalla -->
            <div class="battle-log">
              <div *ngFor="let message of battleState.battleLog.slice(-5)" class="log-message">
                {{ message }}
              </div>
            </div>
            
            <!-- Menú de Batalla -->
            <div class="battle-menu" *ngIf="!battleState.isBattleActive">
              <div class="battle-result">
                <h2>{{ battleResult }}</h2>
                <div class="result-buttons">
                  <button class="gameboy-button" (click)="nextBattle()" *ngIf="battleResult === '¡VICTORIA!' && currentPlayerIndex < 2">SIGUIENTE POKÉMON</button>
                  <button class="gameboy-button" (click)="returnToSelection()">VOLVER</button>
                  <button class="gameboy-button" (click)="saveStats()">GUARDAR ESTADÍSTICAS</button>
                </div>
              </div>
            </div>
            
            <div class="battle-menu" *ngIf="battleState.isBattleActive">
              <div class="menu-options" *ngIf="!showingMoves">
                <div class="menu-row">
                  <button class="menu-button" (click)="showMoves()">LUCHAR</button>
                  <button class="menu-button" (click)="switchPokemon()">POKÉMON</button>
                </div>
                <div class="menu-row">
                  <button class="menu-button" (click)="useItem()">MOCHILA</button>
                  <button class="menu-button" (click)="attemptRun()">HUIR</button>
                </div>
              </div>
              
              <div class="moves-menu" *ngIf="showingMoves">
                <div class="moves-grid">
                  <button *ngFor="let move of battleState.playerMoves" 
                          class="move-button"
                          (click)="useMove(move)"
                          [disabled]="move.pp <= 0">
                    <span class="move-name">{{ move.name }}</span>
                    <span class="move-type type-badge {{move.type.toLowerCase()}}">{{ move.type }}</span>
                    <span class="move-pp">PP {{ move.pp }}/{{ move.maxPp }}</span>
                  </button>
                </div>
                <button class="back-button" (click)="showingMoves = false">VOLVER</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="controls-info">
          <div class="stats-info">
            <p>Turno: {{ battleState.currentTurn === 'player' ? 'Jugador' : 'Enemigo' }}</p>
            <p>Batallas Ganadas: {{ battlesWon }}</p>
            <p>Equipo: {{ currentPlayerIndex + 1 }}/3</p>
          </div>
          <div class="battle-type-indicator">
            <span *ngFor="let type of getPlayerTypes()" [class]="'type-indicator ' + type.toLowerCase()">{{ type.charAt(0) }}</span>
            <span class="vs">VS</span>
            <span *ngFor="let type of getEnemyTypes()" [class]="'type-indicator ' + type.toLowerCase()">{{ type.charAt(0) }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .battle-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #306230 0%, #0f380f 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
      position: relative;
      overflow: hidden;
    }
    
    .battle-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
        linear-gradient(0deg, rgba(0,0,0,0.1) 1px, transparent 1px);
      background-size: 20px 20px;
      opacity: 0.3;
      pointer-events: none;
    }
    
    .gameboy-frame {
      background: linear-gradient(145deg, #d3d3d3, #b0b0b0);
      border: 15px solid #a9a9a9;
      border-radius: 25px;
      padding: 25px;
      box-shadow: 
        0 15px 35px rgba(0,0,0,0.5),
        inset 0 1px 0 rgba(255,255,255,0.5),
        0 0 0 4px #8b8b8b,
        0 0 0 8px #6b6b6b;
      max-width: 800px;
      width: 100%;
      position: relative;
      z-index: 1;
    }
    
    .screen-area {
      background: #8bac0f;
      border: 12px solid #0f380f;
      border-radius: 15px;
      padding: 15px;
      box-shadow: 
        inset 0 0 20px rgba(0,0,0,0.3),
        0 5px 15px rgba(0,0,0,0.4);
      position: relative;
      overflow: hidden;
    }
    
    .battle-screen {
      position: relative;
      min-height: 500px;
      background: #8bac0f;
    }
    
    .battle-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, 
        #78c850 0%, 
        #68b840 25%, 
        #58a830 50%, 
        #489820 75%, 
        #388810 100%);
      opacity: 0.8;
      z-index: 1;
      image-rendering: pixelated;
    }
    
    .battle-background::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h32v32H0z' fill='none'/%3E%3Cpath d='M16 8a8 8 0 1 0 0 16 8 8 0 1 0 0-16zm0 2a6 6 0 1 1 0 12 6 6 0 1 1 0-12z' fill='%230f380f' fill-opacity='0.1'/%3E%3C/svg%3E"),
        linear-gradient(45deg, rgba(139, 172, 15, 0.1) 25%, transparent 25%, transparent 75%, rgba(139, 172, 15, 0.1) 75%);
      background-size: 32px 32px, 16px 16px;
      background-position: center, 0 0;
      image-rendering: pixelated;
    }
    
    .enemy-pokemon, .player-pokemon {
      position: absolute;
      z-index: 3;
    }
    
    .enemy-pokemon {
      top: 30px;
      right: 30px;
      text-align: right;
      z-index: 3;
    }
    
    .player-pokemon {
      bottom: 120px;
      left: 30px;
      z-index: 3;
    }
    
    .pokemon-sprite {
      width: 120px;
      height: 120px;
      image-rendering: pixelated;
      filter: 
        drop-shadow(3px 3px 0 rgba(0,0,0,0.3))
        drop-shadow(-1px -1px 0 rgba(255,255,255,0.3));
      transition: transform 0.2s;
    }
    
    .pokemon-sprite.shake {
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
      10%, 90% { transform: translate3d(-1px, 0, 0); }
      20%, 80% { transform: translate3d(2px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
      40%, 60% { transform: translate3d(3px, 0, 0); }
    }
    
    .enemy-sprite {
      transform: scaleX(-1);
    }
    
    .health-container {
      margin-top: 15px;
      min-width: 250px;
    }
    
    .enemy-container {
      text-align: right;
    }
    
    .player-container {
      text-align: left;
    }
    
    .health-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      padding: 0 5px;
    }
    
    .pokemon-name {
      font-family: 'Press Start 2P', cursive;
      font-size: 12px;
      color: #0f380f;
      text-shadow: 1px 1px 0 #9bbc0f;
      background: rgba(155, 188, 15, 0.7);
      padding: 2px 8px;
      border-radius: 4px;
      border: 2px solid #0f380f;
    }
    
    .pokemon-level {
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      color: #9bbc0f;
      background: #0f380f;
      padding: 2px 6px;
      border-radius: 4px;
      border: 1px solid #306230;
    }
    
    .health-bar {
      background: #0f380f;
      border: 3px solid #306230;
      border-radius: 8px;
      padding: 6px;
      box-shadow: 
        inset 0 2px 4px rgba(0,0,0,0.5),
        0 2px 4px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }
    
    .health-bar-inner {
      height: 24px;
      background: #204020;
      border-radius: 4px;
      position: relative;
      overflow: hidden;
    }
    
    .health-bar-fill {
      height: 100%;
      transition: width 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      position: absolute;
      top: 0;
      left: 0;
    }
    
    .enemy-health .health-bar-fill {
      background: linear-gradient(90deg, 
        #ff0000 0%, 
        #ff4444 25%, 
        #ff6666 50%, 
        #ff8888 75%, 
        #ffaaaa 100%);
      box-shadow: inset 0 0 10px rgba(255,0,0,0.5);
    }
    
    .player-health .health-bar-fill {
      background: linear-gradient(90deg, 
        #00ff00 0%, 
        #44ff44 25%, 
        #66ff66 50%, 
        #88ff88 75%, 
        #aaffaa 100%);
      box-shadow: inset 0 0 10px rgba(0,255,0,0.5);
    }
    
    .health-bar-pixels {
      position: absolute;
      top: 0;
      width: 4px;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.5);
    }
    
    .health-numbers {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 5px;
      margin-top: 4px;
      padding: 0 5px;
    }
    
    .current-hp {
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      color: #ffffff;
      text-shadow: 1px 1px 0 #000;
      min-width: 40px;
      text-align: right;
    }
    
    .hp-separator {
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      color: #9bbc0f;
    }
    
    .max-hp {
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      color: #9bbc0f;
      min-width: 40px;
      text-align: left;
    }
    
    .hp-label {
      font-family: 'Press Start 2P', cursive;
      font-size: 9px;
      color: #8bac0f;
      background: #0f380f;
      padding: 1px 4px;
      border-radius: 3px;
      border: 1px solid #306230;
      margin-left: 5px;
    }
    
    .battle-log {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 140px;
      background: rgba(15, 56, 15, 0.95);
      border: 4px solid #306230;
      border-radius: 12px;
      padding: 15px;
      overflow-y: auto;
      font-family: 'Press Start 2P', cursive;
      font-size: 11px;
      color: #9bbc0f;
      line-height: 1.5;
      box-shadow: 
        inset 0 0 15px rgba(0,0,0,0.5),
        0 4px 8px rgba(0,0,0,0.3);
      z-index: 2;
      border-top: 6px solid #0f380f;
    }
    
    .log-message {
      margin-bottom: 8px;
      animation: fadeIn 0.3s;
      padding: 5px;
      background: rgba(48, 98, 48, 0.3);
      border-radius: 4px;
      border-left: 3px solid #8bac0f;
    }
    
    @keyframes fadeIn {
      from { 
        opacity: 0; 
        transform: translateY(5px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    
    .battle-menu {
      position: absolute;
      bottom: 150px;
      right: 20px;
      background: rgba(15, 56, 15, 0.97);
      border: 4px solid #8bac0f;
      border-radius: 12px;
      padding: 20px;
      min-width: 320px;
      box-shadow: 
        0 5px 15px rgba(0,0,0,0.5),
        inset 0 0 10px rgba(155, 188, 15, 0.3);
      z-index: 4;
      border-bottom: 6px solid #306230;
    }
    
    .menu-options {
      display: grid;
      gap: 12px;
    }
    
    .menu-row {
      display: flex;
      gap: 12px;
    }
    
    .menu-button, .move-button, .back-button, .gameboy-button {
      background: linear-gradient(to bottom, #306230, #204020);
      color: #9bbc0f;
      border: none;
      padding: 12px 18px;
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
      border: 3px solid #8bac0f;
      flex: 1;
      text-align: center;
      box-shadow: 
        0 4px 0 #0f380f,
        inset 0 1px 0 rgba(255,255,255,0.2);
      text-shadow: 1px 1px 0 #000;
    }
    
    .menu-button:hover:not(:disabled),
    .move-button:hover:not(:disabled),
    .back-button:hover:not(:disabled),
    .gameboy-button:hover:not(:disabled) {
      background: linear-gradient(to bottom, #8bac0f, #7bac0f);
      color: #0f380f;
      transform: translateY(-2px);
      box-shadow: 
        0 6px 0 #0f380f,
        inset 0 1px 0 rgba(255,255,255,0.3);
    }
    
    .menu-button:active:not(:disabled),
    .move-button:active:not(:disabled),
    .back-button:active:not(:disabled),
    .gameboy-button:active:not(:disabled) {
      transform: translateY(2px);
      box-shadow: 
        0 2px 0 #0f380f,
        inset 0 -1px 0 rgba(0,0,0,0.2);
    }
    
    .menu-button:disabled,
    .move-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .moves-menu {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .moves-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .move-button {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
      text-align: left;
    }
    
    .move-name {
      font-weight: bold;
      font-size: 12px;
    }
    
    .move-type {
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 9px;
      align-self: flex-start;
      color: white;
      border: 1px solid rgba(0,0,0,0.3);
    }
    
    .move-pp {
      font-size: 9px;
      color: #8bac0f;
      align-self: flex-end;
      background: rgba(15, 56, 15, 0.5);
      padding: 1px 4px;
      border-radius: 3px;
    }
    
    .battle-result {
      text-align: center;
      color: #9bbc0f;
      padding: 10px;
    }
    
    .battle-result h2 {
      margin: 0 0 20px 0;
      font-size: 20px;
      text-shadow: 
        2px 2px 0 #0f380f,
        4px 4px 0 rgba(0,0,0,0.3);
      animation: pulse 1s infinite;
      padding: 10px;
      background: rgba(15, 56, 15, 0.8);
      border-radius: 8px;
      border: 3px solid #8bac0f;
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    .result-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
    }
    
    .controls-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 25px;
      padding: 15px;
      background: linear-gradient(to right, #0f380f, #204020);
      border-radius: 12px;
      color: #9bbc0f;
      font-family: 'Press Start 2P', cursive;
      font-size: 11px;
      border: 3px solid #306230;
      box-shadow: inset 0 0 10px rgba(155, 188, 15, 0.1);
    }
    
    .stats-info {
      display: flex;
      gap: 25px;
    }
    
    .stats-info p {
      margin: 0;
      padding: 5px 10px;
      background: rgba(155, 188, 15, 0.1);
      border-radius: 5px;
      border: 1px solid #306230;
    }
    
    .battle-type-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .type-indicator {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      color: white;
      border: 2px solid rgba(0,0,0,0.3);
      text-shadow: 1px 1px 0 #000;
    }
    
    .vs {
      font-family: 'Press Start 2P', cursive;
      font-size: 10px;
      color: #ffcc00;
      margin: 0 5px;
    }
    
    /* Colores de tipos */
    .planta { background: #78c850; }
    .fuego { background: #f08030; }
    .agua { background: #6890f0; }
    .eléctrico { background: #f8d030; }
    .normal { background: #a8a878; }
    .veneno { background: #a040a0; }
    .volador { background: #a890f0; }
    .dragón { background: #7038f8; }
    .acero { background: #b8b8d0; }
    .siniestro { background: #705848; }
    .psíquico { background: #f85888; }
    .lucha { background: #c03028; }
    .tierra { background: #e0c068; }
    .roca { background: #b8a038; }
    .fantasma { background: #705898; }
    .hielo { background: #98d8d8; }
    .bicho { background: #a8b820; }
    .hada { background: #ee99ac; }
  `]
})
export class BattleComponent implements OnInit, OnDestroy {
  @Input() playerTeam: Pokemon[] = [];
  @Output() battleEnded = new EventEmitter<void>();
  
  battleState: BattleState = {
    playerPokemon: null,
    enemyPokemon: null,
    playerHealth: 0,
    enemyHealth: 0,
    playerMoves: [],
    currentTurn: 'player',
    battleLog: [],
    isBattleActive: true
  };
  
  // Fondos estilo Game Boy (pixelados)
  backgroundImages = [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMGYzODBmIiBzdHJva2Utd2lkdGg9IjIiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM4YmFjMGYiLz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyNSIgZmlsbD0iIzBmMzgwZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiM4YmFjMGYiLz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDAgNDAgTCA0MCAwIEwgODAgNDAgTCA0MCA4MCBaIiBmaWxsPSIjMGYzODBmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzhiYWMwZiIvPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9IiMwZjM4MGYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGJhYzBmIi8+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg=='
  ];
  
  backgroundImage = '';
  showingMoves = false;
  battlesWon = 0;
  battlesLost = 0;
  battleResult = '';
  currentPlayerIndex = 0;
  totalDamageDealt = 0;
  totalDamageReceived = 0;
  battleStartTime = new Date();
  isPlayerTakingDamage = false;
  isEnemyTakingDamage = false;

  constructor(
    private pokemonService: PokemonService,
    private statsService: StatsService
  ) {}

  ngOnInit() {
    this.backgroundImage = this.backgroundImages[Math.floor(Math.random() * this.backgroundImages.length)];
    this.startNewBattle();
  }

  ngOnDestroy() {
    // Limpiar si es necesario
  }

  startNewBattle() {
    this.battleState.enemyPokemon = this.pokemonService.getRandomPokemon();
    this.battleState.playerPokemon = { ...this.playerTeam[this.currentPlayerIndex] };
    this.battleState.playerHealth = this.battleState.playerPokemon!.hp;
    this.battleState.enemyHealth = this.battleState.enemyPokemon!.hp;
    this.battleState.playerMoves = this.battleState.playerPokemon!.moves.map(move => ({...move}));
    this.battleState.currentTurn = 'player';
    this.battleState.battleLog = [
      `¡Apareció un ${this.battleState.enemyPokemon!.name} salvaje!`,
      `¡Adelante, ${this.battleState.playerPokemon!.name}!`,
      `¿Qué hará ${this.battleState.playerPokemon!.name}?`
    ];
    this.battleState.isBattleActive = true;
    this.showingMoves = false;
    
    this.battleStartTime = new Date();
  }

  getPlayerHealthPercentage(): number {
    if (!this.battleState.playerPokemon) return 0;
    return (this.battleState.playerHealth / this.battleState.playerPokemon.maxHp) * 100;
  }

  getEnemyHealthPercentage(): number {
    if (!this.battleState.enemyPokemon) return 0;
    return (this.battleState.enemyHealth / this.battleState.enemyPokemon.maxHp) * 100;
  }

  getHealthPixels(percentage: number): number[] {
    const pixelCount = Math.floor(percentage / 5); // 20 pixels para 100%
    return Array(pixelCount).fill(0);
  }

  getPlayerTypes(): string[] {
    return this.battleState.playerPokemon?.type || [];
  }

  getEnemyTypes(): string[] {
    return this.battleState.enemyPokemon?.type || [];
  }

  showMoves() {
    this.showingMoves = true;
    this.addToLog('¡Selecciona un movimiento!');
  }

  useMove(move: Move) {
    if (!this.battleState.playerPokemon || !this.battleState.enemyPokemon || move.pp <= 0) return;
    
    // Reducir PP
    move.pp--;
    
    // Animación de ataque
    this.isEnemyTakingDamage = true;
    
    // Calcular daño
    const damage = this.pokemonService.calculateDamage(
      this.battleState.playerPokemon,
      this.battleState.enemyPokemon,
      move
    );
    
    this.totalDamageDealt += damage;
    this.battleState.enemyHealth = Math.max(0, this.battleState.enemyHealth - damage);
    
    this.addToLog(`¡${this.battleState.playerPokemon.name} usó ${move.name}!`);
    this.addToLog(`¡Infligió ${damage} puntos de daño!`);
    
    // Resetear animación
    setTimeout(() => {
      this.isEnemyTakingDamage = false;
    }, 500);
    
    // Verificar si el enemigo fue derrotado
    if (this.battleState.enemyHealth <= 0) {
      this.battleState.enemyHealth = 0;
      setTimeout(() => {
        this.battleState.isBattleActive = false;
        this.battlesWon++;
        this.battleResult = '¡VICTORIA!';
        this.addToLog(`¡El ${this.battleState.enemyPokemon!.name} salvaje se debilitó!`);
      }, 1000);
      return;
    }
    
    // Turno del enemigo
    setTimeout(() => {
      this.enemyTurn();
    }, 1500);
    
    this.showingMoves = false;
  }

  enemyTurn() {
    if (!this.battleState.playerPokemon || !this.battleState.enemyPokemon || !this.battleState.isBattleActive) return;
    
    const enemyMove = this.battleState.enemyPokemon.moves[
      Math.floor(Math.random() * this.battleState.enemyPokemon.moves.length)
    ];
    
    // Animación de ataque enemigo
    this.isPlayerTakingDamage = true;
    
    const damage = this.pokemonService.calculateDamage(
      this.battleState.enemyPokemon,
      this.battleState.playerPokemon,
      enemyMove
    );
    
    this.totalDamageReceived += damage;
    this.battleState.playerHealth = Math.max(0, this.battleState.playerHealth - damage);
    
    this.addToLog(`¡El ${this.battleState.enemyPokemon.name} salvaje usó ${enemyMove.name}!`);
    this.addToLog(`¡Infligió ${damage} puntos de daño!`);
    
    // Resetear animación
    setTimeout(() => {
      this.isPlayerTakingDamage = false;
    }, 500);
    
    // Verificar si el jugador fue derrotado
    if (this.battleState.playerHealth <= 0) {
      this.battleState.playerHealth = 0;
      setTimeout(() => {
        this.battleState.isBattleActive = false;
        this.battlesLost++;
        this.battleResult = '¡DERROTA!';
        this.addToLog(`¡${this.battleState.playerPokemon!.name} se debilitó!`);
      }, 1000);
    }
  }

  addToLog(message: string) {
    this.battleState.battleLog.push(message);
    // Mantener solo los últimos 5 mensajes
    if (this.battleState.battleLog.length > 5) {
      this.battleState.battleLog.shift();
    }
  }

  switchPokemon() {
    this.addToLog('¡No hay otros Pokémon disponibles!');
  }

  useItem() {
    this.addToLog('¡La mochila está vacía!');
  }

  attemptRun() {
    this.addToLog('¡No puedes huir!');
  }

  nextBattle() {
    this.currentPlayerIndex++;
    if (this.currentPlayerIndex < this.playerTeam.length) {
      this.startNewBattle();
    } else {
      this.returnToSelection();
    }
  }

  returnToSelection() {
    this.battleEnded.emit();
  }

  async saveStats() {
    const timePlayed = Math.floor((new Date().getTime() - this.battleStartTime.getTime()) / 1000);
    
    const stats = {
      playerName: 'Jugador',
      date: new Date().toISOString().split('T')[0],
      pokemonTeam: this.playerTeam.map(p => p.name),
      battlesWon: this.battlesWon,
      battlesLost: this.battlesLost,
      totalDamageDealt: this.totalDamageDealt,
      totalDamageReceived: this.totalDamageReceived,
      timePlayed: timePlayed
    };
    
    try {
      await this.statsService.saveStats(stats);
      this.addToLog('¡Estadísticas guardadas con éxito!');
    } catch (error) {
      this.addToLog('Error al guardar estadísticas.');
    }
  }
}