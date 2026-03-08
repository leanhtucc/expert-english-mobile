import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconReminderBell = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 21" {...props}>
    <Path
      fill="#C8102E"
      d="M0 8.05q0-2.5 1.113-4.587A10.16 10.16 0 0 1 4.1 0l1.175 1.6a8.1 8.1 0 0 0-2.387 2.775Q2 6.051 2 8.05zm18 0q0-2-.887-3.675A8.1 8.1 0 0 0 14.725 1.6L15.9 0q1.875 1.374 2.987 3.463Q20 5.55 20 8.05zm-16 9v-2h2v-7q0-2.075 1.25-3.688T8.5 2.25v-.7q0-.625.438-1.062A1.45 1.45 0 0 1 10 .05q.624 0 1.063.438.437.436.437 1.062v.7q2 .5 3.25 2.113T16 8.05v7h2v2zm8 3q-.825 0-1.412-.588A1.93 1.93 0 0 1 8 18.05h4q0 .825-.588 1.412A1.93 1.93 0 0 1 10 20.05m-4-5h8v-7q0-1.65-1.175-2.825T10 4.05 7.175 5.225 6 8.05z"
    />
  </Svg>
);
export default SvgIconReminderBell;
