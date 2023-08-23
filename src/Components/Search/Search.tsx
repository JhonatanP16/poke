import React,{useState,useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import classes from './Search.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getRamdomPokemon } from '../../store/reducers/getRamdomPokemon';
import { useNavigate } from 'react-router-dom';

const Search:React.FC = () => {
  const {allPokemon} = useAppSelector((state) => state.pokemon);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query,setQuery] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setQuery(value);
    navigate(`/?search=${value}`);
  }
  
  useEffect(() => {
    if(allPokemon){
      const filteredPokemons = allPokemon.filter((pokemon) => {
        if(!(query.trim().length > 0)){
          return;
        }
        return pokemon.name.includes(query.toLowerCase());
      }).slice(0,12);
      if(filteredPokemons.length > 0 ){
        dispatch(getRamdomPokemon(filteredPokemons));
      }else{
        const clonedPokemons = [...allPokemon];
        const ramdomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0,20);
        dispatch(getRamdomPokemon(ramdomPokemonsId));
        alert('Pokemons not found: generando ramdom pokemos')
        setQuery('');
      }
    }
  },[query]);

  return (
    <div className={classes.content}>
      <form action="/">
        <input
        value={query}
        type="text"
        onChange={handleChange}
        placeholder='Search a pokemon'
        />
        <BsSearch className={classes.icon}/>
      </form>
    </div>
  )
}

export default Search
