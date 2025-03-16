import { FormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { capitalaze } from '../../../../utils';
import { PasswordStrengthMeter } from '../../../../sharedComponents/PasswordStrengthMeter/PasswordStrengthMeter';
type FormStateText = keyof Omit<FormState, 'terms' | 'picture'>;

interface FormInputProps {
  name: FormStateText;
  control: Control<FormState>;
  error: FieldErrors;
  type?: string;
  password?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  control,
  error,
  type = 'text',
  password,
}) => {
  const fieldError = error[name] && (error[name].message as string);
  const styles = password && name === 'password' ? { height: '140px' } : {};
  return (
    <div className={name}>
      <label htmlFor={name}>{capitalaze(name)}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <input type={type} id={name} {...field} list={name} />
          </>
        )}
      />
      <div style={styles} className={`${name}-errorWrapper`}>
        {!password && <span>{fieldError}</span>}
        {password && <PasswordStrengthMeter password={password} />}
      </div>
    </div>
  );
};
