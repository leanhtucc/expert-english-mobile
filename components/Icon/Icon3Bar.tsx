import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIcon3Bar = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 32 20" {...props}>
    <Path
      fill="#FFB800"
      d="M0 15.987a4 4 0 0 0 7.998 0v-3.99a4 4 0 1 0-7.998 0zM11.988 15.987a4 4 0 0 0 7.998 0V7.989a4 4 0 0 0-7.998 0zM23.976 15.987a4 4 0 0 0 7.998 0V3.999a4 4 0 1 0-7.998 0z"
    />
  </Svg>
);
export default SvgIcon3Bar;
