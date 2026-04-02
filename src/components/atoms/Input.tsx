import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  containerClassName = '',
  id,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-heading font-700 text-text-muted dark:text-dark-muted ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          className={`
            w-full transition-all outline-none text-sm
            bg-gray-100 dark:bg-white/10 
            border border-transparent 
            rounded-xl 
            focus:border-primary/50 focus:bg-white dark:focus:bg-white/15 
            text-gray-800 dark:text-white 
            placeholder:text-gray-400
            ${leftIcon ? 'pl-10' : 'px-4'}
            ${rightIcon ? 'pr-10' : 'px-4'}
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            py-2.5
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <span className="text-[10px] text-red-500 font-medium ml-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
