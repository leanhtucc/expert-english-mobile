import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconStreakProfile = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 16 18" {...props}>
    <Path
      fill="#EA580C"
      d="M8.016 10.124 6 12.14c-.469.469-.844 1.031-.937 1.64-.329 1.875 1.125 3.47 2.953 3.47s3.28-1.595 2.953-3.423c-.094-.656-.469-1.218-.938-1.687zm3.562-6.328c-1.172 1.453-3.562.61-3.562-1.266V.984A.975.975 0 0 0 6.469.187C4.125 1.734 0 5.202 0 10.217c0 2.954 1.594 5.485 3.89 6.892a5.04 5.04 0 0 1-.796-3.704c.187-1.03.75-1.968 1.5-2.718l2.718-2.672a1.02 1.02 0 0 1 1.407 0l2.719 2.719c.75.703 1.312 1.64 1.5 2.671a4.92 4.92 0 0 1-.797 3.657c1.922-1.172 3.328-3.047 3.703-5.297.61-3.281-.797-6.375-3.188-8.11a.804.804 0 0 0-1.078.141"
    />
  </Svg>
);
export default SvgIconStreakProfile;
