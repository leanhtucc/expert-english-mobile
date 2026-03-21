import React from 'react';
import { Image, View } from 'react-native';

interface ImageQuestionProps {
  imageUrl: string;
  className?: string;
}

export const ImageQuestion: React.FC<ImageQuestionProps> = ({ imageUrl, className = '' }) => {
  return (
    <View className={`w-full items-center overflow-hidden rounded-[24px] ${className}`}>
      <Image
        source={{ uri: imageUrl }}
        className="h-[200px] w-full bg-slate-200"
        resizeMode="cover"
      />
    </View>
  );
};
