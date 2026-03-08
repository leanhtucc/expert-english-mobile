import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconAttachments = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 11 17" {...props}>
    <Path
      fill="#475569"
      d="M10.417 11.458q0 2.167-1.521 3.688-1.52 1.52-3.688 1.52-2.166 0-3.687-1.52T0 11.458V3.75q0-1.563 1.094-2.656Q2.187 0 3.75 0t2.656 1.094Q7.501 2.187 7.5 3.75v7.292q0 .958-.667 1.625a2.2 2.2 0 0 1-1.625.666q-.958 0-1.625-.666a2.2 2.2 0 0 1-.666-1.625V3.333h1.666v7.709a.607.607 0 0 0 .625.625.607.607 0 0 0 .625-.625V3.75a2.1 2.1 0 0 0-.614-1.48 1.98 1.98 0 0 0-1.469-.603q-.874 0-1.48.604a2.01 2.01 0 0 0-.603 1.479v7.708q-.021 1.48 1.02 2.51Q3.73 15 5.209 15q1.459 0 2.48-1.031 1.02-1.032 1.062-2.51V3.332h1.667z"
    />
  </Svg>
);
export default SvgIconAttachments;
