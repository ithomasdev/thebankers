import React, { Component, useEffect, useState, useCallback } from 'react';
import { StatusBar, StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, Linking, Alert } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { Button, Card, Icon, Overlay } from 'react-native-elements';
import { PricingCard } from '@rneui/themed';
import { getAuth, signOut } from 'firebase/auth';
import axios from 'axios';
import { addDoc, collection, getDocs, where, query } from 'firebase/firestore';
import { app, database } from '../config/firebase';
import QRCode from 'react-native-qrcode-svg';

const auth = getAuth();

export default function ProductScreen({ route, navigation }: any) {
    const [product, setProduct] = useState(null);
    const [isVisible, setVisible] = useState(false);
    
    const { user } = useAuthentication();
    
    const productID = route.params.product;
    
    let content;

    let qrPopover;
    
    let currentURL;

    const setCurrentURL = ((store) => {
      currentURL = store.url;
    });

    const addToDB = async () => {
      try {  
        const collectionRef = collection(database, "Products");

        const queryRef = query(collectionRef, where('title', '==', product.title), where('uid', '==', auth.currentUser.uid));

        await getDocs(queryRef).then((snapshot) => {
          if (!snapshot.empty) {
            Alert.alert('Document already in favorites');
          } else {
            addDoc(collection(database, "Products"),
              {
                uid: auth.currentUser.uid,
                title: product.title,
                online_stores: product.online_stores,
                description: product.description,
                images: product.images,
                manufacturer: product.manufacturer,
                barcode: productID
              }
            );
          }
        });
        
      } catch (error) {
        console.error("Error loading document", error)
      }
    }

    console.log(productID);

    const getPrices = async () => {
      try {
        const source = axios.CancelToken.source();

        const timeoutId = setTimeout(() => {
          source.cancel('Timeout reached');
          navigation.navigate('Home');
          Alert.alert(`Please try again.`);
        }, 30000);

        const response = await axios.get('https://barcodes1.p.rapidapi.com/', {
            headers: {
                'X-RapidAPI-Key': '9bca22c3admsh626b98e7ec37f37p1b32f8jsnac77a6184014',
                'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
            },
            params: {query: productID},
            cancelToken: source.token
        });
        clearTimeout(timeoutId);

        if (response.data.nextPage === null) {
          navigation.navigate('Home');
          Alert.alert(`Please try again.`);
        }
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      }
    };

    type OpenURLButtonProps = {
        url: string;
        children: string;
      };
      
      const OpenURLButton = ({url, children}: OpenURLButtonProps) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);
      
        return <Button title={children} style={{padding: 7}} buttonStyle={{ backgroundColor: 'white' }} titleStyle={{ color: 'grey'}} onPress={handlePress} />;
      };

    if (product) {
        let stores = product.online_stores;
        content = 
            <ScrollView style={{width: '100%'}}>
                <Card style={{width: '100%'}}>
                  <Card.Title><Text style={{ fontSize: 20 }}>{product.title}</Text></Card.Title>
                  <View style={{alignItems: 'center', height: 350, width: '100%' }}>
                    <Image 
                        style={{ width: '100%', height: '100%' }}
                        source={{ uri: product.images[0] }} />
                  </View>
                  <View style={{ }}>
                    <Button style={{ padding: 7 }} buttonStyle={{ backgroundColor: 'white' }} titleStyle={{ color: 'grey'}} title="Add to favorites"
                      icon={<Icon type='font-awesome' name='star' color='#4f9deb' style={{paddingRight: 10}} />} 
                      onPress={() => {
                      addToDB();
                      navigation.navigate('Profile');
                    }} />
                    <Button style={{ padding: 7 }} buttonStyle={{ backgroundColor: 'white' }} titleStyle={{ color: 'grey'}} title="Return Home" 
                      icon={<Icon type='font-awesome' name='home' color='#4f9deb' style={{paddingRight: 10}} />}
                      onPress={() => {
                        navigation.navigate('Home')
                      }} />
                  </View>
                </Card>
                <View style={{ paddingVertical: 35 }}>
                  <Text style={{ fontSize: 17, padding: 7, fontWeight: 'bold' }}>{stores.length} result(s):</Text>
                  {stores.map((store, i) =><Card key={i} style={{ alignText: 'center' }}>
                                              <Card.Title style={{fontSize: 30, color: '#4f9deb'}}>{store.name}</Card.Title>
                                              <View style={{ alignContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                                                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{store.price}</Text>
                                              </View>
                                              <OpenURLButton url={store.url}>Open Store</OpenURLButton>
                                              <Button style={{padding: 7}} buttonStyle={{ backgroundColor: 'white' }} titleStyle={{ color: 'grey'}} title="Share"
                                                onPress={() => {
                                                  setCurrentURL({store});
                                                  setVisible(true);
                                                }}/>
                                          </Card>
                  )}
                </View>
            </ScrollView>
    } else {
        content = 
            <View style={{ }}>
                <ActivityIndicator />
                <Text style={{ fontSize: 15, paddingTop: 30 }}>Please wait while we help you save</Text>
            </View>
    }

    if (!product) {
        getPrices();
    }

    StatusBar.setBarStyle('light-content');
    return (
        <>
        <View style={styles.container}>
        <Overlay
          isVisible={isVisible}
          onBackdropPress={() => setVisible(false)}
        >
          <View style={{ height: 300, width: 300}}>
            <QRCode
              value={currentURL}
              size={300}
               />
          </View>
        </Overlay>
            {content}
        </View>
        </>
    );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    justifyContent: 'center',
},
button: {
    marginTop: 10
}
});
