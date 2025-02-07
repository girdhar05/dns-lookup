import React from 'react';

interface InputBoxProps {
  placeholder?: string;
  value: string;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputBox: React.FC<InputBoxProps> = ({ placeholder, value, onChange, onKeyDown, className }) => {
  const defaultClasses = "border border-gray-300 rounded-md p-2 w-full";
  return (
    <input
      type="text"
      className={className ? `${defaultClasses} ${className}` : defaultClasses}
      placeholder={placeholder}
      value={value}
      onKeyUp={onKeyDown}
      onChange={onChange}
    />
  );
};

export default InputBox;
