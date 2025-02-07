import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string | undefined
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  const defaultClasses = "bg-blue-500 text-white font-bold py-2 px-4 rounded-md";
  return (
    <button
      className={className ? `${defaultClasses} ${className}` : defaultClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;