import * as React from 'react';
import Svg, { Defs, LinearGradient, Mask, Path, Stop } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconWelcome = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 256 256" {...props}>
    <Path
      fill="url(#IconWelcome_svg__a)"
      d="M63.995 144.015c0-35.344 28.651-63.995 63.995-63.995s63.995 28.651 63.995 63.995-28.652 63.994-63.995 63.994c-35.344 0-63.995-28.651-63.995-63.994"
    />
    <Path
      fill="url(#IconWelcome_svg__b)"
      d="M111.984 72.021c0-8.834 7.162-15.996 15.996-15.996 8.835 0 15.997 7.162 15.997 15.996v31.993h-31.993z"
      opacity={0.779}
    />
    <Path fill="#9F2D00" d="M105.981 116.03a4 4 0 0 1 7.998 0v7.999a4 4 0 0 1-7.998 0z" />
    <Path fill="#fff" d="M103.986 138.011a5.994 5.994 0 1 1 11.988 0 5.994 5.994 0 0 1-11.988 0" />
    <Path fill="#101828" d="M105.971 138.011a4 4 0 1 1 7.998 0 4 4 0 0 1-7.998 0" />
    <Path fill="#9F2D00" d="M141.963 116.03a4 4 0 0 1 7.998 0v7.999a4 4 0 0 1-7.998 0z" />
    <Path
      fill="#fff"
      d="M139.968 138.011a5.995 5.995 0 1 1 11.989.001 5.995 5.995 0 0 1-11.989-.001"
    />
    <Path
      fill="#101828"
      d="M141.954 138.011a3.998 3.998 0 1 1 7.997-.001 3.998 3.998 0 0 1-7.997.001"
    />
    <Mask id="IconWelcome_svg__c" fill="#fff">
      <Path d="M103.986 152.003h47.989c0 13.252-10.743 23.995-23.995 23.995-13.251 0-23.994-10.743-23.994-23.995" />
    </Mask>
    <Path
      fill="#fff"
      d="M103.986 152.003h47.989zm51.619 0c0 15.257-12.368 27.625-27.625 27.625s-27.625-12.368-27.625-27.625h7.261c0 11.247 9.118 20.364 20.364 20.364s20.365-9.117 20.365-20.364zm-27.625 27.625c-15.256 0-27.625-12.368-27.625-27.625h7.261c0 11.247 9.118 20.364 20.364 20.364zm27.625-27.625c0 15.257-12.368 27.625-27.625 27.625v-7.261c11.247 0 20.365-9.117 20.365-20.364z"
      mask="url(#IconWelcome_svg__c)"
    />
    <Path
      fill="url(#IconWelcome_svg__d)"
      d="M34.012 143.518c-2.56-12.046 5.129-23.887 17.175-26.448l24.103-5.123c12.046-2.56 23.887 5.129 26.447 17.175 2.561 12.046-5.129 23.887-17.175 26.447l-24.103 5.124c-12.046 2.56-23.887-5.129-26.447-17.175"
    />
    <Path
      fill="url(#IconWelcome_svg__e)"
      d="M152.729 143.518c2.561-12.046 14.401-19.736 26.447-17.175l24.104 5.123c12.046 2.56 19.735 14.401 17.175 26.447-2.561 12.046-14.401 19.736-26.447 17.175l-24.104-5.123c-12.046-2.56-19.735-14.401-17.175-26.447"
    />
    <Defs>
      <LinearGradient
        id="IconWelcome_svg__a"
        x1={63.995}
        x2={191.985}
        y1={80.02}
        y2={208.009}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF8904" />
        <Stop offset={1} stopColor="#FF6900" />
      </LinearGradient>
      <LinearGradient
        id="IconWelcome_svg__b"
        x1={127.98}
        x2={127.98}
        y1={104.014}
        y2={56.025}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF8904" />
        <Stop offset={0.5} stopColor="#FFB86A" />
        <Stop offset={1} stopColor="#FFF085" />
      </LinearGradient>
      <LinearGradient
        id="IconWelcome_svg__d"
        x1={34.012}
        x2={101.737}
        y1={143.518}
        y2={129.122}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF6900" />
        <Stop offset={1} stopColor="#FF8904" />
      </LinearGradient>
      <LinearGradient
        id="IconWelcome_svg__e"
        x1={220.455}
        x2={152.729}
        y1={157.913}
        y2={143.518}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FF6900" />
        <Stop offset={1} stopColor="#FF8904" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgIconWelcome;
