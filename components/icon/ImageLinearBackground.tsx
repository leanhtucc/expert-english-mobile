import * as React from 'react';
import Svg, { ClipPath, Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgImageLinearBackground = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 390 331" {...props}>
    <G clipPath="url(#a)">
      <Path fill="url(#b)" d="M0 0h390v331H0z" />
      <Path
        fill="#C6102E"
        d="m298.25 118.5 25-70 45 45zm16.5-16.5L350 89.5l-22.75-22.75zM361 71.25 355.75 66l28-28q4-4 9.625-4T403 38l3 3-5.25 5.25-3-3q-1.75-1.75-4.375-1.75T389 43.25zm-20-20L335.75 46l3-3q1.75-1.75 1.75-4.25t-1.75-4.25l-3.25-3.25 5.25-5.25 3.25 3.25q4 4 4 9.5t-4 9.5zm10 10L345.75 56l18-18q1.75-1.75 1.75-4.375t-1.75-4.375l-8-8L361 16l8 8q4 4 4 9.625t-4 9.625zm20 20L365.75 76l8-8q4-4 9.625-4T393 68l8 8-5.25 5.25-8-8q-1.75-1.75-4.375-1.75T379 73.25zM314.75 102"
        opacity={0.2}
      />
    </G>
    <Defs>
      <LinearGradient id="b" x1={195} x2={195} y1={0} y2={331} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#C6102E" stopOpacity={0.1} />
        <Stop offset={1} stopColor="#C6102E" stopOpacity={0.02} />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h390v331H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgImageLinearBackground;
