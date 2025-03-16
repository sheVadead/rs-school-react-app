import { FormState } from '../../../../app/slices/controlledFormSlice';
import { capitalaze } from '../../../../utils';

type FormStateText = keyof Omit<FormState, 'terms' | 'picture'>;

type UncontrolledFormInputProps = {
  name: FormStateText;
  error?: string;
  type?: string;
  ref: React.Ref<HTMLInputElement>;
  onChange?: () => void;
};

export const UnControlledFormInput: React.FC<UncontrolledFormInputProps> = ({
  name,
  error,
  type = 'text',
  ref,
  onChange,
}) => {
  return (
    <div className={name}>
      <label htmlFor={name}>{capitalaze(name)}</label>
      <input onChange={onChange} ref={ref} type={type} id={name} list={name} />
      <div className={`${name}-errorWrapper`}>
        <span>{error && error}</span>
      </div>
    </div>
  );
};
