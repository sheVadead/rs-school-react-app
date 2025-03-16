import { createSlice } from '@reduxjs/toolkit';

export type GenderOptions = {
  option: string;
  disabled?: boolean;
}

export interface GlobalState {
  countries: string[];
  genders: string[];
}

const initialState: GlobalState = {
  countries: [
    'USA',
    'Canada',
    'Mexico',
    'Poland',
    'Germany',
    'France',
    'Spain',
    'Italy',
    'Russia',
    'China',
    'Japan',
    'Australia',
  ],
  genders: [
    'Femail',
    'Male',
    'other',
  ],
};

const globalSlice = createSlice({
  name: 'globalState',
  initialState,
  reducers: {},
});

export const selectCountries = (state: { globalState: GlobalState }) =>
  state.globalState.countries;
export const selectGenders = (state: { globalState: GlobalState }) =>
  state.globalState.genders;

export default globalSlice.reducer;
