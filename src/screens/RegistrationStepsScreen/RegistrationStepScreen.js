import React, { useState, useEffect } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { translate } from "../../translations/local";

export default function RegistrationStepScreen({ navigation }) {
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
  const [getQR, setQr] = useState('000');
  
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setGoscan(false);
    setQr(data);
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
      console.log(variable + '---0')
    } else {
      setShouldShow(variable)
      console.log(variable + '---variable')
    }
    //setShouldShow(!shouldShow)
    console.log('okkkkkk')
  }

  const onFooterLinkPress = () => {
    navigation.navigate('Login')
  }

  const checkQR = () => {
    const groupRef = firebase.firestore().collection('groups')


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
          status: '0',
          email,
          fullName,
          group: getQR,
          
        };
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            navigation.navigate('Home', { user: data })
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
      flex: 0.33,
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
      flex: 0.33,
      backgroundColor: opacity
    },
  });
  return (


    <View style={styles.container}>
      {goscan == false ? (
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">

          <Image style={styles.logo} source={require('../../../assets/famyli.jpg')} />
          <Text style={styles.titre}>{translate("WELCOME2")}</Text>

          <View>
          {getQR == "000" ? (
            <TouchableOpacity
              style={styles.buttonActiveSecond}
              onPress={() => Alert.alert(
                'Scanner',
                'Es-tu pret à scanner ton code ?',
                [
                  { text: 'Non', onPress: () => console.log('Cancel Pressed!') },
                  { text: 'Oui', onPress: () => setGoscan(true) },
                ],
                { cancelable: false }
              )}>
              <Text style={styles.buttonTitleActive}>Scannez votre Family QR Code</Text>
            </TouchableOpacity>
            ) : null}
          </View>
          


          {getQR !== "000" ? (
            <TextInput
              style={styles.input}
              placeholder={getQR}
              placeholderTextColor="#aaaaaa"
              onChangeText={(text) => setQr(text)}
              value={getQR}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          ) : null}
          <TextInput
            style={styles.input}
            placeholder='Fullname'
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
            <Text style={styles.footerText}>Already got an account ? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
          </View>
        </KeyboardAwareScrollView>
      ) : null}

      {goscan == true ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[StyleSheet.absoluteFill, styless.container]}>
          <View style={styless.layerTop} />
          <View style={styless.layerCenter}>
            <View style={styless.layerLeft} />
            <View style={styless.focused} />
            <View style={styless.layerRight} />
          </View>
          <View style={styless.layerBottom} />

          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

        </BarCodeScanner>
      ) : null}
    </View>

  )
}
