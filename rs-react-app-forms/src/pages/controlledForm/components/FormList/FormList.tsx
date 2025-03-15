import { ControlledFormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type ControlledFormStateText = keyof Omit<
  ControlledFormState,
  'countries' | 'terms' | 'genders'
>;

interface FormListProps {
  name: ControlledFormStateText;
  control: Control<Omit<ControlledFormState, 'countries' | 'genders'>>;
  error: FieldErrors;
  countries: string[];
}

export const FormList: React.FC<FormListProps> = ({
  name,
  control,
  error,
  countries
}) => {
  const fieldError = error[name] && (error[name].message as string);
  return (
    <div>
      <label htmlFor="country">Country:</label>
      <Controller
        name="country"
        defaultValue=''
        control={control}
        render={({ field }) => (
          <input type="text" id={name} {...field} list={`${name}-list`} />
        )}
      />
      <datalist id="country-list">
        {countries.map((country) => (
          <option key={country} value={country} />
        ))}
      </datalist>
      <span>{fieldError}</span>
    </div>
  );
};
