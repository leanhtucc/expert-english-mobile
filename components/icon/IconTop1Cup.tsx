import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconTop1Cup = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 23 23" {...props}>
    <Path
      fill="#EAB308"
      d="M5 22.5V20h5v-3.875a6.7 6.7 0 0 1-2.734-1.297 5.6 5.6 0 0 1-1.766-2.39q-2.343-.282-3.922-2.047Q0 8.625 0 6.25V5q0-1.03.734-1.766A2.4 2.4 0 0 1 2.5 2.5H5V0h12.5v2.5H20q1.032 0 1.766.734Q22.5 3.97 22.5 5v1.25q0 2.375-1.578 4.14-1.578 1.767-3.922 2.047a5.6 5.6 0 0 1-1.766 2.391 6.7 6.7 0 0 1-2.734 1.297V20h5v2.5zM5 9.75V5H2.5v1.25q0 1.188.688 2.14A3.75 3.75 0 0 0 5 9.75m6.25 4q1.563 0 2.656-1.094Q15.001 11.563 15 10V2.5H7.5V10q0 1.563 1.094 2.656 1.093 1.095 2.656 1.094m6.25-4a3.75 3.75 0 0 0 1.813-1.36A3.57 3.57 0 0 0 20 6.25V5h-2.5zm-6.25-1.625"
    />
  </Svg>
);
export default SvgIconTop1Cup;
