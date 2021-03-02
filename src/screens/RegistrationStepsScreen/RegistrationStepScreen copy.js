import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { translate } from "../../translations/local";

export default function RegistrationStepScreen({navigation}) {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [shouldShow, setShouldShow] = useState('999');
    const [gender, setGender] = useState('0');
    const [steps, setSteps] = useState('0');
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [goscan, setGoscan] = useState(false);

    useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    function trlala(variable) {
        setGender(variable);
        if (variable == '0') {
            setShouldShow('0')
            console.log(variable+'---0')
        } else {
            setShouldShow(variable)
            console.log(variable+'---variable')
        }
        //setShouldShow(!shouldShow)
        console.log('okkkkkk')
    }

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
    
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    gender,
                    email,
                    fullName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });
    }
    const opacity = 'rgba(0, 0, 0, .4)';
const styless = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 0.5,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 0.5,
    backgroundColor: opacity
  },
  focused: {
    flex: 2,
  },
  layerRight: {
    flex: 0.5,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 0.5,
    backgroundColor: opacity
  },
});
    return (
        
        
            <View style={styles.container}>
            {goscan == false ? (
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                   
                <Image style={styles.logo} source={require('../../../assets/famyli.jpg')}/>
                <Text style={styles.titre}>{translate("WELCOME")}</Text>
                {steps === "0" ? (<Text style={styles.sousTitre}>{translate("WHATYOUWANT")}</Text>
                ) : null}
                  <View>
                   
                        <TouchableOpacity
                            style={shouldShow ==='0' ? styles.buttonActive : styles.buttonInactive}
                            onPress={() => trlala('0')}>
                            <Text style={shouldShow === '0' ? styles.buttonTitleActive : styles.buttonTitleInactive}>Rejoindre votre Famyli</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={shouldShow ==='1' ? styles.buttonActive : styles.buttonInactive}
                            onPress={() => trlala('1')}>
                            <Text style={shouldShow === '1' ? styles.buttonTitleActive : styles.buttonTitleInactive}>Créer votre Famyli</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          style={styles.buttonActiveSecond}
                          onPress={() => Alert.alert(
                            'Scanner',
                            'Es-tu pret à scanner ton code ?',
                            [
                              {text: 'Non', onPress: () => console.log('Cancel Pressed!')},
                              {text: 'Oui', onPress: () => setGoscan(true)},
                            ],
                            { cancelable: false }
                          )}>
                          <Text style={styles.buttonTitleActive}>Je suis un enfant</Text>
                        </TouchableOpacity>     
                    </View>
                        
                {shouldShow === "0" ? (
                    <TouchableOpacity
                        style={styles.buttonActiveSecond}
                        onPress={() => setGoscan(true)}>
                        <Text style={styles.buttonTitleActive}>Scannez votre Famyli QRCode</Text>
                    </TouchableOpacity>
                ) : null}

                {shouldShow ? ( 
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setShouldShow(!shouldShow)}>
                        <Text style={styles.buttonTitle}>hide/show</Text>
                    </TouchableOpacity>
                ) : null}
            
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setShouldShow(!shouldShow)}>
                    <Text style={styles.buttonTitle}>hide/show</Text>
                </TouchableOpacity>

                <TextInput
                    style={styles.input}
                    placeholder={gender}
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
                    style={styles.buttonActive}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitleActive}>Create account</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account of corouse you dooooooooo ? youhouuuuuuu<Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
            ) : null}
            
            {goscan == true ? (
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[ StyleSheet.absoluteFill, styless.container]}
      >
        <View style={styless.layerTop} />
        <View style={styless.layerCenter}>
          <View style={styless.layerLeft} />
          <View style={styless.focused} />
          <View style={styless.layerRight} />
        </View>
        <View style={styless.layerBottom} />
     
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            
            </BarCodeScanner>
            ): null }
        </View>
       
    )
}
