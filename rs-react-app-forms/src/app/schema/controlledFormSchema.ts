import * as yup from 'yup';

// const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

export const getYupFormSchema = (countries: string[]) => {
  return yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .test('capitalized', 'First letter must be uppercase', (value) => {
        return !!value && value[0] === value[0].toUpperCase();
      }),

    age: yup
      .number()
      .typeError('Age must be a number')
      .required('Age is required')
      .min(16, 'Should me more than 16'),

    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),

    password: yup.string().required('Password is required'),
    // .matches(
    //   passwordRegex,
    //   'Password must contain: 1 uppercase, 1 lowercase, 1 number, 1 special character'
    // ),

    confirmPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),

    gender: yup.string().required('Gender is required'),

    terms: yup
      .boolean()
      .required('You must accept the terms')
      .oneOf([true], 'You must accept the terms'),

    picture: yup
      .mixed<FileList | string>()
      .required('Picture is required')
      .test('fileType', 'Only JPEG and PNG formats', (value) => {
        const file = value[0] as File;
        if (typeof value === 'string') return true;
        return file && ['image/jpeg', 'image/png'].includes(file.type);
      })
      .test('fileSize', 'Max size 2MB', (value) => {
        const file = value[0] as File;
        if (typeof value === 'string') return true;
        return file && file.size <= 2 * 1024 * 1024;
      }),

    country: yup
      .string()
      .oneOf(countries, 'Selected country is not valid')
      .required('Country is required'),
  });
};
