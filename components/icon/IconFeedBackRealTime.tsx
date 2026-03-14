import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconFeedBackRealTime = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 14 14" {...props}>
    <Path
      fill="#C6102E"
      d="M3 10.5h1.5V6.75H3zm6 0h1.5V3H9zm-3 0h1.5V8.25H6zm0-3.75h1.5v-1.5H6zM1.5 13.5q-.62 0-1.06-.44A1.45 1.45 0 0 1 0 12V1.5Q0 .88.44.44T1.5 0H12q.619 0 1.06.44.44.44.44 1.06V12q0 .619-.44 1.06-.442.44-1.06.44zm0-1.5H12V1.5H1.5zm0-10.5V12z"
    />
  </Svg>
);
export default SvgIconFeedBackRealTime;
