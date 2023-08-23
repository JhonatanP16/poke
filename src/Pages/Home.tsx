import React, { useEffect,useRef} from 'react'
import Container from '../Components/Utilities/Container'
import PokemonList from '../Components/Common/PokemonList'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { getPokemonData } from '../store/reducers/getPokemonData'
import { getRamdomPokemon } from '../store/reducers/getRamdomPokemon'
import classes from './Home.module.css';
import Loader from '../Components/Common/Loader'
import { useLocation } from 'react-router-dom'

const Home:React.FC = () => {
  const {allPokemon, randomPokemon} = useAppSelector((state) => state.pokemon);
  const isEffectRan = useRef(true);
  const {search} = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get('search');
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(allPokemon === undefined){
      dispatch(getPokemonData())
    }
  },[])
  
  useEffect(() => {
      if(isEffectRan.current === true && allPokemon){
        const clonedPokemons = [...allPokemon];
        const ramdomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0,20);
        dispatch(getRamdomPokemon(ramdomPokemonsId));
      }
      return () => {
        if(allPokemon){
          isEffectRan.current = false;
        }else{
          isEffectRan.current = true;
        }
      }
  },[allPokemon]);
  
  return (
    <Container>
        <h1 className={classes.h}>{searchValue ? '' : 'Ramdom '}Pokemos encontrados {searchValue && `para ${searchValue}`}</h1>
        {
          !isEffectRan.current && randomPokemon !== undefined ? (
            <PokemonList pokemons={randomPokemon}/>
          ) : (
           <Loader/>
          )
        }
    </Container>
  )
}

export default Home
