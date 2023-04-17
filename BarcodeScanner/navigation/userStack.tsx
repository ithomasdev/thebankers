import React from 'react';
import { Icon } from "@rneui/base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import Scanner from '../screens/Scanner';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Discount Scan',
            headerRight: () => (
              <Icon name="scanner" onPress={() => navigation.navigate('Scanner', {screen: 'Scanner' })} />
            )
          })}
        />
        <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}