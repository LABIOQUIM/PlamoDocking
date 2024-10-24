// components/Input.tsx
import React , { InputHTMLAttributes } from 'react';

export type InputProps = {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({
  placeholder = '',
  type = 'text',
  required = false,
  value,
  onChange,
  className = '',
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      className={`p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`}
    />
  );
};

export default Input;
