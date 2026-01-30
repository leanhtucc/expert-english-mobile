import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconStudent = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#FFB800"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21.415 10.92a1 1 0 0 0-.019-1.838l-8.569-3.903a2 2 0 0 0-1.66 0L2.6 9.078a1 1 0 0 0 0 1.832l8.569 3.907a2 2 0 0 0 1.66 0zM21.995 9.998v5.998"
    />
    <Path
      stroke="#FFB800"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.999 12.497v3.5c0 .795.632 1.558 1.757 2.12s2.65.879 4.241.879 3.117-.316 4.242-.879 1.757-1.325 1.757-2.12v-3.5"
    />
  </Svg>
);
export default SvgIconStudent;
