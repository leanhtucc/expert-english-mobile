import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgIconBag = (props: SvgProps) => <Svg width={24} height={24} fill="none" viewBox="0 0 25 24" {...props}><Path fill="#C8102E" d="M2.5 23.75a2.4 2.4 0 0 1-1.766-.734A2.4 2.4 0 0 1 0 21.25v-5h8.75v2.5h7.5v-2.5H25v5q0 1.032-.734 1.766t-1.766.734zm8.75-7.5v-2.5h2.5v2.5zM0 13.75V7.5q0-1.03.734-1.766A2.4 2.4 0 0 1 2.5 5h5V2.5q0-1.03.734-1.766A2.4 2.4 0 0 1 10 0h5q1.032 0 1.766.734.734.735.734 1.766V5h5q1.032 0 1.766.734Q25 6.47 25 7.5v6.25h-8.75v-2.5h-7.5v2.5zM10 5h5V2.5h-5z" /></Svg>;
export default SvgIconBag;