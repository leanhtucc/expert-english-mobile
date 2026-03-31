import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgIconFlashCard = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 21 20" {...props}>
    <Path
      fill="#fff"
      d="m2 16.833-.85-.35a1.76 1.76 0 0 1-1.037-1.125A2.1 2.1 0 0 1 .2 13.783l1.8-3.9zm4 2.2q-.824 0-1.412-.587A1.93 1.93 0 0 1 4 17.033v-6l2.65 7.35q.075.176.15.338t.2.312zm5.15-.1q-.8.3-1.55-.075-.75-.374-1.05-1.175L4.1 5.483a1.96 1.96 0 0 1 .05-1.562A1.9 1.9 0 0 1 5.3 2.883l7.55-2.75q.8-.3 1.55.075t1.05 1.175l4.45 12.2q.3.8-.05 1.563a1.9 1.9 0 0 1-1.15 1.037zM9 7.033q.424 0 .713-.287A.97.97 0 0 0 10 6.033a.97.97 0 0 0-.287-.712A.97.97 0 0 0 9 5.033a.97.97 0 0 0-.713.288.97.97 0 0 0-.287.712q0 .426.287.713.288.287.713.287"
    />
  </Svg>
);
export default SvgIconFlashCard;
