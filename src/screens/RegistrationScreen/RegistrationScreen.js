import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'
import { translate } from "../../translations/local";

import uuid from "react-native-uuid";

export default function RegistrationScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [familyname, setFamyliName] = useState('')

    
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    var date= String(Date.parse(new Date()));

    const [generatedQR, generateQR] = useState(date+"-"+uuid.v1())
    
    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
    
        /* */

        firebase
            .auth()
            .signInAnonymously()
            .then((response) => {
                const usersRef = firebase.firestore().collection('groups').doc(generatedQR)
                
                usersRef
                .get()
                .then((doc) => {
                    if (! doc.exists) {
                        firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then((response) => {
                            const uid = response.user.uid
                            const data = {
                                id: uid,
                                accounType: 0,
                                email,
                                fullName,
                                onboarding : 0, 
                                group: generatedQR,
                                status : 1,
                                avatar : 0,
                                todocount : 0,
                                chatcount : 0,
                                alertcount : 0 ,
                            };
                            const usersRef = firebase.firestore().collection('users')
                            usersRef
                                .doc(uid)
                                .set(data)
                                .then(() => {

                                    const GroupCreatorData = {
                                        id: generatedQR,
                                    };
                                    /// create group

                                    const groupRef = firebase.firestore().collection('groups')
                                    groupRef
                                        .doc(generatedQR)
                                        .set(
                                            {groupName:familyname}
                                        )

                                        .then(() => {
                                            console.log('create '+generatedQR+' collection members and add datas')

                                            // create collection members and add datas

                                            const memberRef = firebase.firestore().collection('groups').doc(generatedQR).collection('members')

                                            memberRef
                                            .doc(uid)
                                            .set(
                                                {
                                                    uid,
                                                    fullName,
                                                    email                                                

                                                                                               }
                                            )

                                        })
                                        .catch((error) => {
                                            alert(error)
                                        });


                                })
                                .catch((error) => {
                                    alert(error)
                                });
                            


                        })
                        .catch((error) => {
                            alert(error)
                    }); 

                        
                    }
                }).catch((error) => {
                    console.log("Error getting document:", error);
                });
              

                
            })
            .catch((error) => {
                alert(error)
            });
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <Image
                    style={styles.logo}
                    source={require('../../../assets/icon.png')}
                />
                <Text style={styles.titre}>{translate("WELCOME2")}</Text>
                <TextInput
                    style={styles.input2}
                    placeholder='Famyli Name'
                    placeholderTextColor="#aaaaaa" 
                    onChangeText={(text) => setFamyliName(text)}
                    value={familyname}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                
                <TextInput
                    style={styles.input}
                    placeholder='Full Name'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='Confirm Password'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
