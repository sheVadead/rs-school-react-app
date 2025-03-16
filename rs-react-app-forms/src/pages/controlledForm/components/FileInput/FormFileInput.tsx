import { FormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { capitalaze } from '../../../../utils';
type FormStateText = keyof Pick<FormState, 'picture'>;

interface FormInputProps {
  name: FormStateText;
  control: Control<FormState>;
  error: FieldErrors;
}

export const FormFileInput: React.FC<FormInputProps> = ({
  name,
  control,
  error,
}: FormInputProps) => {
  const fieldError = error[name] && (error[name].message as string);
  return (
    <div className={name}>
      <label htmlFor={name}>{capitalaze(name)}</label>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            type="file"
            id={name}
            accept="image/png, image/jpeg"
            onChange={(e) => field.onChange(e.target.files)}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
          />
        )}
      />
      <div className={`${name}-errorWrapper`}>
        <span>{fieldError}</span>
      </div>
    </div>
  );
};
