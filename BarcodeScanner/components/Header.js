import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Header, Icon } from "@rneui/base";
import { StackActions } from '@react-navigation/native';


class AppHeader extends Component {
    render() {
        return (
            <>
            <SafeAreaView style={styles.container}>
                <Header
                    leftComponent={{
                        icon: 'menu',
                        color: '#fff'
                    }}
                    centerComponent={{
                        text: 'Discount Scan',
                        style: styles.heading
                    }}
                    rightComponent={
                        <View style={styles.headerRight}>
                            <TouchableOpacity>
                                <Icon name="scanner" color="white" onPress={StackActions.push('Scanner')} />
                            </TouchableOpacity>
                        </View>
                    }
                    backgroundColor='#262A56'
                />
                <View style={styles.body}>
                </View>
            </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#262A56' },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        marginBottom: 0,
        width: '100%',
        paddingVertical: 0
    },
    navigation: {
        width: '100%'
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'row',
    },
    body: {
        paddingTop: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default AppHeader
