import { FormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { capitalaze } from '../../../../utils';
import './FormInput.module.css';
type FormStateText = keyof Omit<FormState, 'terms' | 'picture'>;

interface FormInputProps {
  name: FormStateText;
  control: Control<FormState>;
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
    <div className={name}>
      <label htmlFor={name}>{capitalaze(name)}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input type={type} id={name} {...field} list={name} />
        )}
      />
      <div className={`${name}-errorWrapper`}>
        <span>{fieldError}</span>
      </div>
    </div>
  );
};
