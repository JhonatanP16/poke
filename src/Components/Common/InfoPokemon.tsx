import React from 'react'
import classes from './InfoPokemon.module.css';
import { currentPokemontype, pokemonStatsType } from '../../types/types';
import { Link } from 'react-router-dom';
const InfoPokemon:React.FC<{pokemon:currentPokemontype}> = ({pokemon}) => {

  return (
    <div className={classes.contentInfo}>
    <div className={classes.details}>
        <h1>{pokemon.name}</h1>
        <h3>Type: {pokemon?.types.join(" - ")}</h3>
    </div>
    <div className={classes.stats}>
      <ul>
        {
          pokemon?.stats.map((stat: pokemonStatsType) => {
            return (
              <li key={stat.name}>
                {stat.name} : {stat.value}
                <progress max={100} value={stat.value}></progress>
              </li>
            )
          })
        }
      </ul>
    </div>
    <Link to={`/evolution/${pokemon.id}`} className={classes.link}>
        See Evolutions
    </Link>
    </div>
  )
}

export default InfoPokemon
