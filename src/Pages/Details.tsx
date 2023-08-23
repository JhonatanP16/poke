import React, { useEffect,useState,useCallback } from 'react'
import Container from '../Components/Utilities/Container'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { extractColors } from "extract-colors";
import {  pokemonRouteD, pokemonRouteEspecies } from '../api/Api';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setCurrentPokemon } from '../store/pokemonSlice';
import classes from './Details.module.css'
import PokemonContainer from '../Components/Common/PokemonContainer';
import InfoPokemon from '../Components/Common/InfoPokemon';
import 'react-loading-skeleton/dist/skeleton.css';
import SkeletonDetails from '../Components/Common/SkeletonDetails';
interface PokemonType {
  type: {
    name: string;
  };
}
const Details:React.FC = () => {
  const {state} = useLocation();
  const dispatch = useAppDispatch();
  const {currentPokemon} = useAppSelector((state) => state.pokemon);
  const [loading,setLoading] = useState(true);
  console.log(loading);
  const getRecursiveEvolution = useCallback(
    (evolutionChain:any, level:any, evolutionData:any) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    (evolutionChain: any) => {
      const evolutionData:any[] = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const getPokemonDetails = async() => {
    setLoading(true);
    const {data}= await axios.get(`${pokemonRouteD}/${state}`);

    const {data:{evolution_chain: {url : evolutionURL}}} = await axios.get(`${pokemonRouteEspecies}/${state}`);

    const {data: evolutionData} = await axios.get(evolutionURL);
    
    const evolution = getEvolutionData(evolutionData.chain);
    let evolutionLevel;
    evolutionLevel = evolution.find(({pokemon}) => pokemon.name === data.name).level;
    const stats = await data.stats.map(({stat,base_stat}) => ({
      name:stat.name,
      value:base_stat,
    }))
    
    let image:string = `/src/assets/shiny/${data.id}.png`;
    
    dispatch(setCurrentPokemon({
      id: data.id,
      name:data.name,
      image,
      types: data.types.map(({type: {name}} : PokemonType) => name),
      stats,
      evolution,
      evolutionLevel,
    }));
    setLoading(false);
  }
  const getColor = async() => {
    const options = {
      pixels: 10000,
      distance: 1,
      colorValidator: (red, green, blue, alpha = 255) => alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333
    }
    let image:string = `/src/assets/shiny/${state}.png`;
    const color = await extractColors(image,options);
    const root = document.documentElement;
    root.style.setProperty("--accent-color",color[0].hex.split('"')[0]);
  }

  useEffect(() => {
    getPokemonDetails();
    getColor();
  },[dispatch,state])

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  return (
    <Container>
        {
          !loading && currentPokemon !== undefined ? (
            <div className={classes.content}>
              <div className={classes.containerDetails}>
                <InfoPokemon pokemon={currentPokemon}/>
                <PokemonContainer pokemonDetail={currentPokemon}/>
              </div>
            </div>
          ) : (
            <SkeletonDetails/>
          )
        }
    </Container>
  )
}

export default Details
