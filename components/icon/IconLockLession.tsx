import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconLockLession = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 11 14" {...props}>
    <Path
      fill="#94A3B8"
      d="M1.333 14q-.55 0-.941-.392A1.28 1.28 0 0 1 0 12.667V6q0-.55.392-.942.391-.39.941-.391H2V3.333Q2 1.95 2.975.975A3.21 3.21 0 0 1 5.333 0q1.384 0 2.359.975t.975 2.358v1.334h.666q.55 0 .942.391t.392.942v6.667q0 .55-.392.941a1.28 1.28 0 0 1-.942.392zm0-1.333h8V6h-8zm4-2q.55 0 .942-.392.392-.391.392-.942t-.392-.941A1.28 1.28 0 0 0 5.333 8q-.55 0-.941.392A1.28 1.28 0 0 0 4 9.333q0 .55.392.942.391.392.941.392m-2-6h4V3.333q0-.833-.583-1.416a1.93 1.93 0 0 0-1.417-.584q-.832 0-1.416.584a1.93 1.93 0 0 0-.584 1.416zm-2 8V6z"
    />
  </Svg>
);
export default SvgIconLockLession;
