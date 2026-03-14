import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconCertificates = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="#3B82F6"
      d="M18 0H1.969A1.98 1.98 0 0 0 0 1.969v11.015C0 14.11.89 15 1.969 15H6v4.969L9.984 18l3.985 1.969V15H18c1.078 0 1.969-.89 1.969-2.016V1.97A1.98 1.98 0 0 0 18 0m0 12.984H1.969V10.97H18zm0-5.015H1.969V3A1.04 1.04 0 0 1 3 1.969h13.969A1.04 1.04 0 0 1 18 3z"
    />
  </Svg>
);
export default SvgIconCertificates;
