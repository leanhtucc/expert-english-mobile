import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconItSoftware = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 16" {...props}>
    <Path
      fill="#C8102E"
      d="M2 16q-.824 0-1.412-.588A1.93 1.93 0 0 1 0 14V2Q0 1.176.588.588A1.93 1.93 0 0 1 2 0h16q.824 0 1.413.588Q20 1.175 20 2v12q0 .825-.587 1.412A1.93 1.93 0 0 1 18 16zm0-2h16V4H2zm3.5-1-1.4-1.4L6.675 9l-2.6-2.6L5.5 5l4 4zm4.5 0v-2h6v2z"
    />
  </Svg>
);
export default SvgIconItSoftware;
