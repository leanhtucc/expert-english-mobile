import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { IconHome, IconProfile, IconRanking, IconUserProfile } from '@/components/icon';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { HomeScreen, LeaderboardScreen } from '@/screens';
import { ProfileScreen } from '@/screens/profile';
import { PracticeSetupScreen } from '@/screens/speakingSession';

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

  // Ẩn tab bar khi đang ở màn hình speaking session
  const currentRoute = state.routes[state.index];
  if (currentRoute.name === 'speakingSession') {
    return null;
  }

  const getIcon = (routeName: string, focused: boolean) => {
    const iconColor = focused ? colors.tint : colors.tabIconDefault;
    const size = 40;

    switch (routeName) {
      case 'Home':
        return <IconHome width={size} height={size} color={iconColor} />;
      case 'speakingSession':
        return <IconProfile width={size} height={size} color={iconColor} />;
      case 'Ranking':
        return <IconRanking width={size} height={size} color={iconColor} />;
      case 'Profile':
        return <IconUserProfile width={size} height={size} color={iconColor} />;
      default:
        return null;
    }
  };

  return (
    <View
      style={[styles.tabBar, { paddingBottom: insets.bottom, backgroundColor: colors.background }]}
    >
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
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
            <View style={styles.iconContainer}>{getIcon(route.name, isFocused)}</View>

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
          name="speakingSession"
          component={PracticeSetupScreen}
          options={{
            tabBarStyle: { display: 'none' },
          }}
        />
        <Tab.Screen
          name="Ranking"
          component={LeaderboardScreen}
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
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    elevation: 8,
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 56,
    paddingHorizontal: 4,
  },
  iconContainer: {
    marginTop: 0,
    marginBottom: 0,
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    width: 20,
    height: 2,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '500',
    marginBottom: 3,
    textAlign: 'center',
  },
});
