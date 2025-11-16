// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import { useRaces } from '../contexts/RaceContext';
import RaceDetailScreen from '../screens/RaceDetailScreen';
import { COLORS } from '../constants/colors';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { userName } = useRaces();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerTintColor: COLORS.primary,
          headerTitleStyle: { color: COLORS.textPrimary },
          headerStyle: { backgroundColor: COLORS.background },
        }}
      >
        {userName ? (
          <>
            <Stack.Screen 
              name="MainApp" 
              component={MainTabNavigator} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="RaceDetail" 
              component={RaceDetailScreen} 
              options={({ route }) => ({ 
                title: route.params.raceName,
                headerBackTitle: 'Back',
              })}
            />
          </>
        ) : (
          <>
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;