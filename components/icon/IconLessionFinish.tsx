import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';

const SvgIconLessionFinish = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="#C6102E"
      d="M10 20a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137Q1.575 15.725.788 13.9A9.7 9.7 0 0 1 0 10q0-2.074.788-3.9a10.1 10.1 0 0 1 2.137-3.175Q4.275 1.575 6.1.788A9.7 9.7 0 0 1 10 0q1.625 0 3.075.475T15.75 1.8L14.3 3.275a8.6 8.6 0 0 0-2.025-.937A7.6 7.6 0 0 0 10 2Q6.675 2 4.338 4.338 2 6.675 2 10t2.338 5.663T10 18t5.663-2.338Q18 13.326 18 10q0-.45-.05-.9a7 7 0 0 0-.15-.875L19.425 6.6q.275.8.425 1.65T20 10a9.7 9.7 0 0 1-.788 3.9 10.1 10.1 0 0 1-2.137 3.175q-1.35 1.35-3.175 2.137A9.7 9.7 0 0 1 10 20m-1.4-5.4-4.25-4.25 1.4-1.4L8.6 11.8l10-10.025 1.4 1.4z"
    />
  </Svg>
);
export default SvgIconLessionFinish;
