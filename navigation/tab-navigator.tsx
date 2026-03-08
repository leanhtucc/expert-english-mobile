import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ExploreScreen, HomeScreen, LessonsScreen, ProfileScreen } from '@/screens';

const Tab = createBottomTabNavigator();

let previousTabBeforeAction = 'Home';

function CustomTabBar({
  state,
  descriptors,
  navigation,
  onTabChange,
}: {
  state: any;
  descriptors: any;
  navigation: any;
  onTabChange: (tabName: string) => void;
}) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const getIcon = (routeName: string, focused: boolean) => {
    const iconProps = {
      size: 28,
      color: focused ? colors.tint : colors.tabIconDefault,
    };

    switch (routeName) {
      case 'Home':
        return <IconSymbol name="house.fill" {...iconProps} />;
      case 'Explore':
        return <IconSymbol name="paperplane.fill" {...iconProps} />;
      case 'Lessons':
        return <IconSymbol name="book.fill" {...iconProps} />;
      case 'Profile':
        return <IconSymbol name="person.fill" {...iconProps} />;
      default:
        return null;
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Explore':
        return 'Explore';
      case 'Lessons':
        return 'Lessons';
      case 'Profile':
        return 'Profile';
      default:
        return routeName;
    }
  };

  return (
    <View
      style={[styles.tabBar, { paddingBottom: insets.bottom, backgroundColor: colors.background }]}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label = getLabel(route.name);
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            onTabChange(route.name);
          } else if (isFocused) {
            onTabChange(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabItem}
          >
            {isFocused && (
              <LinearGradient
                colors={[colors.tint, colors.background]}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.tabBackground}
              />
            )}

            <View style={styles.iconContainer}>{getIcon(route.name, isFocused)}</View>

            <ThemedText
              style={[styles.tabLabel, isFocused && { color: colors.tint, fontWeight: 'bold' }]}
              numberOfLines={1}
            >
              {label}
            </ThemedText>

            {isFocused && <View style={[styles.tabUnderline, { backgroundColor: colors.tint }]} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabNavigator() {
  const [currentTab, setCurrentTab] = useState('Home');

  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
  };

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={props => {
          const focusedRoute = props.state.routes[props.state.index];

          // Cập nhật currentTab nếu cần
          if (focusedRoute && currentTab !== focusedRoute.name) {
            setTimeout(() => setCurrentTab(focusedRoute.name), 0);
          }

          return <CustomTabBar {...props} onTabChange={handleTabChange} />;
        }}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { elevation: 0 },
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarStyle: { display: 'flex' },
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarStyle: { display: 'flex' },
          }}
        />
        <Tab.Screen
          name="Lessons"
          component={LessonsScreen}
          options={{
            tabBarStyle: { display: 'flex' },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarStyle: { display: 'flex' },
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export const getPreviousTabBeforeAction = () => previousTabBeforeAction;

export const navigateBackToPreviousTab = (navigation: any) => {
  navigation.navigate('TabNavigator', {
    screen: previousTabBeforeAction,
    params: { refresh: Date.now() },
  });
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: 60,
    paddingHorizontal: 4,
  },
  tabBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.2,
  },
  iconContainer: {
    marginTop: 8,
    marginBottom: 3,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    width: '60%',
    height: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 6,
    textAlign: 'center',
  },
});
