import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

const SvgIconError = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Rect width={24} height={24} fill="url(#icon_error_svg__a)" rx={6} />
    <Path stroke="#fff" strokeLinecap="round" strokeWidth={1.5} d="m15 9-6 6m0-6 6 6" />
    <Defs>
      <LinearGradient
        id="icon_error_svg__a"
        x1={12}
        x2={12}
        y1={0}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E88B76" />
        <Stop offset={1} stopColor="#CA5048" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgIconError;
