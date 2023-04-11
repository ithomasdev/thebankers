import React from 'react'
import * as ReactDOM from 'react-dom'
import { StyleSheet } from 'react-native'
import AppHeader from '../components/Header'
import LoginForm  from '../components/LoginScreen/LoginForm'
import Scanner from './Scanner.js'


export default function Page() {
  const isLoggedIn = false;
  if (isLoggedIn){
    return <Scanner/>
  } else {
    return <LoginForm/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
