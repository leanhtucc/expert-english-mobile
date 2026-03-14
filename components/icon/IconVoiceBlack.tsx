import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconVoiceBlack = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 21 29" {...props}>
    <Path
      fill="#fff"
      d="M10.5 18q-1.875 0-3.187-1.312Q6 15.375 6 13.5v-9q0-1.875 1.313-3.187Q8.625 0 10.5 0t3.188 1.313T15 4.5v9q0 1.875-1.312 3.188Q12.375 18 10.5 18M9 28.5v-4.613q-3.9-.525-6.45-3.487T0 13.5h3q0 3.113 2.194 5.306T10.5 21t5.306-2.194Q18 16.613 18 13.5h3q0 3.938-2.55 6.9T12 23.888V28.5zM10.5 15q.637 0 1.069-.431.43-.432.431-1.069v-9q0-.637-.431-1.069A1.45 1.45 0 0 0 10.5 3q-.637 0-1.069.431A1.45 1.45 0 0 0 9 4.5v9q0 .637.431 1.069.432.43 1.069.431"
    />
  </Svg>
);
export default SvgIconVoiceBlack;
