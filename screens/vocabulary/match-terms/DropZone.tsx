import React from 'react';
import { Text, View } from 'react-native';

interface DropZoneProps {
  label: string;
  isEmpty: boolean;
  children?: React.ReactNode;
}

export const DropZone: React.FC<DropZoneProps> = ({ label, isEmpty, children }) => {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-sm font-semibold text-gray-600">{label}</Text>

      <View
        className={` ${isEmpty ? 'border-2 border-dashed border-gray-300' : ''} ${isEmpty ? 'min-h-[100px]' : ''} rounded-2xl ${isEmpty ? 'bg-gray-50' : ''} `}
      >
        {isEmpty ? (
          <View className="flex-1 items-center justify-center p-4">
            <Text className="text-center text-sm text-gray-400">Tap items to match</Text>
          </View>
        ) : (
          children
        )}
      </View>
    </View>
  );
};
