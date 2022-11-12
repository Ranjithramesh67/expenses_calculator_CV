import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mainpage from './src/mainpage';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Mainpage/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21CD9A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40
  },
});
