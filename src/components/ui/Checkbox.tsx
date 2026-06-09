import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check } from 'lucide-react-native';

interface CheckboxProps {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({ checked, onCheckedChange }: CheckboxProps) {
  return (
    <TouchableOpacity 
      onPress={() => onCheckedChange(!checked)}
      className={`w-5 h-5 rounded flex items-center justify-center border ${
        checked ? 'bg-green-600 border-green-600' : 'border-gray-300 bg-white'
      }`}
    >
      {checked && <Check width={14} height={14} color="white" />}
    </TouchableOpacity>
  );
}
