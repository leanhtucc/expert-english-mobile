import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconPLay = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 11 13" {...props}>
    <Path
      fill="#fff"
      d="M0 11.35V1Q0 .576.3.288a.98.98 0 0 1 .962-.25q.138.037.263.112l8.15 5.175q.225.15.337.375a1.05 1.05 0 0 1 0 .95.97.97 0 0 1-.337.375L1.525 12.2a1.04 1.04 0 0 1-.525.15.98.98 0 0 1-.7-.287.95.95 0 0 1-.3-.713m2-1.825 5.25-3.35L2 2.825z"
    />
  </Svg>
);
export default SvgIconPLay;
