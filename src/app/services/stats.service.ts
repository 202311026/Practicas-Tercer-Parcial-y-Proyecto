import { Injectable } from '@angular/core';
import { BattleStats } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private localStats: BattleStats[] = [];

  constructor() {
    // Datos de ejemplo para simular que ya se jugó
    this.localStats = [
      {
        id: '1',
        playerName: 'Ash',
        date: '2024-01-15',
        pokemonTeam: ['Pikachu', 'Charizard', 'Blastoise'],
        battlesWon: 10,
        battlesLost: 2,
        totalDamageDealt: 1500,
        totalDamageReceived: 800,
        timePlayed: 3600
      },
      {
        id: '2',
        playerName: 'Misty',
        date: '2024-01-16',
        pokemonTeam: ['Starmie', 'Gyarados', 'Lapras'],
        battlesWon: 8,
        battlesLost: 4,
        totalDamageDealt: 1200,
        totalDamageReceived: 900,
        timePlayed: 2800
      },
      {
        id: '3',
        playerName: 'Jugador',
        date: '2024-01-17',
        pokemonTeam: ['Venusaur', 'Charizard', 'Blastoise'],
        battlesWon: 15,
        battlesLost: 3,
        totalDamageDealt: 2500,
        totalDamageReceived: 1200,
        timePlayed: 5200
      }
    ];
  }

  saveStats(stats: BattleStats): Promise<BattleStats> {
    return new Promise((resolve) => {
      // Simular delay de red
      setTimeout(() => {
        const newStat = {
          ...stats,
          id: Date.now().toString()
        };
        this.localStats.push(newStat);
        resolve(newStat);
      }, 500);
    });
  }

  getStats(): Promise<BattleStats[]> {
    return new Promise((resolve) => {
      // Simular delay de red
      setTimeout(() => {
        resolve([...this.localStats]);
      }, 500);
    });
  }

  getLeaderboard(): Promise<BattleStats[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const sorted = [...this.localStats].sort((a, b) => b.battlesWon - a.battlesWon);
        resolve(sorted.slice(0, 10));
      }, 500);
    });
  }
}