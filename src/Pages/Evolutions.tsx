import React, { useEffect,useState } from 'react'
import Container from '../Components/Utilities/Container'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { genericPokemonType } from '../types/types';
import { getRamdomPokemon } from '../store/reducers/getRamdomPokemon';
import PokemonList from '../Components/Common/PokemonList';
import Loader from '../Components/Common/Loader';
import { useNavigate } from 'react-router-dom';


const Evolutions:React.FC = () => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const pokemonData= useAppSelector((state) => state.pokemon);
    const navigate = useNavigate()
    if(!pokemonData?.currentPokemon){
        navigate('/');
    }
    useEffect(() => {
        
        const fetchData = async() => {
        const pokemons: genericPokemonType[] | undefined = pokemonData!.currentPokemon?.evolution
        .map(({pokemon} :{pokemon: genericPokemonType}) => pokemon);
        if(pokemons !== undefined){
            await dispatch(getRamdomPokemon(pokemons));
        }
        setIsLoaded(true);
        }
        fetchData();
        window.scrollTo(0,0);
    },[dispatch])

  return (
   <Container>
    {
        isLoaded ? (
            <PokemonList pokemons={pokemonData?.randomPokemon}/>
        ) : (
            <Loader/>
        )
    }
   </Container>
  )
}

export default Evolutions
