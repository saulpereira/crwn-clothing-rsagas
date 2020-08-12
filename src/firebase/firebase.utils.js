import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBNCoHuUv5ycbOu-7AA7cdS1j8aZbvLo54",
    authDomain: "crwn-db-9850b.firebaseapp.com",
    databaseURL: "https://crwn-db-9850b.firebaseio.com",
    projectId: "crwn-db-9850b",
    storageBucket: "crwn-db-9850b.appspot.com",
    messagingSenderId: "878231926683",
    appId: "1:878231926683:web:c536c010354e92be91d33e",
    measurementId: "G-JGKNR35T00"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })

    } catch (error) {
        console.log('error creating user', error.message)
    }
  }

  return userRef;
}

firebase.initializeApp(config);


export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;