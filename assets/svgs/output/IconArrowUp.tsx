import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconArrowUp = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#FFB800"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m21.995 6.998-8.498 8.499-4.999-5L2 16.998"
    />
    <Path
      stroke="#FFB800"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.996 6.998h5.999v5.999"
    />
  </Svg>
);
export default SvgIconArrowUp;
