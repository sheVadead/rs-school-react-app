import React, { useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { FormState, setFormData } from '../../app/slices/controlledFormSlice';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../../app/slices/globalSlice';
import styles from './UnControlledForm.module.css';
import './UnControlledForm.module.css';
import { FromType } from '../../constants';
import * as yup from 'yup';
import { getYupFormSchema } from '../../app/schema/controlledFormSchema';
import { UnControlledFormInput } from './components/UncontrolledFormInput/UncontrolledFormInput';

export const UnControlledForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

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

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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

    console.log(data);
    const schema = getYupFormSchema(countries);
    console.log('Yup Schema:', schema);
    try {
      await schema.validate(data, { abortEarly: false });

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
      } else {
        dispatch(setFormData(data));
        navigate('/', {
          state: { newData: true, formType: FromType.UNCONTROLLED_FORM },
        });
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: Partial<Record<keyof FormState, string>> = {};
        err.inner.forEach((error) => {
          const { path, message } = error;

          if (!path) return;

          validationErrors[path as keyof FormState] = message;
          console.log(error.path);
        });

        setErrors(validationErrors);
      }
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form onSubmit={(e) => onSubmit(e)}>
        <UnControlledFormInput ref={nameRef} name="name" />
        <UnControlledFormInput
          ref={ageRef}
          type="number"
          name="age"
          error={errors}
        />
        <UnControlledFormInput
          ref={emailRef}
          name="email"
          type="email"
          //   error={errors}
        />
        <UnControlledFormInput
          ref={passwordRef}
          name="password"
          //   error={errors}
          type="password"
        />
        <UnControlledFormInput
          ref={confirmPasswordRef}
          name="confirmPassword"
          //   error={errors}
          type="password"
        />

        <div>
          <label htmlFor="gender">Gender:</label>
          <select ref={genderRef} id="gender">
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <div className={`gender-errorWrapper`}>
            {errors.gender && <span>{errors.gender.message}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            accept="image/png, image/jpeg"
          />
          <div className={`picture-errorWrapper`}>
            {errors.picture && <span>{errors.picture.message}</span>}
          </div>
        </div>

        <div>
          <label htmlFor="country">Country:</label>
          <select id="country" ref={countryRef}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className={`country-errorWrapper`}>
            {/* {errors.country && <span>{errors.country.message}</span>} */}
          </div>
        </div>

        <div>
          <label htmlFor="terms">
            <input ref={termsRef} type="checkbox" id="terms" /> Accept T&C
          </label>
          <div className={`terms-errorWrapper`}>
            {/* {errors.terms && <span>{errors.terms.message}</span>} */}
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
