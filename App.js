import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Iniciacao from './iniciacao';
import Login from './login';
import Cadastro from './cadastro';
import Agendamento from './Agendamentos';
import Telainicial from './Telainicial';
import Menu from './Menu'
import Noticia from './noticia'
import Exerc from './Exerc'


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Iniciacao">
      <Stack.Screen
          name="Iniciacao"
          component={Iniciacao}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Cadastro" component={Cadastro} 
                  options={{ headerShown: false }}/>
        <Stack.Screen name="Agendamento" component={Agendamento}          
                  options={{ headerShown: false }}/>
        <Stack.Screen name="Telainicial" component={Telainicial}
                  options={{ headerShown: false }}/>
        <Stack.Screen name="Menu" component={Menu}
                  options={{ headerShown: false }}/>
        <Stack.Screen name="Noticia" component={Noticia}
                  options={{ headerShown: false }}/>
        <Stack.Screen name="Exerc" component={Exerc}
                  options={{ headerShown: false }}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
