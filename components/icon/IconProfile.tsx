import * as React from 'react';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconProfile = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 28 28" {...props}>
    <G clipPath="url(#a)">
      <Rect width={28} height={28} fill="#FF73D4" rx={6} />
      <Path
        fill="#F04F3F"
        stroke="#fff"
        d="M7.205 7.023a.792.792 0 0 1 .023 1.332L3.6 10.775a.792.792 0 0 1-1.23-.648L2.31 6.11a.792.792 0 0 1 1.106-.739l3.687 1.6zM24.242 5.291a.793.793 0 0 1 .982.807l-.19 4.015a.791.791 0 0 1-1.252.606l-3.547-2.535a.792.792 0 0 1 .17-1.38l3.736-1.48z"
      />
      <Path
        stroke="#FFC704"
        strokeLinecap="round"
        d="M16.452 7.365c.74.527 2.507 1.107 3.651-.79 1.431-2.373 1.205-4.255 0-4.632-1.204-.376-4.932.414-3.652 2.109 1.28 1.694 2.712.94 2.862 0M10.864 7.365c-.74.527-2.507 1.107-3.652-.79-1.43-2.373-1.205-4.255 0-4.632s4.932.414 3.652 2.109c-1.28 1.694-2.71.94-2.861 0"
      />
      <Rect
        width={30.855}
        height={24.36}
        x={-1.428}
        y={7.119}
        fill="#F04F3F"
        stroke="#fff"
        rx={12.18}
      />
      <Rect width={9.068} height={9.068} x={3.668} y={14} fill="#fff" rx={4.534} />
      <Rect width={8.981} height={8.981} x={15.233} y={13.721} fill="#fff" rx={4.49} />
      <Rect width={5.014} height={5.014} x={17.832} y={17.173} fill="#000" rx={2.507} />
      <Rect width={5.014} height={5.014} x={6.453} y={17.173} fill="#000" rx={2.507} />
    </G>
    <Defs>
      <ClipPath id="a">
        <Rect width={28} height={28} fill="#fff" rx={6} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgIconProfile;
