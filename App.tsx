// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { RaceProvider } from './src/contexts/RaceContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    // RaceProvider akan mengelola data balapan, favorit, dan nama user
    <RaceProvider>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AppNavigator />
    </RaceProvider>
  );
};

export default App;