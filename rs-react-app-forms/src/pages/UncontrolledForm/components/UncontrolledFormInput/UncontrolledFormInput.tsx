import { FormState } from '../../../../app/slices/controlledFormSlice';
import { PasswordStrengthMeter } from '../../../../sharedComponents/PasswordStrengthMeter/PasswordStrengthMeter';
import { capitalaze } from '../../../../utils';

type FormStateText = keyof Omit<FormState, 'terms' | 'picture'>;

type UncontrolledFormInputProps = {
  name: FormStateText;
  error?: string;
  type?: string;
  ref: React.RefObject<HTMLInputElement | null>;
  onChange?: () => void;
};

export const UnControlledFormInput: React.FC<UncontrolledFormInputProps> = ({
  name,
  error,
  type = 'text',
  ref,
  onChange,
}: UncontrolledFormInputProps) => {
  const password = ref?.current?.value;
  const styles = password && name === 'password' ? { height: '140px' } : {};
  return (
    <div className={name}>
      <label htmlFor={name}>{capitalaze(name)}</label>
      <input onChange={onChange} ref={ref} type={type} id={name} list={name} />
      <div style={styles} className={`${name}-errorWrapper`}>
        <span>{error}</span>
        {name === 'password' && ref?.current?.value && (
          <PasswordStrengthMeter password={ref?.current?.value} />
        )}
      </div>
    </div>
  );
};
