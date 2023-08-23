import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonTypes } from "../../types/pokemonTypes";
import { generatedPokemonType, genericPokemonType } from "../../types/types";

export const getRamdomPokemon = createAsyncThunk(
    "pokemon/randomPokemon",
    async (pokemons: genericPokemonType[]) => {
        try {
            const pokemonsData: generatedPokemonType[] = [];
            for await (const pokemon of pokemons){
                const {
                    data,
                  }: {
                    data: {
                      id: number;
                      types: { type: genericPokemonType }[];
                    };
                  } = await axios.get(pokemon.url);
               
                  const types = data.types.map(
                    ({ type: { name } }: { type: { name: string } }) => ({
                      [name]: pokemonTypes[name],
                    })
                  );

                  let image:string = `/src/assets/shiny/${data.id}.png`;
                  if(image){
                    pokemonsData.push({
                        name:pokemon.name,
                        id:data.id,
                        image,
                        types,
                    });
                  }

            }
            return pokemonsData;
        } catch (error) {
            console.log(error);
        }
    }
)