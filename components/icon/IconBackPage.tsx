import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

type Props = SvgProps & { iconColor?: string };

const SvgIconBackPage = ({ iconColor = '#0F172A', ...props }: Props) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 16 16" {...props}>
    <Path fill={iconColor} d="m3.825 9 5.6 5.6L8 16 0 8l8-8 1.425 1.4-5.6 5.6H16v2z" />
  </Svg>
);
export default SvgIconBackPage;
