import React from 'react';
import { TextInput, Image, Pressable, StyleSheet, Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    StatusBar.setBarStyle('default');

    async function signUp() {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            navigation.navigate('Sign In');
        } catch (error) {
            if (error instanceof Error) {
                setValue({
                    ...value,
                    error: error.message,
                })
            }
        }
    }

    function goToSignIn() {
        navigation.navigate('Sign In');
    }

    return (
        <View style={styles.wrapper}>
            {!!value.error ? <View style={styles.error}><Text>{value.error}</Text></View> : null}
            <Image source={{ uri: '/Users/Logan/Barcode_working/src/assets/Barcode_Logo.png' }} style={styles.image}></Image>
            <View style={styles.inputField}>
                <TextInput
                    placeholderTextColor='#444'
                    placeholder='email'
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
                        onPress={signUp}>
                        <Text style={styles.buttonText}> Sign Up!</Text>
                    </Pressable>
                    <View style={styles.signUpContainer}>
                        <Text>Already have an account?</Text>                        
                        <Pressable onPress={goToSignIn}><Text style={styles.signIn}>Sign In</Text></Pressable>
                    </View>
            </View >
    );
}

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 80,
        flex: 1,
        backgroundColor: '#fff'
    },
    signIn: {
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
    signUpContainer: {
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

export default SignUpScreen;