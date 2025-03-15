import React from 'react';
import { ControlledFormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type ControlledFormStateKeys = keyof Omit<
  ControlledFormState,
  'countries' | 'terms' | 'genders'
>;

interface FormInputProps {
  name: ControlledFormStateKeys;
  control: Control<Omit<ControlledFormState, 'countries' | 'genders'>>;
  error: FieldErrors;
  type?: string;
  genders: string[];
}

export const FormSelect: React.FC<FormInputProps> = ({
  name,
  control,
  error,
  genders,
}) => {
  const fieldError = error[name] && (error[name].message as string);
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <select id={name} {...field}>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        )}
      />
      <span>{fieldError}</span>
    </div>
  );
};
