import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  ControlledFormState,
  setFormData,
  setPicture,
} from '../../app/slices/controlledFormSlice';
import { FormInput } from './components/FormInput/FormInput';
import { FormSelect } from './components/FormSelect/FormSelect';
import { FormList } from './components/FormList/FormList';
import { controlledFormSchema } from '../../app/schema/controlledFormSchema';

export const ControlledForm: React.FC = () => {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: { controlledForm: ControlledFormState }) =>
      state.controlledForm.countries
  );
  const genders = useSelector(
    (state: { controlledForm: ControlledFormState }) =>
      state.controlledForm.genders
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(controlledFormSchema),
    mode: 'onChange',
  });
  const isSubmitDisabled = Boolean(Object.keys(errors).length) || isDirty;
  const onSubmit = (
    data: Omit<ControlledFormState, 'countries' | 'genders'>
  ) => {
    console.log(data);
    dispatch(setFormData(data));
    if (data.picture && data.picture[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setPicture(reader.result as string));
      };
      reader.readAsDataURL(data.picture[0] as unknown as Blob);
    }
    console.log('Form submitted', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput name="name" control={control} error={errors} />
      <FormInput name="age" type="number" control={control} error={errors} />
      <FormInput name="email" type="email" control={control} error={errors} />
      <FormInput
        name="password"
        type="password"
        control={control}
        error={errors}
      />
      <FormInput
        name="confirmPassword"
        type="password"
        control={control}
        error={errors}
      />

      <FormInput name="picture" control={control} error={errors} />
      <FormSelect
        name="gender"
        control={control}
        error={errors}
        genders={genders}
      />
      {/* <div>
        <label htmlFor="picture">Upload Picture:</label>
        <input
          type="file"
          id="picture"
          {...register('picture')}
          accept="image/png, image/jpeg"
        />
        {errors.picture && <span>{errors.picture.message}</span>}
      </div> */}
      <FormList
        name="country"
        control={control}
        error={errors}
        countries={countries}
      />

      <div>
        <label htmlFor="terms">Accept T&C:</label>
        <input type="checkbox" id="terms" {...register('terms')} />
        {errors.terms && <span>{errors.terms.message}</span>}
      </div>
      <button disabled={isSubmitDisabled} type="submit">
        Submit
      </button>
    </form>
  );
};
