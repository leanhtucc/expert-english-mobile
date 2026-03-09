import React from 'react';
import { Image, View } from 'react-native';

interface ImageQuestionProps {
  imageUrl: string;
  className?: string;
}

export const ImageQuestion: React.FC<ImageQuestionProps> = ({ imageUrl, className = '' }) => {
  return (
    <View className={`w-full overflow-hidden rounded-2xl bg-white shadow-sm ${className}`}>
      <View className="aspect-square">
        <Image source={{ uri: imageUrl }} className="h-full w-full" resizeMode="cover" />
      </View>

      {/* Decorative gradient overlay */}
      <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
    </View>
  );
};
