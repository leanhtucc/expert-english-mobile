import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconVoice = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 13 18" {...props}>
    <Path
      fill="#C8102E"
      d="M6.417 11a2.65 2.65 0 0 1-1.948-.802 2.65 2.65 0 0 1-.802-1.948v-5.5q0-1.146.802-1.948A2.65 2.65 0 0 1 6.417 0q1.146 0 1.948.802t.802 1.948v5.5q0 1.146-.802 1.948A2.65 2.65 0 0 1 6.417 11M5.5 17.417v-2.82q-2.383-.32-3.942-2.13Q0 10.657 0 8.25h1.833q0 1.902 1.341 3.243t3.243 1.34 3.242-1.34T11 8.25h1.833q0 2.406-1.558 4.217t-3.942 2.13v2.82zm.917-8.25q.39 0 .653-.264a.89.89 0 0 0 .263-.653v-5.5a.89.89 0 0 0-.263-.653.89.89 0 0 0-.653-.264.89.89 0 0 0-.653.264.89.89 0 0 0-.264.653v5.5q0 .39.264.653a.89.89 0 0 0 .653.264"
    />
  </Svg>
);
export default SvgIconVoice;
