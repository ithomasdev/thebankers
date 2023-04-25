import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Image,
    StatusBar
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })
    StatusBar.setBarStyle('default');


    async function signIn() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
        } catch (error) {
            if (error instanceof Error) {
                setValue({
                    ...value,
                    error: error.message,
                })
            }
        }
    }

    function goToSignUp() {
        navigation.navigate('Sign Up');
    }

    return (

        <>
            <View style={styles.wrapper}>
                {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
                <Image source={ require('../assets/Barcode_Logo.png') } style={styles.image}></Image>
                <View style={styles.inputField}>
                    <TextInput
                        placeholderTextColor='#444'
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoFocus={true}
                        value={value.email}
                        onChangeText={(text) => setValue({ ...value, email: text })}
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
                        value={value.password}
                        onChangeText={(text) => setValue({ ...value, password: text })}
                    />
                </View>
                <Pressable style={styles.button}
                    onPress={signIn}>
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>

                {/* Route to Register page */}
                <View style={styles.signInContainer}>
                    <Text>Don't have an account?</Text>
                    <Pressable onPress={goToSignUp}><Text style={styles.signUp}>Sign Up</Text></Pressable>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 80,
        flex: 1,
        backgroundColor: '#fff'
    },
    signUp: {
        color: '#0096F6'
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
    signInContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 50
    },
    error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
    }

})


export default SignInScreen;
