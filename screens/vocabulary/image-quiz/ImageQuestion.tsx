import React from 'react';
import { Image, View } from 'react-native';

interface ImageQuestionProps {
  imageUrl: string;
  className?: string;
}

export const ImageQuestion: React.FC<ImageQuestionProps> = ({ imageUrl, className = '' }) => {
  return (
    <View
      className={`w-full items-center overflow-hidden rounded-2xl bg-white shadow-sm ${className}`}
      style={{ marginVertical: 16 }}
    >
      <View style={{ width: '60%', height: 200 }}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: '100%', height: '100%', borderRadius: 16 }}
          resizeMode="cover"
        />
      </View>

      {/* Decorative gradient overlay */}
      <View className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
    </View>
  );
};
