import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconGraduation = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 13 11" {...props}>
    <Path
      fill="#C6102E"
      d="M6.417 10.5 2.333 8.283v-3.5L0 3.5 6.417 0l6.416 3.5v4.667h-1.166V4.142l-1.167.641v3.5zm0-4.842L10.413 3.5 6.416 1.342 2.42 3.5zm0 3.515 2.916-1.575V5.396L6.417 7 3.5 5.396v2.202zm0-2.202"
    />
  </Svg>
);
export default SvgIconGraduation;
