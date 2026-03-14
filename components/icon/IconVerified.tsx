import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconVerified = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 15 14" {...props}>
    <Path
      fill="#fff"
      d="M5.067 14 3.8 11.867l-2.4-.534.233-2.466L0 7l1.633-1.867L1.4 2.667l2.4-.534L5.067 0l2.266.967L9.6 0l1.267 2.133 2.4.534-.234 2.466L14.667 7l-1.634 1.867.234 2.466-2.4.534L9.6 14l-2.267-.967zm.566-1.7 1.7-.733 1.734.733.933-1.6 1.833-.433-.166-1.867L12.9 7l-1.233-1.433.166-1.867L10 3.3l-.967-1.6-1.7.733L5.6 1.7l-.933 1.6-1.834.4L3 5.567 1.767 7 3 8.4l-.167 1.9 1.834.4zm1-2.933L10.4 5.6l-.933-.967-2.834 2.834-1.433-1.4L4.267 7z"
    />
  </Svg>
);
export default SvgIconVerified;
