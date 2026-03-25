import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconRoadmap = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 18 18" {...props}>
    <Path
      fill="#9E001F"
      d="m12 18-6-2.1-4.65 1.8a.9.9 0 0 1-.925-.113A.99.99 0 0 1 0 16.75v-14q0-.325.188-.575A1.13 1.13 0 0 1 .7 1.8L6 0l6 2.1L16.65.3a.9.9 0 0 1 .925.112.99.99 0 0 1 .425.838v14a.93.93 0 0 1-.187.575 1.13 1.13 0 0 1-.513.375zm-1-2.45V3.85l-4-1.4v11.7zm2 0 3-1V2.7l-3 1.15zM2 15.3l3-1.15V2.45l-3 1zM13 3.85v11.7zm-8-1.4v11.7z"
    />
  </Svg>
);
export default SvgIconRoadmap;
