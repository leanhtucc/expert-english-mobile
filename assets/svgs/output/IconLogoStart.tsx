import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconLogoStart = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 36 33" {...props}>
    <Path
      fill="#fff"
      d="m16.463 32.55 6.9-19.725H29.1L36 32.55h-5.062l-1.013-3h-7.463l-1.012 3zM5.4 28.388 2.062 25.05l7.35-7.35q-1.687-1.762-2.85-3.469a19.6 19.6 0 0 1-1.912-3.506h5.325q.45.862 1.162 1.763.713.9 1.613 1.875 1.163-1.312 2.325-3.226 1.163-1.912 1.725-3.412H0V3h10.5V0h4.725v3h10.5v4.725H21.9q-.862 2.513-2.494 5.325-1.63 2.813-3.393 4.688l1.8 1.837-1.763 4.988-3.375-3.45zM23.925 25.2h4.5l-2.25-6.675z"
    />
  </Svg>
);
export default SvgIconLogoStart;
