import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconCertificateRenew = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 18 20" {...props}>
    <Path
      fill="#906F6E"
      fillOpacity={0.3}
      d="m6.7 16.7-1.4-1.4L7.6 13l-2.3-2.3 1.4-1.4L9 11.6l2.3-2.3 1.4 1.4-2.3 2.3 2.3 2.3-1.4 1.4L9 14.4zM2 20q-.824 0-1.412-.587A1.93 1.93 0 0 1 0 18V4q0-.824.588-1.412A1.93 1.93 0 0 1 2 2h1V0h2v2h8V0h2v2h1q.824 0 1.413.587Q18 3.176 18 4v14q0 .824-.587 1.413A1.93 1.93 0 0 1 16 20zm0-2h14V8H2zM2 6h14V4H2zm0 0V4z"
    />
  </Svg>
);
export default SvgIconCertificateRenew;
