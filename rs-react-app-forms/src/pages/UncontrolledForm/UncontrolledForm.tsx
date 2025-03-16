import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormState } from '../../app/slices/controlledFormSlice';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../../app/slices/globalSlice';
import styles from './UnControlledForm.module.css';
import './UnControlledForm.module.css';
import { FromType } from '../../constants';
import * as yup from 'yup';
import { getYupFormSchema } from '../../app/schema/controlledFormSchema';
import { UnControlledFormInput } from './components/UncontrolledFormInput/UncontrolledFormInput';
import { setFormData } from '../../app/slices/unControlledFormSlice';

export const UnControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [isFormValid, setIsFormValid] = useState(true);

  const { countries, genders } = useSelector(
    (state: { globalState: GlobalState }) => state.globalState
  );
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const validateForm = async () => {
    const schema = getYupFormSchema(countries);
    const data: FormState = {
      name: nameRef.current?.value || '',
      age: parseInt(ageRef.current?.value || '0', 10),
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      gender: genderRef.current?.value || '',
      terms: termsRef.current?.checked || false,
      picture: pictureRef.current?.files || new DataTransfer().files,
      country: countryRef.current?.value || '',
    };
    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      return data;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validateErrors: Partial<Record<keyof FormState, string>> = {};

        err.inner.forEach(({ path, message }) => {
          const key = path as keyof FormState;
          validateErrors[key] = message;
        });

        setErrors(validateErrors);
        setIsFormValid(true);
      }
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = await validateForm();
    if (!data) return;
    setErrors({});

    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(
        setFormData({
          ...data,
          picture: reader.result as string,
        })
      );
      navigate('/', {
        state: { newData: true, formType: FromType.UNCONTROLLED_FORM },
      });
    };
    if (
      pictureRef.current &&
      pictureRef.current.files &&
      pictureRef.current.files[0]
    ) {
      reader.readAsDataURL(pictureRef.current.files[0]);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={(e) => onSubmit(e)}>
        <UnControlledFormInput
          ref={nameRef}
          name="name"
          error={errors['name']}
          onChange={() => setErrors({ ...errors, name: '' })}
        />
        <UnControlledFormInput
          ref={ageRef}
          type="number"
          name="age"
          error={errors['age']}
          onChange={() => setErrors({ ...errors, age: '' })}
        />
        <UnControlledFormInput
          ref={emailRef}
          name="email"
          type="email"
          error={errors['email']}
          onChange={async () => setErrors({ ...errors, email: '' })}
        />
        <UnControlledFormInput
          ref={passwordRef}
          name="password"
          error={errors['password']}
          onChange={async () => setErrors({ ...errors, password: '' })}
          type="password"
        />
        <UnControlledFormInput
          ref={confirmPasswordRef}
          name="confirmPassword"
          error={errors['confirmPassword']}
          onChange={async () => setErrors({ ...errors, confirmPassword: '' })}
          type="password"
        />

        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            onChange={async () => setErrors({ ...errors, gender: '' })}
            ref={genderRef}
            id="gender"
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <div className={`gender-errorWrapper`}>
            {<span>{errors['gender']}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            accept="image/png, image/jpeg"
            onChange={async () => setErrors({ ...errors, picture: '' })}
          />
          <div className={`picture-errorWrapper`}>
            {<span>{errors['picture']}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            onChange={async () => setErrors({ ...errors, country: '' })}
            ref={countryRef}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className={`country-errorWrapper`}>
            {<span>{errors['country']}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="terms">
            <input
              onChange={async () => setErrors({ ...errors, terms: '' })}
              ref={termsRef}
              type="checkbox"
              id="terms"
            />
            Accept T&C
          </label>
          <div className={`terms-errorWrapper`}>
            {<span>{errors['terms']}</span>}
          </div>
        </div>

        <button disabled={!isFormValid} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
