import { createSlice } from '@reduxjs/toolkit';
import { StarWarsPerson } from '../services/starWarsApiClient';

export type StarWarsState = {
  selectedItems: StarWarsPerson[];
};

const initialState: StarWarsState = {
  selectedItems: [],
};

export const starWarsItems = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addItem: (state, action) => {
      return {
        ...state,
        selectedItems: [...state.selectedItems, action.payload],
      };
    },
    removeItem: (state, action) => {
      return {
        ...state,
        selectedItems: [
          ...state.selectedItems.filter((item) => item.name !== action.payload),
        ],
      };
    },

    getItems: (state) => {
      return {
        ...state,
      };
    },

    clearItems: (state) => {
      return {
        ...state,
        selectedItems: [],
      };
    },
  },
});

export const { addItem, removeItem, getItems, clearItems } =
  starWarsItems.actions;

export default starWarsItems.reducer;
