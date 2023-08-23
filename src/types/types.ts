export interface PokemonInitialStateType {
    allPokemon: undefined | genericPokemonType[];
    randomPokemon: generatedPokemonType[] | undefined;
    currentPokemon: undefined | currentPokemontype;
  }

export interface currentPokemontype{
  id:number;
  name:string;
  types:pokemonTypeInterface[];
  image:string;
  stats: pokemonStatsType[];
  evolution: { level: number; pokemon: { name: string; url: string } }[];
  evolutionLevel: number;
}

export interface pokemonStatsType {
  name: string;
  value: number;
}

export interface genericPokemonType {
    name: string;
    url: string;
}

export interface generatedPokemonType{
    name: string;
    id: number;
    image: string;
    types: pokemonTypeInterface[];
}

export interface pokemonTypeInterface{
  [key: string]: {
    image: string;
    resistance: string[];
    strength: string[];
    weakness: string[];
    vulnerable: string[];
  };
}