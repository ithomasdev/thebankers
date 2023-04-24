import React from 'react';
import { Icon } from "@rneui/base";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native-elements';
import HomeScreen from '../screens/Home';
import Scanner from '../screens/Scanner';
import Product from '../screens/Product';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Text style={{ fontSize: 20, color: 'grey'}}>Discount Scan</Text>
          ),
            headerLeft: () => (
              <Icon name="account-circle" style={{ paddingLeft: 20 }} color="grey" onPress={() => navigation.navigate('Profile', {screen: 'Profile' })} />
            ),
            headerRight: () => (
              <Icon type="font-awesome" name="barcode" style={{ paddingRight: 20 }} color="grey" onPress={() => navigation.navigate('Scanner', {screen: 'Scanner' })} />
            )
          })}
        />
        <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false}}/>
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}