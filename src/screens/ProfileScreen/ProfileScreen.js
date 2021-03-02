import React, { useEffect, useState } from 'react'
import { Alert, Button,FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../firebase/config'
import { translate } from "../../translations/local";

export default function ProfileScreen(props) {

    const [newname, setName] = useState(props.extraData.fullName)
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('users')
    const userID = props.extraData.id
    const groupID = props.extraData.group
    const currentname = props.extraData.fullName

    const [image, setImage] = useState(null);

    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
      })();
    }, []);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchCameraAsync({
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
       // setImage(result.uri);
        uploadImage(result.uri,userID)
        Alert.alert('Avatar Changed')
      }
    };
      
      uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        
        var ref = firebase.storage().ref().child("avatars/" + imageName);
        return ref.put(blob);
      }

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={currentname}
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setName(text)}
                    value={newname}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>{translate("ADD")}</Text>
                </TouchableOpacity>

                <Button title="Choose image..." onPress={pickImage} />
            </View>
        </View>
    )
}
