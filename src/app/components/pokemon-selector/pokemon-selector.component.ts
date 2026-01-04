import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="gameboy-screen">
      <div class="screen-header">
        <h2>SELECCIONA TU EQUIPO POKÉMON</h2>
        <div class="team-counter">
          Seleccionados: {{ selectedPokemon.length }}/3
        </div>
      </div>
      
      <div class="pokemon-grid">
        <div 
          *ngFor="let pokemon of pokemonList" 
          class="pokemon-card"
          [class.selected]="isSelected(pokemon)"
          [class.disabled]="!isSelected(pokemon) && selectedPokemon.length >= 3"
          (click)="togglePokemon(pokemon)"
        >
          <img [src]="pokemon.sprite" [alt]="pokemon.name" class="pokemon-sprite">
          <div class="pokemon-info">
            <h3>{{ pokemon.name }}</h3>
            <div class="pokemon-types">
              <span *ngFor="let type of pokemon.type" [class]="'type-badge ' + type.toLowerCase()">
                {{ type }}
              </span>
            </div>
            <div class="pokemon-stats">
              <span>PS: {{ pokemon.hp }}</span>
              <span>ATA: {{ pokemon.attack }}</span>
              <span>DEF: {{ pokemon.defense }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="selected-team">
        <h3>TU EQUIPO:</h3>
        <div class="team-slots">
          <div 
            *ngFor="let pokemon of selectedPokemon; let i = index" 
            class="team-slot"
          >
            <img [src]="pokemon.sprite" [alt]="pokemon.name">
            <span class="slot-number">#{{ i + 1 }}</span>
          </div>
          <div 
            *ngFor="let empty of getEmptySlots()" 
            class="team-slot empty"
          >
            <span>VACÍO</span>
          </div>
        </div>
      </div>
      
      <div class="selector-actions">
        <button 
          class="gameboy-button"
          (click)="clearSelection()"
          [disabled]="selectedPokemon.length === 0"
        >
          LIMPIAR
        </button>
        <button 
          class="gameboy-button start-button"
          (click)="startBattle()"
          [disabled]="selectedPokemon.length !== 3"
        >
          ¡COMENZAR BATALLA!
        </button>
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
      max-width: 900px;
      margin: 0 auto;
      min-height: 600px;
    }
    
    .screen-header {
      text-align: center;
      margin-bottom: 20px;
      border-bottom: 3px solid #306230;
      padding-bottom: 10px;
    }
    
    .screen-header h2 {
      font-size: 16px;
      margin: 0 0 10px 0;
      color: #0f380f;
    }
    
    .team-counter {
      background: #306230;
      color: #9bbc0f;
      padding: 5px 15px;
      border-radius: 20px;
      display: inline-block;
      font-size: 12px;
    }
    
    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
      max-height: 350px;
      overflow-y: auto;
      padding: 10px;
    }
    
    .pokemon-card {
      background: #306230;
      border: 3px solid #0f380f;
      border-radius: 10px;
      padding: 10px;
      cursor: pointer;
      transition: all 0.3s;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    
    .pokemon-card:hover:not(.disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      background: #3a723a;
    }
    
    .pokemon-card.selected {
      background: #9bbc0f;
      border-color: #8bac0f;
    }
    
    .pokemon-card.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .pokemon-sprite {
      width: 70px;
      height: 70px;
      image-rendering: pixelated;
    }
    
    .pokemon-info h3 {
      margin: 0 0 5px 0;
      font-size: 14px;
    }
    
    .pokemon-types {
      display: flex;
      gap: 5px;
      margin-bottom: 8px;
    }
    
    .type-badge {
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 9px;
      color: white;
    }
    
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
    
    .pokemon-stats {
      display: flex;
      gap: 8px;
      font-size: 9px;
      color: #9bbc0f;
    }
    
    .selected-team {
      background: #0f380f;
      padding: 15px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    
    .selected-team h3 {
      color: #9bbc0f;
      margin: 0 0 10px 0;
      font-size: 12px;
    }
    
    .team-slots {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
    
    .team-slot {
      background: #306230;
      width: 80px;
      height: 80px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 2px solid #8bac0f;
    }
    
    .team-slot img {
      width: 60px;
      height: 60px;
      image-rendering: pixelated;
    }
    
    .team-slot.empty {
      background: #204020;
      border: 2px dashed #306230;
      color: #8bac0f;
      font-size: 10px;
    }
    
    .slot-number {
      position: absolute;
      bottom: 2px;
      right: 5px;
      color: #9bbc0f;
      font-size: 9px;
    }
    
    .selector-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
    }
    
    .gameboy-button {
      background: #0f380f;
      color: #9bbc0f;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: 'Press Start 2P', cursive;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
      border: 3px solid #306230;
    }
    
    .gameboy-button:hover:not(:disabled) {
      background: #306230;
      transform: scale(1.05);
    }
    
    .gameboy-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .start-button {
      background: #9bbc0f;
      color: #0f380f;
      font-weight: bold;
    }
  `]
})
export class PokemonSelectorComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  selectedPokemon: Pokemon[] = [];
  
  @Output() teamSelected = new EventEmitter<Pokemon[]>();

  constructor(
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.pokemonList = this.pokemonService.getFirstGenPokemon();
  }

  togglePokemon(pokemon: Pokemon) {
    const index = this.selectedPokemon.findIndex(p => p.id === pokemon.id);
    
    if (index > -1) {
      this.selectedPokemon.splice(index, 1);
    } else if (this.selectedPokemon.length < 3) {
      this.selectedPokemon.push({...pokemon});
    }
  }

  isSelected(pokemon: Pokemon): boolean {
    return this.selectedPokemon.some(p => p.id === pokemon.id);
  }

  getEmptySlots(): number[] {
    return Array(3 - this.selectedPokemon.length).fill(0);
  }

  clearSelection() {
    this.selectedPokemon = [];
  }

  startBattle() {
    this.teamSelected.emit(this.selectedPokemon.map(p => ({...p})));
  }
}