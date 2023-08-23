import React from 'react'
import classes from './PokemonCard.module.css'
import { generatedPokemonType, pokemonTypeInterface } from '../../types/types';
import { BsPlus, BsUbuntu } from 'react-icons/bs';
import { Link } from 'react-router-dom';
const PokemonCard:React.FC<{pokemon:generatedPokemonType;}> = ({pokemon}) => {
  
  return (
    <div className={classes.contentCard}>
          <div className={classes.backDrop} style={{backgroundImage:`url(${pokemon.image})`}}>
           <span className={classes.fondo}></span>
         </div>
     <div className={classes.content}>
     <div className={classes.actions}>
        <button title='Añadir a favoritos'>
          <BsPlus className={classes.plus}/>
        </button>
        <button title='Comparar'>
          <BsUbuntu className={classes.ubuntu}/>
        </button>
      </div>
      <p>{pokemon.name}</p>
      <Link to={`/details/${pokemon.name}`} className={classes.imgContent} state={pokemon.id}>
        <img src={pokemon.image} alt="" />
      </Link>
      <div className={classes.typesContent}>
        {
          pokemon.types.map(((type: pokemonTypeInterface, index:number) => {
            const keys = Object.keys(type);
            return (
              <div className={classes.typesCard} key={index}>
                <img src={type[keys[0]].image} alt="pokemon type" />
                <h6>{keys[0]}</h6>
              </div>
            )
          }))
        }
      </div>
     </div>
    </div>
  )
}

export default PokemonCard
