import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyDH0KZ742Hu2PanAdWndXbbdh3eTBWyLjs",
  authDomain: "famyli-6362f.firebaseapp.com",
  databaseURL: "https://famyli-6362f.firebaseio.com",
  projectId: "famyli-6362f",
  storageBucket: "famyli-6362f.appspot.com",
  messagingSenderId: "1014207360815",
  appId: "1:1014207360815:web:56b9e081bf7b30e1fbfbda"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
