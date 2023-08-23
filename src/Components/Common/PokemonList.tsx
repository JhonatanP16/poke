import React from 'react'
import classes from './PokemosList.module.css';
import PokemonCard from './PokemonCard';
import { generatedPokemonType } from '../../types/types';
const PokemonList:React.FC <{
  pokemons: generatedPokemonType[] | undefined
}>= ({pokemons}) => {
  return (
    <div className={classes.contentList}>
      {
       pokemons &&
       pokemons.length > 0 && 
       pokemons?.map((pokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id}/>
       ))
      }
    </div>
  )
}

export default PokemonList
