import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconscoring = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 18" {...props}>
    <Path fill="#C6102E" d="M2 16h4V8H2zm6 0h4V2H8zm6 0h4v-6h-4zM0 18V6h6V0h8v8h6v10z" />
  </Svg>
);
export default SvgIconscoring;
