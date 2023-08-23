import React, { useEffect, useState } from 'react'
import classes from './PokemonContainer.module.css'
import { currentPokemontype } from '../../types/types';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


const PokemonContainer:React.FC<{pokemonDetail:currentPokemontype}> = ({pokemonDetail}) => {
  const navigate = useNavigate();
  const [indexEvolution,setIndexEvolution] = useState<number>(pokemonDetail.evolutionLevel - 1);
  const tamaño = pokemonDetail.evolution.length -1;
  const handlePrev = () => {
    if(indexEvolution === 0){
      return;
    }
    setIndexEvolution(indexEvolution - 1);
  }
  const handleNext = () => {
    if(tamaño === indexEvolution){
      return;
    }
    setIndexEvolution(indexEvolution + 1);
  }
 
  useEffect(() =>{
    let pokemon = pokemonDetail.evolution[indexEvolution];
    const id = pokemon.pokemon.url.split('/').reverse()[1];
    const name = pokemon.pokemon.name;
    navigate(`/details/${name}`,{state:id})
    
  },[indexEvolution]);

  return (
    <div className={classes.contentPokemon}>
      <div className={classes.buttons}>
        <button title='Prev Evolution' onClick={handlePrev} disabled={indexEvolution === 0}><BsChevronLeft/></button>
        <p>Level {pokemonDetail?.evolutionLevel}</p>
        <button title='Next Evolution' onClick={handleNext} disabled={tamaño === indexEvolution}><BsChevronRight/></button>
      </div>
      <div className={classes.containerCircle}>
          <div className={classes.otherCircle}>
              <img src={pokemonDetail?.image} alt="" loading='lazy'/>
              <div className={classes.lines}>
                  <div className={classes.line}></div>
                  <div className={classes.line}></div>
              </div>
          </div>
      </div>
      
    </div>
  )
}

export default PokemonContainer
