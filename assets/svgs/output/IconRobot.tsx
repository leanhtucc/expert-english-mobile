import * as React from "react";
import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
const SvgIconRobot = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    {/* Example robot icon path, replace with your SVG content */}
    <Path d="M12 2a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1v2h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2v1a2 2 0 0 1-4 0v-1H6a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h1v-2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm0 2V4h-1v1h1zm-4 3v2h2V7H8zm8 0h-2v2h2V7zm-4 4v2h2v-2h-2zm-4 4v2h2v-2H8zm8 0h-2v2h2v-2z" fill="#000" />
  </Svg>
);

export default SvgIconRobot;