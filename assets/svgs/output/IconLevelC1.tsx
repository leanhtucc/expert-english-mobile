import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconLevelC1 = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 30 28" {...props}>
    <Rect width={6} height={12} y={16} fill="#C8102E" rx={3} />
    <Rect width={6} height={16} x={8} y={12} fill="#C8102E" rx={3} />
    <Rect width={6} height={20} x={16} y={8} fill="#C8102E" rx={3} />
    <Rect width={6} height={24} x={24} y={4} fill="#E2E8F0" rx={3} />
  </Svg>
);
export default SvgIconLevelC1;
