import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconGoogle = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="#4285F4"
      d="M18.8 10.208q-.002-.975-.167-1.875H10v3.55h4.933a4.23 4.23 0 0 1-1.841 2.759v2.308h2.975C17.8 15.35 18.8 13 18.8 10.208"
    />
    <Path
      fill="#34A853"
      d="M10 19.167c2.475 0 4.55-.817 6.067-2.217l-2.975-2.308c-.817.55-1.859.883-3.092.883-2.383 0-4.408-1.608-5.133-3.775h-3.05v2.367c1.508 2.991 4.6 5.05 8.183 5.05"
    />
    <Path
      fill="#FBBC05"
      d="M4.867 11.742A5.5 5.5 0 0 1 4.575 10c0-.608.108-1.192.292-1.742V5.892h-3.05A9.05 9.05 0 0 0 .833 10c0 1.483.359 2.875.984 4.108z"
    />
    <Path
      fill="#EA4335"
      d="M10 4.483c1.35 0 2.55.467 3.508 1.384l2.625-2.625C14.542 1.742 12.475.833 10 .833c-3.583 0-6.675 2.059-8.183 5.059l3.05 2.366c.725-2.166 2.75-3.775 10-3.775z"
    />
  </Svg>
);
export default SvgIconGoogle;
