import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconXpRed = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 78 17" {...props}>
    <Path
      fill="#C6102E"
      d="M0 0h8.333v6.542q0 .48-.208.854-.208.375-.583.604L4.583 9.75l.584 1.917h3.166L5.75 13.5l1 3.167-2.583-1.959-2.584 1.959 1-3.167L0 11.667h3.167L3.75 9.75.792 8a1.6 1.6 0 0 1-.584-.604A1.73 1.73 0 0 1 0 6.542zm1.667 1.667v4.875l1.666 1V1.667zm5 0H5v5.875l1.667-1z"
    />
  </Svg>
);
export default SvgIconXpRed;
