import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconWork = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#FFB800"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.996 19.995V4a2 2 0 0 0-2-2H9.999a2 2 0 0 0-2 2v15.996"
    />
    <Path
      stroke="#FFB800"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19.995 5.999H4a2 2 0 0 0-2 2v9.997a2 2 0 0 0 2 2h15.996a2 2 0 0 0 2-2V7.998a2 2 0 0 0-2-2"
    />
  </Svg>
);
export default SvgIconWork;
