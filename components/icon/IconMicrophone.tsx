import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

type IconMicrophoneProps = SvgProps & {
  /** Màu icon (mặc định xanh dương như thiết kế gốc) */
  color?: string;
};

const SvgIconMicrophone = ({ color = '#155DFC', ...props }: IconMicrophoneProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 16 16" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M5 8V4a3 3 0 1 1 6 0v4a3 3 0 0 1-6 0m8 0a.5.5 0 0 0-1 0 4 4 0 1 1-8 0 .5.5 0 1 0-1 0 5.007 5.007 0 0 0 4.5 4.975V15a.5.5 0 0 0 1 0v-2.025A5.006 5.006 0 0 0 13 8"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgIconMicrophone;
