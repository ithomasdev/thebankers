import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Image
} from 'react-native'
import React, { Component } from 'react'
import { Link } from 'expo-router'

const LoginForm = () => {
  return (
    <>
      <View style={styles.wrapper}>
        <Image source={{ uri: '/Users/Logan/Barcode/assets/Barcode_Logo.png'}} style={styles.image}></Image>
        <View style={styles.inputField}>
          <TextInput
            placeholderTextColor='#444'
            placeholder='Username'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='username'
            autoFocus={true}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            placeholderTextColor='#444'
            placeholder='Password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={true}
            textContentType='password'
          />
        </View>
        <Pressable titleSize={20} style={styles.button}
          onPress={() => {
            //Handle login functionality here
          }}>
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>
        <View style={styles.signUpContainer}>
          <Text>Dont have an account?</Text>
          {/* Route to Register page */}
          <Link href='/Register' style={{ color: '#6BB0F5' }}> Sign Up</Link>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80
  },
  image: {
    height: 100,
    width: 150,
    marginLeft: '28%',
    marginBottom: 30
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    marginLeft: '8%',
    width: '80%',
    borderWidth: 1
  },
  button: {
    backgroundColor: '#0096F6',
    alignItems: 'center',
    marginLeft: '8%',
    marginTop: 10,
    width: '80%',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20
  },
  signUpContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50
  }

})

export default LoginForm