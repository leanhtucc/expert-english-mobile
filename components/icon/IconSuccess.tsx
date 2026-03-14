import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

const SvgIconSuccess = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Rect width={24} height={24} fill="url(#icon_success_svg__a)" rx={6} />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.5 12.5 2 2 5-5"
    />
    <Defs>
      <LinearGradient
        id="icon_success_svg__a"
        x1={12}
        x2={12}
        y1={0}
        y2={24}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#48CA93" />
        <Stop offset={1} stopColor="#48BACA" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgIconSuccess;
