import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

type Props = SvgProps & { iconColor?: string };

const SvgIconBackButton = ({ iconColor = '#0F172A', ...props }: Props) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 12 20" {...props}>
    <Path fill={iconColor} d="M10 20 0 10 10 0l1.775 1.775L3.55 10l8.225 8.225z" />
  </Svg>
);
export default SvgIconBackButton;
