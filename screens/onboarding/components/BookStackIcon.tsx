import React from 'react';
import { View } from 'react-native';
import Svg, { G, Path, Rect } from 'react-native-svg';

interface BookStackIconProps {
  width?: number;
  height?: number;
}

/**
 * BookStackIcon Component
 * Renders a stack of colorful books as an SVG icon
 * Used in the onboarding screen header
 */
const BookStackIcon: React.FC<BookStackIconProps> = ({ width = 120, height = 100 }) => {
  return (
    <View className="items-center justify-center" style={{ width, height }}>
      <Svg width={width} height={height} viewBox="0 0 120 100">
        {/* Bottom book - Blue */}
        <G>
          <Rect x="15" y="70" width="90" height="20" rx="3" fill="#2196F3" />
          <Rect x="15" y="70" width="90" height="3" rx="1" fill="#1976D2" />
          <Rect x="15" y="70" width="8" height="20" rx="2" fill="#1565C0" />
        </G>

        {/* Middle book - Red */}
        <G transform="rotate(-5, 60, 55)">
          <Rect x="20" y="48" width="80" height="18" rx="3" fill="#F44336" />
          <Rect x="20" y="48" width="80" height="3" rx="1" fill="#D32F2F" />
          <Rect x="20" y="48" width="6" height="18" rx="2" fill="#C62828" />
        </G>

        {/* Top book - Green */}
        <G transform="rotate(8, 60, 35)">
          <Rect x="25" y="28" width="70" height="16" rx="3" fill="#4CAF50" />
          <Rect x="25" y="28" width="70" height="3" rx="1" fill="#388E3C" />
          <Rect x="25" y="28" width="5" height="16" rx="2" fill="#2E7D32" />
        </G>

        {/* Small accent book - Yellow/Orange */}
        <G transform="rotate(15, 85, 20)">
          <Path d="M75 12 L95 8 L100 28 L80 32 Z" fill="#FF9800" />
          <Path d="M75 12 L95 8 L95 11 L75 15 Z" fill="#F57C00" />
        </G>
      </Svg>
    </View>
  );
};

export default BookStackIcon;
