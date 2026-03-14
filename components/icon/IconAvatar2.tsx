import * as React from 'react';
import type { SvgProps } from 'react-native-svg';
import Svg, { Defs, Image, Path, Pattern, Use } from 'react-native-svg';

const SvgIconAvatar2 = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 32 32" {...props}>
    <Path fill="url(#a)" d="M0 0h32v32H0z" />
    <Defs>
      <Pattern id="a" width={1} height={1} patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#b" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABAAEADASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAcBBAUGAgP/xAAZAQACAwEAAAAAAAAAAAAAAAADBQABBAL/2gAMAwEAAhADEAAAAE1MToylq3qCPj57J47m8YA+cCbm201x261r1iocKx4i4AaqgLMnwbWNXx7GUjHlxwu1YaOaxX63Y4EGWet+LJV+vQ9/SB01t09OtH//xAAtEAACAQMDAwIFBAMAAAAAAAABAgMEBREAEjEGIUETYRQgMlFxECIjgTNSwf/aAAgBAQABPwD9fg5QqtKUiDDI3nBI+4HOha6lgPT2uSMgA4z+M6KlSQQQRyPlta0qGSpqMMIsbYzwWbhm9hqgst9ubyTwUnrFzkl8DOouherBGH9OBfOwzDdq6wSkmqcBXMhjlj4ZHA8/LZoUn+KilBELiMM4GShDZyB5OM6ouqbTa6qenlpqoR+qdrkL9PgkA6fri1CZIaamqJyeGXaq/wBFyNdWxfz1ksIkMEle7kuuwqxH0Eex+XpSugpLrAKhtsbTRH8lW41Xw09NQ1dPPGi+jPsY7SZGAbtt1SgVizVlPTqiM2QJ4/3gkdyMHuDrr2rpY5ltsEpeRHV6j2ZUwP7OflXeWUICXyNuOc+NXOoSvqqV5pkjl9GMO2SArON4PblWzq3PTU/wiitSpqZGKgRSOw/cMcOTq8Tz1F1r56j/ACSTux/BPbHyUtFV1knp00DyMOdo7L7seANWDpyALdJ5qlJJ6ejkKJH3VXdSAd3kjTkV6QlowrxQxxFfaNQn/NWG20FnpDWsiCTZlmBztHONVnSa3Cx2yqSQQVQEiHeCVdS5ZdxHGNXC03G2sBV0zIp+l+Ub8MO36WS2i53GKndykQDSTOOVjQZY6qqoTQrTQKIKNASsCdhgeXx9TakW5JHJDTuyJLjeU5YfbtqyVrUMsT3K3tJFjY0qd2AIxlk86uV4iZGtlpjEyA5eZifTHtnzq0xXWiEyTV4mglbeUIJ2v900lUVEqdmUgB0cBlbI4YHnXVVmittVBPSqRSVaF41/0ZTh01Y2NNbbvUjlxHTj77WO59Q1ih0VzxG4PucYGqaRdgOexGpWxC7A+NLtDOoAAB1uA1UVawyKzNz4++B21fZPjenC3PwtSjKfZ8ox1//EACMRAQABAwIGAwAAAAAAAAAAAAECAAMEEDEREhMhQWEiUXH/2gAIAQIBAT8Aqd0juh7at3SUuHMOuXy9QJRfVYqdUIx/dcyPxgond71gAyuoLtpaDdq5j27sJEuKNWMS1ZhGMfHn7avwE4m5X//EACQRAAIBAwIGAwAAAAAAAAAAAAECAwAEEQUSEBMhIjGhUWFx/9oACAEDAQE/AKihLjOCfoVLDtXcARxswxjOxx47hV0CI2LNx06VWkkCMD2g1qkoj5PMYDO71QIIyDV8ZGOxCcAdf2otRuLeVDGqgg+avdWubqV3PQMMY+BWlzSJKqEnY491/9k="
        id="b"
        width={64}
        height={64}
        preserveAspectRatio="none"
      />
    </Defs>
  </Svg>
);
export default SvgIconAvatar2;
