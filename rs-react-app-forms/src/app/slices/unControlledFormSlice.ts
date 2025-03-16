import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState } from './controlledFormSlice';

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  terms: false,
  picture: '',
  country: '',
};

const unControlledFormSlice = createSlice({
  name: 'unControlledForm',
  initialState,
  reducers: {
    resetForm: () => initialState,

    setFormData: (
      state,
      action: PayloadAction<FormState>
    ) => {
     return { ...state, ...action.payload };
    },
  },
});

export const {
  resetForm,
  setFormData,
} = unControlledFormSlice.actions;

export default unControlledFormSlice.reducer;
