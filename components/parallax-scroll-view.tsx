import type { PropsWithChildren, ReactElement } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ParallaxScrollView = ({
  children,
  headerBackgroundColor,
  headerImage,
  ...props
}: PropsWithChildren &
  ScrollViewProps & { headerBackgroundColor?: any; headerImage?: ReactElement }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      {...props}
    >
      {headerImage}
      {children}
    </ScrollView>
  );
};

export default ParallaxScrollView;
