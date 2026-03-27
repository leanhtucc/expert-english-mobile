import 'react-native-svg';

declare module 'react-native-svg' {
  interface SvgProps {
    xmlnsXlink?: string;
  }

  interface RectProps {
    shapeRendering?: string;
  }
}
