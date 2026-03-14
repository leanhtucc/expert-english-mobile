import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';

const SvgIconSignOut = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 18 18" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#C6102E"
        d="M8.438 15.188a.56.56 0 0 1-.563.562h-4.5a.563.563 0 0 1-.562-.562V2.813a.563.563 0 0 1 .562-.563h4.5a.563.563 0 1 1 0 1.125H3.938v11.25h3.937a.563.563 0 0 1 .563.563m7.71-6.586L13.336 5.79a.563.563 0 0 0-.961.397v2.25h-4.5a.563.563 0 1 0 0 1.126h4.5v2.25a.562.562 0 0 0 .96.397l2.813-2.812a.56.56 0 0 0 0-.796"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgIconSignOut;
