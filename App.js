import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Text } from './components'
import Navigation from './navigation'

// test

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Navigation/>
    </SafeAreaView>
  );
}
