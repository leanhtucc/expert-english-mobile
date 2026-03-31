import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconVoiceVocab = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 15 15" {...props}>
    <Path
      fill="#C6102E"
      d="M9.167 14.583v-1.708q1.875-.542 3.02-2.083t1.146-3.5q0-1.96-1.146-3.5-1.145-1.542-3.02-2.084V0q2.583.583 4.208 2.615T15 7.292t-1.625 4.677q-1.625 2.03-4.208 2.614M0 9.813v-5h3.333L7.5.646v13.333L3.333 9.813zm9.167.833V3.937a3.46 3.46 0 0 1 1.53 1.376q.553.915.553 2 0 1.062-.552 1.968a3.48 3.48 0 0 1-1.531 1.365M5.833 4.687 4.042 6.48H1.667v1.667h2.375l1.791 1.791zM3.75 7.313"
    />
  </Svg>
);
export default SvgIconVoiceVocab;
