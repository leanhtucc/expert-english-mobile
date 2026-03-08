import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconFiledUser = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 21 20" {...props}>
    <Path
      fill="#C8102E"
      d="M8 8Q6.35 8 5.175 6.825T4 4t1.175-2.825T8 0t2.825 1.175T12 4t-1.175 2.825T8 8m11.1 11.5-3.2-3.2q-.525.3-1.125.5T13.5 17q-1.875 0-3.187-1.312Q9 14.375 9 12.5t1.313-3.187T13.5 8t3.188 1.313T18 12.5q0 .675-.2 1.275t-.5 1.125l3.2 3.2zM13.5 15q1.05 0 1.775-.725T16 12.5t-.725-1.775T13.5 10t-1.775.725T11 12.5t.725 1.775T13.5 15M8.025 9q-1.05 1.55-1.05 3.5t1.05 3.5H0v-2.775q0-.85.425-1.575t1.175-1.1q1.275-.65 2.875-1.1T8.025 9"
    />
  </Svg>
);
export default SvgIconFiledUser;
