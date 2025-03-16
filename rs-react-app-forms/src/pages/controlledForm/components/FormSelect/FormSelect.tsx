import React from 'react';
import { FormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { capitalaze } from '../../../../utils';

type FormStateKeys = keyof Omit<
  FormState,
  'countries' | 'terms' | 'genders' | 'picture'
>;

interface FormInputProps {
  name: FormStateKeys;
  control: Control<FormState>;
  error: FieldErrors;
  type?: string;
  optionList: string[];
}

export const FormSelect: React.FC<FormInputProps> = ({
  name,
  control,
  error,
  optionList,
}) => {
  const fieldError = error[name] && (error[name].message as string);
  return (
    <div>
      <label htmlFor={name}>{capitalaze(name)}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <select id={name} {...field}>
            <option value="" disabled>
              Select a {name}
            </option>
            {optionList.map((option) => (
              <option defaultChecked key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      />
      <div className={`${name}-errorWrapper`}>
        <span>{fieldError}</span>
      </div>
    </div>
  );
};
