import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconNextButtonPage = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 8 12" {...props}>
    <Path fill="#94A3B8" d="M4.6 6 0 1.4 1.4 0l6 6-6 6L0 10.6z" />
  </Svg>
);
export default SvgIconNextButtonPage;
