import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'outline' | 'tag';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-full';

  const variants = {
    primary: 'bg-primary text-text-main shadow-sm',
    secondary: 'bg-secondary text-white shadow-sm',
    success: 'bg-success/10 text-success border border-success/20',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    info: 'bg-blue-100 text-blue-700 border border-blue-200',
    outline: 'border border-gray-200 dark:border-gray-700 text-text-muted dark:text-white/90',
    tag: 'tag bg-secondary dark:bg-primary/10 text-white/90 dark:text-white/90 shadow-sm font-200 p-12 border-secondary/70 dark:border-primary/50 capitalize',
  };

  const sizes = {
    xs: 'text-[8px] px-1.5 py-0.5',
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-[14px] px-4 py-2 font-200',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
