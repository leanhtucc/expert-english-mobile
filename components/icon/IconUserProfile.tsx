import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, Image, Pattern, Rect, Use } from 'react-native-svg';

const SvgIconUserProfile = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 32 32" {...props}>
    <Rect width={32} height={32} fill="url(#a)" rx={16} />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABAAEADASIAAhEBAxEB/8QAGgABAAMBAQEAAAAAAAAAAAAAAAECBQQDB//EABkBAAIDAQAAAAAAAAAAAAAAAAAFAQIDBP/aAAwDAQACEAMQAAAA+rBQ6L++mXK6vAKDPUAvs41WCzbzaXieUcDIiQvrZO0yVUz9PMieULmkTEhyuqLV5/ewArb/xAAsEAACAQIEAgkFAAAAAAAAAAABAgMAEQQFM3IgMRAUMFFSVIGxwRITIiRB/9oACAEBAAE/AOyhRpmYJb8ed66nN4krqc3iSpI3ib6WtyuLcOU6mL3LTMqi7EAd5oEEAg3FY3WTYffhynUxe5azmGeRYSilkW9wO+snimjw7/cBALXUGsbrJs+eHKdTF7lpgb3APobUoP8AQfU3rG60ew+/DlGpjNy9ON1o9nzwmGVHZ4ZWQnnav3/OSUOvebelD83cs3eez//EABsRAAICAwEAAAAAAAAAAAAAAAECAxEAECEz/9oACAECAQE/AMWKRhYXmNFIosrzaGoVNXzJTcJNbh80yfybYdxwMcLueFidf//EAB8RAAIBBAIDAAAAAAAAAAAAAAECAwAQESEzcQQSgf/aAAgBAwEBPwCmniUkFt0s0bHCtu8g9p2GcbqEYnUZvPyv3Xj8yfbmNDsopPVBEXYQC3//2Q=="
        id="b"
        width={64}
        height={64}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
export default SvgIconUserProfile;
