import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconRepeat = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 40 40" {...props}>
    <Path
      stroke={props.color || '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M31.881 24.167c-1.696 5.323-6.555 9.166-12.285 9.166-7.14 0-12.93-5.97-12.93-13.333s5.79-13.333 12.93-13.333c4.786 0 8.964 2.68 11.2 6.666M26.869 15h6.464V8.333"
    />
  </Svg>
);
export default SvgIconRepeat;
