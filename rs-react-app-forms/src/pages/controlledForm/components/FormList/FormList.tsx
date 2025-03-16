import { FormState } from '../../../../app/slices/controlledFormSlice';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type FormStateText = keyof Omit<
  FormState,
  'countries' | 'terms' | 'genders'
>;

interface FormListProps {
  name: FormStateText;
  control: Control<Omit<FormState, 'countries' | 'genders'>>;
  error: FieldErrors;
  listItems: string[];
}

export const FormList: React.FC<FormListProps> = ({
  name,
  control,
  error,
  listItems
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
      <datalist id={`${name}-list`}>
        {listItems.map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
      <div className={`${name}-errorWrapper`}>
        <span>{fieldError}</span>
      </div>
    </div>
  );
};
