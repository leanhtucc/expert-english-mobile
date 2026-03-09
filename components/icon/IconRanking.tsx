import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Circle, ClipPath, Defs, G, Mask, Path, Rect } from 'react-native-svg';

const SvgIconRanking = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 42 42" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="#FFC200"
        d="M34.603 21c0 7.732-6.268 14-14 14s-14-6.268-14-14 6.268-14 14-14 14 6.268 14 14"
      />
      <Path fill="#FFC200" d="M33.524 32.449a1.167 1.167 0 0 1-1.268 1.267l-7.68-.698 8.25-8.25z" />
      <Mask
        id="b"
        width={19}
        height={20}
        x={11}
        y={11}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}
      >
        <Circle cx={20.603} cy={21} r={9.333} fill="#FF8001" />
      </Mask>
      <G mask="url(#b)">
        <Circle cx={20.603} cy={21} r={10.5} fill="#FF7B23" />
        <Path
          fill="#fff"
          d="M15.207 11.667a2.333 2.333 0 0 1 2.334-2.334h.583a2.333 2.333 0 0 1 2.333 2.334V14a2.333 2.333 0 0 1-2.333 2.333h-.583A2.333 2.333 0 0 1 15.207 14zM20.749 11.667a2.333 2.333 0 0 1 2.333-2.334h.584a2.333 2.333 0 0 1 2.333 2.334V14a2.333 2.333 0 0 1-2.333 2.333h-.584A2.333 2.333 0 0 1 20.75 14z"
        />
        <Path
          fill="#DE530C"
          d="M18.386 22.167c.841 0 1.613.297 2.216.791a3.5 3.5 0 0 1 2.218-.791h.7a3.5 3.5 0 0 1 0 7h-.7a3.5 3.5 0 0 1-2.218-.793 3.5 3.5 0 0 1-2.216.793h-.7a3.5 3.5 0 0 1 0-7z"
        />
        <Rect width={22.167} height={7} x={9.52} y={25.667} fill="#fff" rx={2} />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h42v42H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgIconRanking;
