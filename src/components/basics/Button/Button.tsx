import React from 'react';
import Icon, { IconProps } from '../icon/Icon';
import { twMerge } from 'tailwind-merge';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary-1' | 'primary-2' | 'primary-3' | 'primary-4' | 'primary-5' | 'primary-6';
  icon?: IconProps['name'];
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  iconColor?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary-1', children, className, icon, iconPosition = 'left', iconSize = 20, iconColor = 'black', ...rest
}, ref) => {
  function getVariant(variant: ButtonProps['variant']) {
    // eslint-disable-next-line no-var
    var primaryDefaultConfigButton = "rounded-lg py-2.5 px-[12px] min-w-[120px] text-white text-xs font-montserrat font-semibold uppercase tracking-wider";

    switch (variant) {
      case 'primary-1':
        return `bg-purple-900 ${primaryDefaultConfigButton}`;
      case 'primary-2':
        return `bg-gray-700 ${primaryDefaultConfigButton}`;
      case 'primary-3':
        return `bg-purple-800 ${primaryDefaultConfigButton}`;
      case 'primary-4':
        return `bg-customRed-600 ${primaryDefaultConfigButton}`;
      case 'primary-5':
        return `bg-gray-500 text-purple-900 ${primaryDefaultConfigButton}`;
      case 'primary-6':
        return `bg-black ${primaryDefaultConfigButton}`;
      default:
        return '';
    }
  }

  const buttonClassName = twMerge(`flex items-center justify-center ${getVariant(variant)} `, className);

  return (
    <button
      ref={ref}
      className={buttonClassName}
      {...rest}
    >
      {icon && iconPosition === 'left' && (
        <Icon name={icon} size={iconSize} color={iconColor} className="mr-[12px]" />
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <Icon name={icon} size={iconSize} color={iconColor} className="ml-[12px]" />
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
