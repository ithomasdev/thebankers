import React from 'react';
import { StatusBar, StyleSheet, Text, View, Image } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button, Card } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import AppHeader from '../components/Header'

const auth = getAuth();

export default function HomeScreen({ route, navigation }: any) {
  const { user } = useAuthentication();
  StatusBar.setBarStyle('light-content');
  return (
    <>
    <View style={styles.container}>
      <Card style={{ width: '100%' }} containerStyle={{ backgroundColor: '#fff', padding: 0 }}>
        <View style={{ backgroundColor: '#4f9deb', alignItems: 'center'}}>
          <Text style={{ color: '#fff', fontSize: 35, paddingVertical: 10 }}>Welcome!</Text>
          <Text style={{color: '#fff', fontSize: 20, paddingVertical: 10}}>Choose an option to get started!</Text>
          <Image style={{ height: 250, width: '100%' }} source={require('../assets/wave-haikei.png')}/>
        </View>
      </Card>
      <Card style={{ width: '100%'}} containerStyle={{ padding: 0}}>
        <Button buttonStyle={{ backgroundColor: '#4f9deb', height: 70 }} titleStyle={{ color: '#fff', fontSize: 24}} title="Start Scanning" onPress={() => navigation.navigate('Scanner', {screen: 'Scanner' })}/>
      </Card>
      <Card style={{ width: '100%'}} containerStyle={{ padding: 0}}>
        <Button buttonStyle={{ backgroundColor: '#4f9deb', height: 70 }} titleStyle={{ color: '#fff', fontSize: 24}} title="Check previously scanned items" onPress={() => navigation.navigate('Profile', {screen: 'Profile' })}/>
      </Card>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  button: {
    marginTop: 10
  }
});
