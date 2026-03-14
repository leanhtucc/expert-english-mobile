import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconListen = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 18 18" {...props}>
    <Path
      fill="#fff"
      d="M11 17.5v-2.05q2.25-.65 3.625-2.5T16 8.75t-1.375-4.2T11 2.05V0q3.1.7 5.05 3.138T18 8.75t-1.95 5.613T11 17.5M0 11.775v-6h4l5-5v16l-5-5zm11 1v-8.05a4.15 4.15 0 0 1 1.838 1.65q.662 1.1.662 2.4 0 1.275-.662 2.362A4.17 4.17 0 0 1 11 12.776m-4-7.15-2.15 2.15H2v2h2.85L7 11.925zm-2.5 3.15"
    />
  </Svg>
);
export default SvgIconListen;
