import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconLevelA2 = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 22 12" {...props}>
    <Rect width={6} height={8} y={4} fill="#C8102E" rx={3} />
    <Rect width={6} height={12} x={8} fill="#C8102E" rx={3} />
    <Rect width={6} height={8} x={16} y={4} fill="#E2E8F0" rx={3} />
  </Svg>
);
export default SvgIconLevelA2;
