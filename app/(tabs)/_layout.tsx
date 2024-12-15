import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  // Use the purple color directly
  const purpleColor = '#6A1B9A'; // Purple color used in UserAccountScreen

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: purpleColor, // Purple color for active tabs
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Transparent style for iOS
          },
          default: {
            backgroundColor: '#ffffff', // Background color of the tab bar (light theme)
          },
        }),
        headerShown: false, // Remove headers for all tab screens
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home" size={28} color={color || purpleColor} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <Icon name="account" size={28} color={color || purpleColor} />
          ),
        }}
      />
    </Tabs>
  );
}
