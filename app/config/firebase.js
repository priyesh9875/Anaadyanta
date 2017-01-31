// import and configure firebase
import * as firebase from 'firebase';

  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<APP_NAME>.firebaseapp.com",
    databaseURL: "https://<APP_NAME>.firebaseio.com",
    storageBucket: "<APP_NAME>.appspot.com",
    messagingSenderId: "<SENDER_ID>"
}
export const firebaseApp = firebase.initializeApp(config)

