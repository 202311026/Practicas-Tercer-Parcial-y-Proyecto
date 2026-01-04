export interface Pokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: Move[];
  sprite: string;
  frontSprite: string;
  backSprite: string;
}

export interface Move {
  name: string;
  type: string;
  power: number;
  accuracy: number;
  pp: number;
  maxPp: number;
}

export interface BattleStats {
  id?: string;
  playerName: string;
  date: string;
  pokemonTeam: string[];
  battlesWon: number;
  battlesLost: number;
  totalDamageDealt: number;
  totalDamageReceived: number;
  timePlayed: number;
}

export interface BattleState {
  playerPokemon: Pokemon | null;
  enemyPokemon: Pokemon | null;
  playerHealth: number;
  enemyHealth: number;
  playerMoves: Move[];
  currentTurn: 'player' | 'enemy';
  battleLog: string[];
  isBattleActive: boolean;
}