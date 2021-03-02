import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

import { translate } from "../../translations/local";

export default function preRegistrationStepScreen({navigation}) {


    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }
    const enfant = () => {
      navigation.navigate('Registration')
  }
  const parent = () => {
    navigation.navigate('RegistrationParent')
}
    return (
        
        
            <View style={styles.container}>
            
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                   
                <Image style={styles.logo} source={require('../../../assets/famyli.jpg')}/>
                <Text style={styles.titre}>{translate("WELCOME")}</Text>

                
                  <View>
                   
                        <TouchableOpacity
                            style={ styles.buttonActive }
                            onPress={() => enfant()}>
                            <Text style={styles.buttonTitleActive}>Rejoindre votre Famyli</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonInactive}
                            onPress={() => parent()}>
                            <Text style={styles.buttonTitleInactive}>Créer votre Famyli</Text>
                        </TouchableOpacity>
                        
    
                    </View>
                        
               
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>Already got an account ? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </KeyboardAwareScrollView>
            
            
          
        </View>
       
    )
}
