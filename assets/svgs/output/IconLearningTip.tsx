import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconLearningTip = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 13 17" {...props}>
    <Path
      fill="#C8102E"
      d="M6.25 16.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 4.583 15h3.334q0 .687-.49 1.177t-1.177.49m-3.333-2.5V12.5h6.666v1.667zm.208-2.5A6.4 6.4 0 0 1 .844 9.375Q0 7.938 0 6.25q0-2.604 1.823-4.427T6.25 0t4.427 1.823T12.5 6.25a6.06 6.06 0 0 1-.844 3.125 6.4 6.4 0 0 1-2.281 2.292zm.5-1.667h5.25a4.6 4.6 0 0 0 1.448-1.646q.51-.98.51-2.104 0-1.917-1.333-3.25T6.25 1.667 3 3 1.667 6.25q0 1.125.51 2.104T3.625 10m2.625 0"
    />
  </Svg>
);
export default SvgIconLearningTip;
