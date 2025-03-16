import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: NonNullable<boolean>;
  picture: NonNullable<string | FileList>;
  country: string;
}

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

const controlledFormSlice = createSlice({
  name: 'controlledForm',
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
} = controlledFormSlice.actions;

export default controlledFormSlice.reducer;
