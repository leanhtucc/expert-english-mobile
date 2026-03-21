import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconNextButtonBlack = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 16 16" {...props}>
    <Path fill="#fff" d="M12.175 9H0V7h12.175l-5.6-5.6L8 0l8 8-8 8-1.425-1.4z" />
  </Svg>
);
export default SvgIconNextButtonBlack;
