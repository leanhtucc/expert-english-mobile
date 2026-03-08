import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconLoadingBuildCourse = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 12 12" {...props}>
    <Path
      fill="#C6102E"
      d="M0 12v-1.5h2.063l-.3-.262q-.975-.863-1.37-1.97A6.6 6.6 0 0 1 0 6.039q0-2.081 1.247-3.704Q2.494.714 4.5.188v1.575q-1.35.488-2.175 1.659A4.44 4.44 0 0 0 1.5 6.037q0 .845.319 1.641.318.797.994 1.472L3 9.338V7.5h1.5V12zm7.5-.187v-1.575a4.45 4.45 0 0 0 2.175-1.66q.825-1.172.825-2.615a4.4 4.4 0 0 0-.319-1.641 4.4 4.4 0 0 0-.993-1.472L9 2.663V4.5H7.5V0H12v1.5H9.938l.3.262q.918.92 1.34 1.997Q12 4.84 12 5.963q0 2.08-1.247 3.703-1.246 1.621-3.253 2.146"
    />
  </Svg>
);
export default SvgIconLoadingBuildCourse;
