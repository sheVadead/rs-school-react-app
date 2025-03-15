import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ControlledFormState = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture?: string;
  country: string;
  countries: string[];
  genders: string[];
};

const initialState: ControlledFormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  terms: false,
  picture: '',
  country: '',
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
  genders: ['Male', 'Female', 'Other'],
};

const controlledFormSlice = createSlice({
  name: 'controlledForm',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAge: (state, action: PayloadAction<number>) => {
      state.age = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    setTerms: (state, action: PayloadAction<boolean>) => {
      state.terms = action.payload;
    },
    setPicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload ?? '';
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    resetForm: () => initialState,

    setFormData: (
      state,
      action: PayloadAction<Omit<ControlledFormState, 'countries' | 'genders'>>
    ) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const {
  setName,
  setAge,
  setEmail,
  setPassword,
  setConfirmPassword,
  setGender,
  setTerms,
  setPicture,
  setCountry,
  resetForm,
  setFormData,
} = controlledFormSlice.actions;

export default controlledFormSlice.reducer;
