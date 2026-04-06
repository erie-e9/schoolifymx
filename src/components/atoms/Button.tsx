import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-1 font-heading font-700 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const variants = {
    primary: 'bg-primary text-text-main shadow-yellow hover:shadow-yellow-lg hover:scale-105 hover:bg-primary/90',
    secondary: 'bg-secondary dark:bg-primary text-white dark:text-text-main hover:bg-secondary/90 shadow-lg hover:scale-105',
    tertiary: 'bg-gray-100 dark:bg-white/10 text-white hover:bg-gray-50 dark:hover:bg-white/5 shadow-lg hover:scale-105',
    outline: 'bg-gray-50 hover:bg-gray-100 dark:bg-dark-bg/50 dark:hover:bg-primary/20 text-secondary dark:text-white/80 rounded-xl font-heading font-800 transition-colors items-center justify-center border-[1px] border-secondary/70 dark:border-primary/70 dark:bg-primary/10',
    ghost: 'text-text-muted dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-primary/10 transition-colors',
    danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:scale-105',
    success: 'w-full inline-flex items-center justify-center bg-[#25D366] text-white font-bold text-base py-2 rounded-2xl shadow-lg hover:-translate-y-1 active:scale-95 transition-all duration-200 group',
  };

  const sizes = {
    xs: 'px-2 py-1 text-[8px] rounded-lg',
    sm: 'px-4 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-6 py-4 text-base rounded-2xl',
    icon: 'p-2.5 rounded-xl',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
