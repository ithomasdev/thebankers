import React, { Component, useEffect, useState, useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, Linking, Alert } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button, Card } from 'react-native-elements';
import { PricingCard } from '@rneui/themed';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import { Icon } from 'react-native-elements'
import { DocumentData, Firestore, deleteDoc, doc, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { getDocs, collection, where } from 'firebase/firestore';
import { app, database } from '../config/firebase';

const auth = getAuth();

export default function ProfileScreen({ route, navigation }: any) {
    const [items, setItems] = React.useState(null);

    const { user } = useAuthentication();

    const database = getFirestore();

    const itemArray = [];

    const getItems = async () => {
        try {
            const collectionRef = collection(database, "Products");
            const authQuery = query(collectionRef, where("uid", "==", auth.currentUser.uid));
            const snapshot = await getDocs(authQuery);

            snapshot.forEach( (document) => {
                itemArray.push(document.data());
                console.log(document.data());
            });

            setItems(itemArray);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteDocument = async (title : string) => {
        try {
            const collectionRef = collection(database, "Products");

            const queryRef = query(collectionRef, where("title", "==", title));

            await getDocs(queryRef).then(snapshot => {
                snapshot.forEach((document) => {
                    deleteDoc(document.ref).then(() =>{
                        console.log("document deleted");
                        getItems();
                    })
                })
            })
            
        } catch (error) {
            console.error(error);
        }
    }

    let content;

    if (!items || items.length === 0) {
        content = <View>
            <Text> No Items to display</Text>
        </View>
        getItems();
    } else {
        content = <View>
            {items.map((item, i) => 
                <View key={i}>
                    <Card>
                    <View style={{alignItems: 'center', alignContent: 'center', height: 150, width: '100%'}}>
                        <Image 
                            style={{ width: '50%', height: '100%'}}
                            source={{ uri: item.images[0]}} />
                    </View>
                    <Card.Title style={{fontSize: 15}}>{item.title}</Card.Title>
                    <Button style={{ }} buttonStyle={{ backgroundColor: 'white' }} titleStyle={{ color: '#4f9deb', fontSize: 17}} title="Go to item"
                      icon={<Icon type='font-awesome' name='star' color='#4f9deb' style={{paddingRight: 10}} />} 
                      onPress={() => {
                      navigation.navigate('Product', {product: item.barcode});
                    }} />
                    <Button style={{ }} buttonStyle={{ backgroundColor: 'white' }} titleStyle={{ color: '#4f9deb', fontSize: 17}} title="Delete" 
                      icon={<Icon type='font-awesome' name='trash' color='#4f9deb' style={{paddingRight: 10}} />}
                      onPress={() => {
                        deleteDocument(item.title);
                      }} />
                    </Card> 
                </View>
            )}
        </View>
    }

    
    StatusBar.setBarStyle('light-content');
    
    return (
        <View style={styles.container}>
            <Card style={{}} containerStyle={{ height: "90%"}}>
                <View style={{flexDirection: 'row', alignItems: 'space-between', justifyContent: 'space-between', paddingBottom: 15}}>
                    <Text style={{ fontSize: 25 }}>Profile</Text>
                    <Button title="Sign Out" style={{ width: '100%'}} buttonStyle={{ backgroundColor: 'white' }} titleStyle={{ color: '#4f9deb'}} onPress={() => signOut(auth)} />  
                </View>
                <Text style={{ paddingBottom: 50, fontSize: 16, color: 'grey'}}>{user?.email}</Text>
                {items && <Text style={{paddingBottom: 20 }}>You have {items.length} saved Item(s)</Text> }
                {!items && <Text style={{paddingBottom: 20 }}>You have 0 saved Item(s)</Text> }
                <Card.Divider />
                <ScrollView style={{height: '80%'}}>
                    {content}
                </ScrollView>
                
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
container: {
    display: 'flex', flex: 1, flexDirection: 'column',
    backgroundColor: '#f3f3f3',
},
button: {
    marginTop: 10
}
});
