import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <TextInput
      className={`h-14 rounded-xl border border-gray-300 text-base px-4 bg-white ${className}`}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
}
