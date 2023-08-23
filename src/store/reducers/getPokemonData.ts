import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonRoute } from "../../api/Api";

export const getPokemonData = createAsyncThunk(
    "pokemon/initialData",
    async () => {
        try {
            const {data} = await axios.get(pokemonRoute);
            return data.results;
        } catch (error) {
            console.error(error);
        }
    }
)