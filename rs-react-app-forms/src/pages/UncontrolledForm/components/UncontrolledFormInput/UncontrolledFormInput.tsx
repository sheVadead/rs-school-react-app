import { FieldErrors } from 'react-hook-form';
import { FormState } from '../../../../app/slices/controlledFormSlice';
import { capitalaze } from '../../../../utils';

type FormStateText = keyof Omit<FormState, 'terms' | 'picture'>;

type UncontrolledFormInputProps = {
  name: FormStateText;
  error?: Partial<Record<keyof FormState, string>>;
  type?: string;
  ref: React.Ref<HTMLInputElement>;
};

export const UnControlledFormInput: React.FC<UncontrolledFormInputProps> = ({
  name,
  error,
  type = 'text',
  ref,
}) => {
  const fieldError = error && error[name];
  console.log('name', name, fieldError);
  return (
    <div className={name}>
      <label htmlFor={name}>{capitalaze(name)}</label>
      <input ref={ref} type={type} id={name} list={name} />
      <div className={`${name}-errorWrapper`}>
        <span>{error && error[name]}</span>
      </div>
    </div>
  );
};
