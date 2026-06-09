import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
  className?: string;
  textClassName?: string;
}

export function Button({ children, variant = 'default', className = '', textClassName = '', ...props }: ButtonProps) {
  const baseClass = "h-14 rounded-xl flex-row items-center justify-center w-full";
  const variantClass = variant === 'default' 
    ? "bg-green-600 shadow-md" 
    : "border-2 border-green-600 bg-transparent";
    
  const baseTextClass = "text-base font-medium";
  const variantTextClass = variant === 'default'
    ? "text-white"
    : "text-green-600";

  return (
    <TouchableOpacity 
      className={`${baseClass} ${variantClass} ${className}`}
      activeOpacity={0.8}
      {...props}
    >
      <Text className={`${baseTextClass} ${variantTextClass} ${textClassName}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
