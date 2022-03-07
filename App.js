import React from 'react';
import { View, Text } from 'react-native';
import Routes from './src/routes';
import Toast from 'react-native-toast-message';

export default function App() {
  return <View style={{ flex: 1, }}>
    <Routes />
  </View>;
}
