import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconHome = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 42 42" {...props}>
    <Path
      fill="#65DAFF"
      d="M33.893 32.674c.769-1.594-1.208-12.244-2.169-15.677l-10.923-6.908-10.945 6.908c-.96 3.433-2.988 14.083-2.22 15.677C8.598 34.668 9.879 35 11.16 35h19.212c1.28 0 2.562-.332 3.522-2.326"
    />
    <Path
      fill="#FF0034"
      d="M20.781 7a2.76 2.76 0 0 1 1.666.53l13.278 9.672a2.78 2.78 0 0 1 .611 3.877 2.77 2.77 0 0 1-3.873.613l-10.99-8.005a1.2 1.2 0 0 0-1.413 0L9.07 21.692a2.77 2.77 0 0 1-3.873-.613 2.78 2.78 0 0 1 .611-3.877L19.087 7.53A2.76 2.76 0 0 1 20.752 7z"
    />
    <Path fill="#009EF9" d="M16.567 30.8a4.2 4.2 0 1 1 8.4 0V35h-8.4z" />
    <Rect width={11.2} height={4.2} x={15.167} y={20.3} fill="#007DC6" rx={2.1} />
  </Svg>
);
export default SvgIconHome;
