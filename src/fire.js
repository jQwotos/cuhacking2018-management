import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAtdDvjjdmmKjcjGX2rzewjzaQl5rUUN0Y",
    authDomain: "cuhacking-hackers.firebaseapp.com",
    databaseURL: "https://cuhacking-hackers.firebaseio.com",
    projectId: "cuhacking-hackers",
    storageBucket: "cuhacking-hackers.appspot.com",
    messagingSenderId: "1030339261611"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();
export {
  auth,
  db
};
