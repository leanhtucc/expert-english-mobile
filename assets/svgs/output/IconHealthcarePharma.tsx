import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconHealthcarePharma = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="#64748B"
      d="M2 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 0 18V6q0-.824.588-1.412A1.93 1.93 0 0 1 2 4h4V2q0-.824.588-1.412A1.93 1.93 0 0 1 8 0h4q.825 0 1.412.588Q14 1.175 14 2v2h4q.824 0 1.413.588Q20 5.175 20 6v12q0 .824-.587 1.413A1.93 1.93 0 0 1 18 20zm0-2h16V6H2zM8 4h4V2H8zM2 18V6zm7-5v3h2v-3h3v-2h-3V8H9v3H6v2z"
    />
  </Svg>
);
export default SvgIconHealthcarePharma;
