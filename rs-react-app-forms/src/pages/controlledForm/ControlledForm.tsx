import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { FormState, setFormData } from '../../app/slices/controlledFormSlice';
import { FormInput } from './components/FormInput/FormInput';
import { FormSelect } from './components/FormSelect/FormSelect';
import { FormList } from './components/FormList/FormList';
import { getYupFormSchema } from '../../app/schema/controlledFormSchema';
import { GlobalState } from '../../app/slices/globalSlice';
import styles from './ControlledForm.module.css';
import './ControlledForm.module.css';
import { useNavigate } from 'react-router-dom';
import { FromType } from '../../constants';
import { FormFileInput } from './components/FileInput/FormFileInput';

export const ControlledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { countries, genders } = useSelector(
    (state: { globalState: GlobalState }) => state.globalState
  );

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(getYupFormSchema(countries)),
    mode: 'onChange',
  });

  const isSubmitDisabled = !isDirty || Boolean(Object.keys(errors).length);

  const onSubmit = (data: FormState) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(
        setFormData({
          ...data,
          picture: reader.result as string,
        })
      );

      navigate('/', {
        state: { newData: true, formType: FromType.CONTROLLED_FORM },
      });
    };
    reader.readAsDataURL(data.picture[0] as Blob);
  };
  const password = watch('password', '');

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="name" control={control} error={errors} />
        <FormInput name="age" type="number" control={control} error={errors} />
        <FormInput name="email" type="email" control={control} error={errors} />
        <FormInput
          name="password"
          type="password"
          control={control}
          error={errors}
          password={password}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          control={control}
          error={errors}
        />

        <FormSelect
          name="gender"
          control={control}
          error={errors}
          optionList={genders}
        />
        <FormFileInput name="picture" control={control} error={errors} />
        <FormList
          name="country"
          control={control}
          error={errors}
          listItems={countries}
        />
        <div>
          <label htmlFor="terms">Accept T&C:</label>
          <input type="checkbox" id="terms" {...register('terms')} />
          <div className="terms-errorWrapper">
            {errors.terms && <span>{errors.terms.message}</span>}
          </div>
        </div>
        <button disabled={isSubmitDisabled} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
