import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const SvgIconPencilLine = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <G
      stroke="#686868"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <Path d="M20.25 20.25H9l-5.202-5.202M15.375 8.625l-9 9" />
      <Path d="M9 20.25H4.5a.75.75 0 0 1-.75-.75v-4.19a.75.75 0 0 1 .22-.53L15.53 3.22a.75.75 0 0 1 1.06 0l4.19 4.186a.75.75 0 0 1 0 1.06zM12.75 6 18 11.25" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgIconPencilLine;
