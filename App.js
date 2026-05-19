import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProfileProvider } from './src/context/ProfileContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProfileProvider>
        <StatusBar style="light" />
        <Navigation />
      </ProfileProvider>
    </SafeAreaProvider>
  );
}
