import React from 'react';
import './PasswordStrengthMeter.module.css';
import styles from './PasswordStrengthMeter.module.css';
interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const getStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    return strength;
  };

  const strength = getStrength();
  const strengthLabel = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][
    strength
  ];
  const strengthColor = ['#828282', '#EA1111', '#FFAD00', '#9bc158', '#00b500'][
    strength
  ];

  const changePasswordColor = () => ({
    width: `${(strength * 100) / 5}%`,
    background: strengthColor,
    height: '7px',
  });

  const getSummary = () => {
    return [
      { label: 'At least 8 characters', regex: /.{8,}/ },
      { label: '1 uppercase letter', regex: /[A-Z]/ },
      { label: '1 lowercase letter', regex: /[a-z]/ },
      { label: '1 number', regex: /\d/ },
      { label: '1 special character', regex: /[!@#$%^&*]/ },
    ].map((rule, index) => (
      <li
        key={index}
        style={{ color: rule.regex.test(password) ? 'green' : 'red' }}
      >
        {rule.label}
      </li>
    ));
  };

  return (
    <div className="password-strength-meter">
      <div className="progress" style={{ height: '7px' }}>
        <div className="progress-bar" style={changePasswordColor()} />
      </div>
      <p className="strength-item" style={{ color: strengthColor }}>
        {strengthLabel}
      </p>
      <ul className={styles['strength-params']}>{getSummary()}</ul>
    </div>
  );
};
