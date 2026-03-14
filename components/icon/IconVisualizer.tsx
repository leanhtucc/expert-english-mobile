import * as React from 'react';
import Svg, { Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconVisualizer = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 52 32" {...props}>
    <Rect width={4} height={12} y={10} fill="#C6102E" fillOpacity={0.2} rx={2} />
    <Rect width={4} height={20} x={8} y={6} fill="#C6102E" fillOpacity={0.4} rx={2} />
    <Rect width={4} height={32} x={16} fill="#C6102E" fillOpacity={0.6} rx={2} />
    <Rect width={4} height={16} x={24} y={8} fill="#C6102E" rx={2} />
    <Rect width={4} height={28} x={32} y={2} fill="#C6102E" fillOpacity={0.6} rx={2} />
    <Rect width={4} height={20} x={40} y={6} fill="#C6102E" fillOpacity={0.4} rx={2} />
    <Rect width={4} height={12} x={48} y={10} fill="#C6102E" fillOpacity={0.2} rx={2} />
  </Svg>
);
export default SvgIconVisualizer;
