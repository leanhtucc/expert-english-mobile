import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconBackLession = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 14 14" {...props}>
    <Path
      fill="#334155"
      d="M1.4 14 0 12.6 5.6 7 0 1.4 1.4 0 7 5.6 12.6 0 14 1.4 8.4 7l5.6 5.6-1.4 1.4L7 8.4z"
    />
  </Svg>
);
export default SvgIconBackLession;
