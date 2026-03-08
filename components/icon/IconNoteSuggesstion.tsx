import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconNoteSuggesstion = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 15 14" {...props}>
    <Path
      fill="#C8102E"
      d="M0 8.333V6.667h5.833v1.666zM0 5V3.333h9.167V5zm0-3.333V0h9.167v1.667zm7.5 11.666v-2.562l4.604-4.584q.188-.187.417-.27t.458-.084a1.25 1.25 0 0 1 .896.375l.77.771q.168.188.261.417a1.2 1.2 0 0 1 .094.458q0 .23-.083.469-.084.24-.271.427l-4.584 4.583zm6.25-5.479-.77-.77zm-5 4.23h.792l2.52-2.542-.374-.396-.396-.375-2.542 2.52zm2.938-2.937-.396-.375.77.77z"
    />
  </Svg>
);
export default SvgIconNoteSuggesstion;
