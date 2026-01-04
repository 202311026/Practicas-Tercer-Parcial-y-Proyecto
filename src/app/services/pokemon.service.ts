import { Injectable } from '@angular/core';
import { Pokemon, Move } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonList: Pokemon[] = [
    // Pokémon iniciales y populares
    {
      id: 1,
      name: 'Bulbasaur',
      type: ['Planta', 'Veneno'],
      hp: 45,
      maxHp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
      moves: [
        { name: 'Placaje', type: 'Normal', power: 40, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Látigo Cepa', type: 'Planta', power: 45, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Polvo Veneno', type: 'Veneno', power: 0, accuracy: 75, pp: 35, maxPp: 35 },
        { name: 'Hoja Afilada', type: 'Planta', power: 55, accuracy: 95, pp: 25, maxPp: 25 }
      ]
    },
    {
      id: 2,
      name: 'Ivysaur',
      type: ['Planta', 'Veneno'],
      hp: 60,
      maxHp: 60,
      attack: 62,
      defense: 63,
      speed: 60,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/2.png',
      moves: [
        { name: 'Látigo Cepa', type: 'Planta', power: 45, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Drenadoras', type: 'Planta', power: 75, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Somnífero', type: 'Planta', power: 0, accuracy: 75, pp: 15, maxPp: 15 },
        { name: 'Rayo Solar', type: 'Planta', power: 120, accuracy: 100, pp: 10, maxPp: 10 }
      ]
    },
    {
      id: 3,
      name: 'Venusaur',
      type: ['Planta', 'Veneno'],
      hp: 80,
      maxHp: 80,
      attack: 82,
      defense: 83,
      speed: 80,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png',
      moves: [
        { name: 'Rayo Solar', type: 'Planta', power: 120, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Terremoto', type: 'Tierra', power: 100, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Drenadoras', type: 'Planta', power: 75, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Tóxico', type: 'Veneno', power: 0, accuracy: 90, pp: 10, maxPp: 10 }
      ]
    },
    {
      id: 4,
      name: 'Charmander',
      type: ['Fuego'],
      hp: 39,
      maxHp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png',
      moves: [
        { name: 'Arañazo', type: 'Normal', power: 40, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Ascuas', type: 'Fuego', power: 40, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Colmillo Ígneo', type: 'Fuego', power: 65, accuracy: 95, pp: 15, maxPp: 15 },
        { name: 'Cuchillada', type: 'Normal', power: 70, accuracy: 100, pp: 20, maxPp: 20 }
      ]
    },
    {
      id: 5,
      name: 'Charmeleon',
      type: ['Fuego'],
      hp: 58,
      maxHp: 58,
      attack: 64,
      defense: 58,
      speed: 80,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/5.png',
      moves: [
        { name: 'Lanzallamas', type: 'Fuego', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Cuchillada', type: 'Normal', power: 70, accuracy: 100, pp: 20, maxPp: 20 },
        { name: 'Garra Dragón', type: 'Dragón', power: 80, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Tajo Aéreo', type: 'Volador', power: 75, accuracy: 95, pp: 15, maxPp: 15 }
      ]
    },
    {
      id: 6,
      name: 'Charizard',
      type: ['Fuego', 'Volador'],
      hp: 78,
      maxHp: 78,
      attack: 84,
      defense: 78,
      speed: 100,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
      moves: [
        { name: 'Lanzallamas', type: 'Fuego', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Tajo Aéreo', type: 'Volador', power: 75, accuracy: 95, pp: 15, maxPp: 15 },
        { name: 'Garra Dragón', type: 'Dragón', power: 80, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Hiperrayo', type: 'Normal', power: 150, accuracy: 90, pp: 5, maxPp: 5 }
      ]
    },
    {
      id: 7,
      name: 'Squirtle',
      type: ['Agua'],
      hp: 44,
      maxHp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png',
      moves: [
        { name: 'Placaje', type: 'Normal', power: 40, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Pistola Agua', type: 'Agua', power: 40, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Rayo Burbuja', type: 'Agua', power: 65, accuracy: 100, pp: 20, maxPp: 20 },
        { name: 'Hidrobomba', type: 'Agua', power: 110, accuracy: 80, pp: 5, maxPp: 5 }
      ]
    },
    {
      id: 8,
      name: 'Wartortle',
      type: ['Agua'],
      hp: 59,
      maxHp: 59,
      attack: 63,
      defense: 80,
      speed: 58,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/8.png',
      moves: [
        { name: 'Pistola Agua', type: 'Agua', power: 40, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Cabezazo', type: 'Normal', power: 70, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Hidropulso', type: 'Agua', power: 60, accuracy: 100, pp: 20, maxPp: 20 },
        { name: 'Refugio', type: 'Normal', power: 0, accuracy: 100, pp: 40, maxPp: 40 }
      ]
    },
    {
      id: 9,
      name: 'Blastoise',
      type: ['Agua'],
      hp: 79,
      maxHp: 79,
      attack: 83,
      defense: 100,
      speed: 78,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/9.png',
      moves: [
        { name: 'Hidrobomba', type: 'Agua', power: 110, accuracy: 80, pp: 5, maxPp: 5 },
        { name: 'Cabezazo', type: 'Normal', power: 70, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Pulso Hielo', type: 'Hielo', power: 90, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Terremoto', type: 'Tierra', power: 100, accuracy: 100, pp: 10, maxPp: 10 }
      ]
    },
    {
      id: 25,
      name: 'Pikachu',
      type: ['Eléctrico'],
      hp: 35,
      maxHp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
      moves: [
        { name: 'Ataque Rápido', type: 'Normal', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Impactrueno', type: 'Eléctrico', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Rayo', type: 'Eléctrico', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Cola Férrea', type: 'Acero', power: 100, accuracy: 75, pp: 15, maxPp: 15 }
      ]
    },
    {
      id: 26,
      name: 'Raichu',
      type: ['Eléctrico'],
      hp: 60,
      maxHp: 60,
      attack: 90,
      defense: 55,
      speed: 110,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/26.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/26.png',
      moves: [
        { name: 'Rayo', type: 'Eléctrico', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Ataque Rápido', type: 'Normal', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Trueno', type: 'Eléctrico', power: 110, accuracy: 70, pp: 10, maxPp: 10 },
        { name: 'Puño Trueno', type: 'Eléctrico', power: 75, accuracy: 100, pp: 15, maxPp: 15 }
      ]
    },
    {
      id: 133,
      name: 'Eevee',
      type: ['Normal'],
      hp: 55,
      maxHp: 55,
      attack: 55,
      defense: 50,
      speed: 55,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/133.png',
      moves: [
        { name: 'Placaje', type: 'Normal', power: 40, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Ataque Rápido', type: 'Normal', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Mordisco', type: 'Siniestro', power: 60, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Velocidad Extrema', type: 'Normal', power: 80, accuracy: 100, pp: 5, maxPp: 5 }
      ]
    },
    {
      id: 143,
      name: 'Snorlax',
      type: ['Normal'],
      hp: 160,
      maxHp: 160,
      attack: 110,
      defense: 65,
      speed: 30,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/143.png',
      moves: [
        { name: 'Golpe Cabeza', type: 'Normal', power: 70, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Golpe Cuerpo', type: 'Normal', power: 85, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Descanso', type: 'Psíquico', power: 0, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Hiperrayo', type: 'Normal', power: 150, accuracy: 90, pp: 5, maxPp: 5 }
      ]
    },
    {
      id: 149,
      name: 'Dragonite',
      type: ['Dragón', 'Volador'],
      hp: 91,
      maxHp: 91,
      attack: 134,
      defense: 95,
      speed: 80,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/149.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/149.png',
      moves: [
        { name: 'Ataque Ala', type: 'Volador', power: 60, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Garra Dragón', type: 'Dragón', power: 80, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Hiperrayo', type: 'Normal', power: 150, accuracy: 90, pp: 5, maxPp: 5 },
        { name: 'Enfado', type: 'Dragón', power: 120, accuracy: 100, pp: 10, maxPp: 10 }
      ]
    },
    {
      id: 130,
      name: 'Gyarados',
      type: ['Agua', 'Volador'],
      hp: 95,
      maxHp: 95,
      attack: 125,
      defense: 79,
      speed: 81,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/130.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/130.png',
      moves: [
        { name: 'Hidrobomba', type: 'Agua', power: 110, accuracy: 80, pp: 5, maxPp: 5 },
        { name: 'Hiperrayo', type: 'Normal', power: 150, accuracy: 90, pp: 5, maxPp: 5 },
        { name: 'Ciclón', type: 'Volador', power: 40, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Mordisco', type: 'Siniestro', power: 60, accuracy: 100, pp: 25, maxPp: 25 }
      ]
    },
    {
      id: 94,
      name: 'Gengar',
      type: ['Fantasma', 'Veneno'],
      hp: 60,
      maxHp: 60,
      attack: 65,
      defense: 60,
      speed: 110,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/94.png',
      moves: [
        { name: 'Bola Sombra', type: 'Fantasma', power: 80, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Lengüetazo', type: 'Fantasma', power: 30, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Hipnosis', type: 'Psíquico', power: 0, accuracy: 60, pp: 20, maxPp: 20 },
        { name: 'Bola Veneno', type: 'Veneno', power: 90, accuracy: 100, pp: 10, maxPp: 10 }
      ]
    },
    {
      id: 38,
      name: 'Ninetales',
      type: ['Fuego'],
      hp: 73,
      maxHp: 73,
      attack: 76,
      defense: 75,
      speed: 100,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/38.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/38.png',
      moves: [
        { name: 'Lanzallamas', type: 'Fuego', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Confusión', type: 'Psíquico', power: 50, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Will-O-Wisp', type: 'Fuego', power: 0, accuracy: 85, pp: 15, maxPp: 15 },
        { name: 'Sofoco', type: 'Fuego', power: 100, accuracy: 90, pp: 5, maxPp: 5 }
      ]
    },
    {
      id: 65,
      name: 'Alakazam',
      type: ['Psíquico'],
      hp: 55,
      maxHp: 55,
      attack: 50,
      defense: 45,
      speed: 120,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/65.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/65.png',
      moves: [
        { name: 'Psíquico', type: 'Psíquico', power: 90, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Confusión', type: 'Psíquico', power: 50, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Recuperación', type: 'Normal', power: 0, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Rayo Confuso', type: 'Eléctrico', power: 0, accuracy: 100, pp: 10, maxPp: 10 }
      ]
    },
    {
      id: 112,
      name: 'Rhydon',
      type: ['Tierra', 'Roca'],
      hp: 105,
      maxHp: 105,
      attack: 130,
      defense: 120,
      speed: 40,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/112.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/112.png',
      moves: [
        { name: 'Terremoto', type: 'Tierra', power: 100, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Cornada', type: 'Normal', power: 65, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Roca Afilada', type: 'Roca', power: 100, accuracy: 80, pp: 5, maxPp: 5 },
        { name: 'Megacuerno', type: 'Normal', power: 120, accuracy: 85, pp: 10, maxPp: 10 }
      ]
    },
    {
      id: 68,
      name: 'Machamp',
      type: ['Lucha'],
      hp: 90,
      maxHp: 90,
      attack: 130,
      defense: 80,
      speed: 55,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/68.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/68.png',
      moves: [
        { name: 'Puño Dinámico', type: 'Lucha', power: 100, accuracy: 50, pp: 5, maxPp: 5 },
        { name: 'Sumisión', type: 'Lucha', power: 80, accuracy: 80, pp: 20, maxPp: 20 },
        { name: 'Golpe Karate', type: 'Lucha', power: 50, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Tumba Rocas', type: 'Lucha', power: 40, accuracy: 100, pp: 15, maxPp: 15 }
      ]
    },
    {
      id: 59,
      name: 'Arcanine',
      type: ['Fuego'],
      hp: 90,
      maxHp: 90,
      attack: 110,
      defense: 80,
      speed: 95,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/59.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/59.png',
      moves: [
        { name: 'Lanzallamas', type: 'Fuego', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Ataque Rápido', type: 'Normal', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Mordisco', type: 'Siniestro', power: 60, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Hiperrayo', type: 'Normal', power: 150, accuracy: 90, pp: 5, maxPp: 5 }
      ]
    },
    {
      id: 131,
      name: 'Lapras',
      type: ['Agua', 'Hielo'],
      hp: 130,
      maxHp: 130,
      attack: 85,
      defense: 80,
      speed: 60,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/131.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/131.png',
      moves: [
        { name: 'Hidrobomba', type: 'Agua', power: 110, accuracy: 80, pp: 5, maxPp: 5 },
        { name: 'Rayo de Hielo', type: 'Hielo', power: 90, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Psíquico', type: 'Psíquico', power: 90, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Canto', type: 'Normal', power: 0, accuracy: 55, pp: 15, maxPp: 15 }
      ]
    },
    {
      id: 103,
      name: 'Exeggutor',
      type: ['Planta', 'Psíquico'],
      hp: 95,
      maxHp: 95,
      attack: 95,
      defense: 85,
      speed: 55,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/103.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/103.png',
      moves: [
        { name: 'Psíquico', type: 'Psíquico', power: 90, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Rayo Solar', type: 'Planta', power: 120, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Huevo Bomba', type: 'Normal', power: 100, accuracy: 75, pp: 10, maxPp: 10 },
        { name: 'Derribo', type: 'Normal', power: 90, accuracy: 85, pp: 20, maxPp: 20 }
      ]
    },
    {
      id: 89,
      name: 'Muk',
      type: ['Veneno'],
      hp: 105,
      maxHp: 105,
      attack: 105,
      defense: 75,
      speed: 50,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/89.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/89.png',
      moves: [
        { name: 'Bomba Lodo', type: 'Veneno', power: 90, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Onda Tóxica', type: 'Veneno', power: 95, accuracy: 100, pp: 10, maxPp: 10 },
        { name: 'Puño Fuego', type: 'Fuego', power: 75, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Puño Hielo', type: 'Hielo', power: 75, accuracy: 100, pp: 15, maxPp: 15 }
      ]
    },
    {
      id: 136,
      name: 'Flareon',
      type: ['Fuego'],
      hp: 65,
      maxHp: 65,
      attack: 130,
      defense: 60,
      speed: 65,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/136.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/136.png',
      moves: [
        { name: 'Lanzallamas', type: 'Fuego', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Ataque Rápido', type: 'Normal', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Mordisco', type: 'Siniestro', power: 60, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Día de Pago', type: 'Normal', power: 40, accuracy: 100, pp: 20, maxPp: 20 }
      ]
    },
    {
      id: 134,
      name: 'Vaporeon',
      type: ['Agua'],
      hp: 130,
      maxHp: 130,
      attack: 65,
      defense: 60,
      speed: 65,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/134.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/134.png',
      moves: [
        { name: 'Hidrobomba', type: 'Agua', power: 110, accuracy: 80, pp: 5, maxPp: 5 },
        { name: 'Ataque Rápido', type: 'Normal', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Rayo Aurora', type: 'Hielo', power: 65, accuracy: 100, pp: 20, maxPp: 20 },
        { name: 'Día de Pago', type: 'Normal', power: 40, accuracy: 100, pp: 20, maxPp: 20 }
      ]
    },
    {
      id: 135,
      name: 'Jolteon',
      type: ['Eléctrico'],
      hp: 65,
      maxHp: 65,
      attack: 65,
      defense: 60,
      speed: 130,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/135.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/135.png',
      moves: [
        { name: 'Rayo', type: 'Eléctrico', power: 90, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Ataque Rápido', type: 'Normal', power: 40, accuracy: 100, pp: 30, maxPp: 30 },
        { name: 'Mordisco', type: 'Siniestro', power: 60, accuracy: 100, pp: 25, maxPp: 25 },
        { name: 'Doble Patada', type: 'Lucha', power: 30, accuracy: 100, pp: 30, maxPp: 30 }
      ]
    },
    {
      id: 62,
      name: 'Poliwrath',
      type: ['Agua', 'Lucha'],
      hp: 90,
      maxHp: 90,
      attack: 95,
      defense: 95,
      speed: 70,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/62.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/62.png',
      moves: [
        { name: 'Hidrobomba', type: 'Agua', power: 110, accuracy: 80, pp: 5, maxPp: 5 },
        { name: 'Puño Dinámico', type: 'Lucha', power: 100, accuracy: 50, pp: 5, maxPp: 5 },
        { name: 'Golpe Cuerpo', type: 'Normal', power: 85, accuracy: 100, pp: 15, maxPp: 15 },
        { name: 'Sumisión', type: 'Lucha', power: 80, accuracy: 80, pp: 20, maxPp: 20 }
      ]
    },
    {
      id: 18,
      name: 'Pidgeot',
      type: ['Normal', 'Volador'],
      hp: 83,
      maxHp: 83,
      attack: 80,
      defense: 75,
      speed: 101,
      sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
      frontSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/18.png',
      backSprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/18.png',
      moves: [
        { name: 'Tornado', type: 'Volador', power: 40, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Ataque Ala', type: 'Volador', power: 60, accuracy: 100, pp: 35, maxPp: 35 },
        { name: 'Remolino', type: 'Volador', power: 40, accuracy: 100, pp: 20, maxPp: 20 },
        { name: 'Picotazo', type: 'Volador', power: 35, accuracy: 100, pp: 35, maxPp: 35 }
      ]
    }
  ];

  constructor() {}

  getFirstGenPokemon(): Pokemon[] {
    return this.pokemonList;
  }

  getRandomPokemon(): Pokemon {
    const randomIndex = Math.floor(Math.random() * this.pokemonList.length);
    return {...this.pokemonList[randomIndex]};
  }

  calculateDamage(attacker: Pokemon, defender: Pokemon, move: Move): number {
    const attack = attacker.attack;
    const defense = defender.defense;
    const power = move.power;
    const typeEffectiveness = this.getTypeEffectiveness(move.type, defender.type);
    
    const damage = Math.floor((((2 * 50) / 5 + 2) * power * attack / defense) / 50 + 2);
    
    return Math.floor(damage * typeEffectiveness);
  }

  private getTypeEffectiveness(attackType: string, defenseTypes: string[]): number {
    const typeChart: {[key: string]: {[key: string]: number}} = {
      'Normal': { 'Roca': 0.5, 'Fantasma': 0, 'Acero': 0.5 },
      'Fuego': { 'Fuego': 0.5, 'Agua': 0.5, 'Planta': 2, 'Hielo': 2, 'Bicho': 2, 'Roca': 0.5, 'Dragón': 0.5, 'Acero': 2 },
      'Agua': { 'Fuego': 2, 'Agua': 0.5, 'Planta': 0.5, 'Tierra': 2, 'Roca': 2, 'Dragón': 0.5 },
      'Eléctrico': { 'Agua': 2, 'Eléctrico': 0.5, 'Planta': 0.5, 'Tierra': 0, 'Volador': 2, 'Dragón': 0.5 },
      'Planta': { 'Fuego': 0.5, 'Agua': 2, 'Planta': 0.5, 'Veneno': 0.5, 'Tierra': 2, 'Volador': 0.5, 'Bicho': 0.5, 'Roca': 2, 'Dragón': 0.5, 'Acero': 0.5 },
      'Hielo': { 'Fuego': 0.5, 'Agua': 0.5, 'Planta': 2, 'Hielo': 0.5, 'Tierra': 2, 'Volador': 2, 'Dragón': 2, 'Acero': 0.5 },
      'Lucha': { 'Normal': 2, 'Hielo': 2, 'Veneno': 0.5, 'Volador': 0.5, 'Psíquico': 0.5, 'Bicho': 0.5, 'Roca': 2, 'Fantasma': 0, 'Siniestro': 2, 'Acero': 2, 'Hada': 0.5 },
      'Veneno': { 'Planta': 2, 'Veneno': 0.5, 'Tierra': 0.5, 'Roca': 0.5, 'Fantasma': 0.5, 'Acero': 0, 'Hada': 2 },
      'Tierra': { 'Fuego': 2, 'Eléctrico': 2, 'Planta': 0.5, 'Veneno': 2, 'Volador': 0, 'Bicho': 0.5, 'Roca': 2, 'Acero': 2 },
      'Volador': { 'Eléctrico': 0.5, 'Planta': 2, 'Lucha': 2, 'Bicho': 2, 'Roca': 0.5, 'Acero': 0.5 },
      'Psíquico': { 'Lucha': 2, 'Veneno': 2, 'Psíquico': 0.5, 'Siniestro': 0, 'Acero': 0.5 },
      'Bicho': { 'Fuego': 0.5, 'Planta': 2, 'Lucha': 0.5, 'Veneno': 0.5, 'Volador': 0.5, 'Psíquico': 2, 'Fantasma': 0.5, 'Siniestro': 2, 'Acero': 0.5, 'Hada': 0.5 },
      'Roca': { 'Fuego': 2, 'Hielo': 2, 'Lucha': 0.5, 'Tierra': 0.5, 'Volador': 2, 'Bicho': 2, 'Acero': 0.5 },
      'Fantasma': { 'Normal': 0, 'Psíquico': 2, 'Fantasma': 2, 'Siniestro': 0.5 },
      'Dragón': { 'Dragón': 2, 'Acero': 0.5, 'Hada': 0 },
      'Siniestro': { 'Lucha': 0.5, 'Psíquico': 2, 'Fantasma': 2, 'Siniestro': 0.5, 'Hada': 0.5 },
      'Acero': { 'Fuego': 0.5, 'Agua': 0.5, 'Eléctrico': 0.5, 'Hielo': 2, 'Roca': 2, 'Acero': 0.5, 'Hada': 2 },
      'Hada': { 'Fuego': 0.5, 'Lucha': 2, 'Veneno': 0.5, 'Dragón': 2, 'Siniestro': 2, 'Acero': 0.5 }
    };

    let effectiveness = 1;
    for (const defenseType of defenseTypes) {
      if (typeChart[attackType] && typeChart[attackType][defenseType]) {
        effectiveness *= typeChart[attackType][defenseType];
      }
    }
    
    return effectiveness;
  }
}