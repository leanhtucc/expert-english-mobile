import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconCheckCourse = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 13 10" {...props}>
    <Path fill="#fff" d="M4.275 9.019 0 4.744l1.069-1.069 3.206 3.206L11.156 0l1.069 1.069z" />
  </Svg>
);
export default SvgIconCheckCourse;
