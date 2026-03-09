import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconXp = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill="#F59E0B"
      d="M9.984 0A9.963 9.963 0 0 0 0 9.984a9.963 9.963 0 0 0 9.984 9.985 9.963 9.963 0 0 0 9.985-9.985A9.963 9.963 0 0 0 9.984 0m3.235 15.375-3.235-1.922-3.234 1.922c-.375.234-.844-.094-.75-.562l.844-3.657L4.03 8.72c-.328-.281-.14-.844.282-.89l3.75-.282 1.453-3.469a.505.505 0 0 1 .937 0L11.906 7.5l3.75.328c.422.047.61.61.281.89l-2.859 2.438.844 3.656c.14.47-.328.797-.703.563"
    />
  </Svg>
);
export default SvgIconXp;
