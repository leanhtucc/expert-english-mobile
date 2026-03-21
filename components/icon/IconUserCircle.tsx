import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const SvgIconUserCircle = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 40 40" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#FF3B30"
        d="M26.875 18.75A6.875 6.875 0 1 1 20 11.875a6.883 6.883 0 0 1 6.875 6.875M36.25 20A16.25 16.25 0 1 1 20 3.75 16.267 16.267 0 0 1 36.25 20m-2.5 0A13.764 13.764 0 0 0 19.458 6.26c-7.36.285-13.228 6.415-13.208 13.78a13.7 13.7 0 0 0 3.475 9.087 12.5 12.5 0 0 1 3.4-3.33.625.625 0 0 1 .755.05 9.35 9.35 0 0 0 12.23 0 .625.625 0 0 1 .756-.05 12.5 12.5 0 0 1 3.404 3.33A13.7 13.7 0 0 0 33.75 20"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h40v40H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgIconUserCircle;
