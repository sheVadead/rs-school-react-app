import * as yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export const controlledFormSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .transform((value) => value.charAt(0).toUpperCase() + value.slice(1))
    .test(
      'capitalized',
      'First letter must be uppercase',
      (value) => !!value && value[0] === value[0].toUpperCase()
    ),

  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(0, 'Age cannot be negative'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),

  password: yup
    .string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must contain: 1 uppercase, 1 lowercase, 1 number, 1 special character'
    ),

  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  gender: yup.string().required('Gender is required'),

  terms: yup
    .boolean()
    .required('You must accept the terms')
    .oneOf([true], 'You must accept the terms'),

  //   picture: yup
  //     .mixed<File | string>()
  //     .required('Picture is required')
  //     .test('fileType', 'Only JPEG and PNG formats', (value) => {
  //       if (typeof value === 'string') return true;
  //       return value && ['image/jpeg', 'image/png'].includes(value.type);
  //     })
  //     .test('fileSize', 'Max size 2MB', (value) => {
  //       if (typeof value === 'string') return true;
  //       return value && value.size <= 2 * 1024 * 1024;
  //     }),

  country: yup.string().required('Country is required'),
});
