import 'react-native-gesture-handler';
import React, { useEffect, useState, Component, Fragment } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ProfileScreen, LoginScreen, HomeScreen, RegistrationScreen, preRegistrationStepScreen, RegistrationStepScreen } from './src/screens'
import { Button } from 'react-native'
import { Icon } from 'react-native-elements'

import {decode, encode} from 'base-64'


  console.ignoreYellowBox = [
   'Setting a timer'
  ];
 

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
            <Stack.Screen name="Home" options={({ navigation }) => ({
              title: 'Home',
              headerStyle: {
                backgroundColor: '#ffffff',
                elevation:0,
                shadowOpacity: 0
              },
              headerTintColor: '#000000',
              headerRight: () => (
                <Icon
                  onPress={() => navigation.navigate('profile')}
                  name="user"
                  containerStyle={{padding:16}}
                  type="font-awesome"
                />
              ),
            })}>
              {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>

          <Stack.Screen name="profile" options={({ navigation }) => ({
              title: 'Profile',
              headerStyle: {
                backgroundColor: '#ffffff',
                elevation:0,
                shadowOpacity: 0
              },
              headerTintColor: '#000',
              
            })}>
              {props => <ProfileScreen {...props} extraData={user} />}
            </Stack.Screen>
          </>
          






          

        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerTitle: '', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#ffffff' }}}/>
            <Stack.Screen name="Registration"  component={RegistrationStepScreen} options={{headerTitle: '', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#ffffff' }}}/>
            <Stack.Screen name="RegistrationParent"  component={RegistrationScreen} options={{headerTitle: '', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#ffffff' }}}/>
            <Stack.Screen name="preRegistration" component={preRegistrationStepScreen} options={{headerTitle: '', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#ffffff' }}}/>
            <Stack.Screen name="profile" component={ProfileScreen} options={{headerTitle: '', headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: '#ffffff' }}}/>

          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
