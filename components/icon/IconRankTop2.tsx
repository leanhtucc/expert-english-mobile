import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconRankTop2 = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 16 21" {...props}>
    <Path
      fill="#94A3B8"
      d="m5.675 11.7.875-2.85L4.25 7H7.1L8 4.2 8.9 7h2.85L9.425 8.85l.875 2.85L8 9.925zM2 21v-7.725a7.7 7.7 0 0 1-1.475-2.4A7.9 7.9 0 0 1 0 8q0-3.35 2.325-5.675T8 0t5.675 2.325T16 8a7.9 7.9 0 0 1-.525 2.875q-.525 1.35-1.475 2.4V21l-6-2zm6-7q2.5 0 4.25-1.75T14 8t-1.75-4.25T8 2 3.75 3.75 2 8t1.75 4.25T8 14m-4 4.025L8 17l4 1.025v-3.1a8.4 8.4 0 0 1-1.887.787A7.7 7.7 0 0 1 8 16a7.7 7.7 0 0 1-2.112-.287A8.4 8.4 0 0 1 4 14.925zm4-1.55"
    />
  </Svg>
);
export default SvgIconRankTop2;
