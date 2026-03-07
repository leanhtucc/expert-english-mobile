import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconEmail = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#C8102E"
      d="M19 8a2.9 2.9 0 0 1-2.125-.875A2.9 2.9 0 0 1 16 5q0-1.25.875-2.125A2.9 2.9 0 0 1 19 2q1.25 0 2.125.875T22 5t-.875 2.125A2.9 2.9 0 0 1 19 8M4 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 2 18V6q0-.824.587-1.412A1.93 1.93 0 0 1 4 4h10.1a5.1 5.1 0 0 0 0 2 5.1 5.1 0 0 0 1.55 2.7L12 11 4 6v2l8 5 5.275-3.3q.425.15.85.225T19 10a5.1 5.1 0 0 0 1.575-.25A4.7 4.7 0 0 0 22 9v9q0 .824-.587 1.413A1.93 1.93 0 0 1 20 20z"
    />
  </Svg>
);
export default SvgIconEmail;
