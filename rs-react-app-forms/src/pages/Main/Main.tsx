import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FormState } from '../../app/slices/controlledFormSlice';
import { FromType } from '../../constants';
import { FormDataDisplay } from './components/FormData';

export const MainPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const controlledForm = useSelector(
    (state: { controlledForm: FormState }) => state.controlledForm
  );

  const [highlightControlled, setHighlightControlled] = useState(false);
  const [highlightUncontrolled, setHighlightUnControlled] = useState(false);

  useEffect(() => {
    if (location.state?.newData) {
      const setHiglightFormByType =
        location.state?.formType === FromType.CONTROLLED_FORM
          ? setHighlightControlled
          : setHighlightUnControlled;
      setHiglightFormByType(true);

      const timer = setTimeout(() => setHiglightFormByType(false), 3000);
      navigate(location.pathname, { replace: true, state: {} });
      return () => clearTimeout(timer);
    }
  }, [location.state, controlledForm, location.pathname, navigate]);

  return (
    <div>
      <h1>Main Page</h1>
      <FormDataDisplay
        type={FromType.CONTROLLED_FORM}
        formData={controlledForm}
        highlighted={highlightControlled}
      />

      <FormDataDisplay
        type={FromType.UNCONTROLLED_FORM}
        formData={controlledForm}
        highlighted={highlightUncontrolled}
      />
    </div>
  );
};
