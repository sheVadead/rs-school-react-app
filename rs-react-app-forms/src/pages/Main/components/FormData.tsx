import React from 'react';
import { FormState } from '../../../app/slices/controlledFormSlice';
import styles from './FormData.module.css';
import { FromType } from '../../../constants';
interface FormDataDisplayProps {
  formData: FormState;
  highlighted?: boolean;
  type: FromType;
}

export const FormDataDisplay: React.FC<FormDataDisplayProps> = ({
  formData,
  highlighted,
  type,
}) => {
  return (
    <div
      className={`${styles.formData} ${highlighted ? styles.highlight : ''}`}
    >
      <h2>
        {type === FromType.CONTROLLED_FORM ? 'Controlled' : 'Uncontrolled'} Form
        Data
      </h2>
      <div>
        <strong>Name:</strong> {formData.name}
      </div>
      <div>
        <strong>Age:</strong> {formData.age}
      </div>
      <div>
        <strong>Email:</strong> {formData.email}
      </div>
      <div>
        <strong>Password:</strong> {formData.password}
      </div>
      <div>
        <strong>Confirm Password:</strong> {formData.confirmPassword}
      </div>
      <div>
        <strong>Gender:</strong> {formData.gender}
      </div>
      <div>
        <strong>Terms Accepted:</strong> {formData.terms ? 'Yes' : 'No'}
      </div>
      <div>
        <strong>Picture:</strong>{' '}
        {formData.picture ? (
          <img src={formData.picture as string} alt="Uploaded" width="100" />
        ) : (
          'No picture uploaded'
        )}
      </div>
      <div>
        <strong>Country:</strong> {formData.country}
      </div>
    </div>
  );
};
