import { createSlice } from '@reduxjs/toolkit'
import { getPokemonData } from './reducers/getPokemonData';
import { PokemonInitialStateType} from '../types/types';
import { getRamdomPokemon } from './reducers/getRamdomPokemon';


const initialState: PokemonInitialStateType = {
    allPokemon: undefined,
    randomPokemon: undefined,
    currentPokemon: undefined,
};

const pokemonSlice = createSlice({
    name:'pokemon',
    initialState,
    reducers:{
        setCurrentPokemon:(state,action) => {
            state.currentPokemon = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getPokemonData.fulfilled,(state,action) => {
            state.allPokemon = action.payload;
        });
        builder.addCase(getRamdomPokemon.fulfilled,(state,action) => {
            state.randomPokemon = action.payload;
        })
    },
});

export const {setCurrentPokemon} = pokemonSlice.actions;
export default pokemonSlice.reducer;