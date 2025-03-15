import { ControlledFormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type ControlledFormStateText = keyof Omit<
  ControlledFormState,
  'countries' | 'terms' | 'genders'
>;

interface FormInputProps {
  name: ControlledFormStateText;
  control: Control<Omit<ControlledFormState, 'countries' | 'genders'>>;
  error: FieldErrors;
  type?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  error,
  type = 'text',
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
          <input type={type} id={name} {...field} list={name} />
        )}
      />
      <span>{fieldError}</span>
    </div>
  );
};
