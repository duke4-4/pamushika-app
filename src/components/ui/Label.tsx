import React from 'react';
import { Text, TextProps } from 'react-native';

interface LabelProps extends TextProps {
  className?: string;
}

export function Label({ className = '', children, ...props }: LabelProps) {
  return (
    <Text className={`text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </Text>
  );
}
 