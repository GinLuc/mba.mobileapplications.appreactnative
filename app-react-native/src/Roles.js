import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function RolesPage({navigation}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Roles</Text>
    </View>
  )
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgb(59,108,212)',
    fontSize: 42,
    fontWeight: '100',
    textAlign: 'center',
  },
  title: {
    color: 'rgb(59,108,212)',
    marginTop: 16,
    paddingVertical: 8,
    fontSize: 45,
    fontWeight: '100',
    textAlign: 'center',
    fontWeight: 'bold',
  },
})