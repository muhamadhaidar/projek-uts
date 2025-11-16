// src/navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native'; 
import { MainTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <Icon 
                name="home" 
                size={35} 
                color={focused ? COLORS.primary : COLORS.textLight} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconFocused]}>
              <Icon 
                name="user" 
                size={35} 
                color={focused ? COLORS.primary : COLORS.textLight} 
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    marginLeft: 30,
    marginRight: 30,
    height: 80,
    backgroundColor: '#120f2e7d',
    borderRadius: 27,
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  iconFocused: {
    backgroundColor: COLORS.iconContainerColor,
  },
});

export default MainTabNavigator;