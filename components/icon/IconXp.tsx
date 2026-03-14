import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconXp = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 10 20" {...props}>
    <Path
      fill="#EAB308"
      d="M0 0h10v7.85q0 .575-.25 1.025t-.7.725L5.5 11.7l.7 2.3H10l-3.1 2.2L8.1 20 5 17.65 1.9 20l1.2-3.8L0 14h3.8l.7-2.3L.95 9.6a1.95 1.95 0 0 1-.7-.725Q0 8.425 0 7.85zm2 2v5.85l2 1.2V2zm6 0H6v7.05l2-1.2zM6 5.525"
    />
  </Svg>
);
export default SvgIconXp;
