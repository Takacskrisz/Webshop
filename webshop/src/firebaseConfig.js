// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const REACT_APP_FIREBASE_API_KEY="AIzaSyAeB3mi0nQu9js0a3V4-__TSG62YV9kY4Y"
const REACT_APP_FIREBASE_AUTH_DOMAIN="webshop-463af.firebaseapp.com"
const vREACT_APP_FIREBASE_DATABASE_URL="https://webshop-463af-default-rtdb.europe-west1.firebasedatabase.app"
const REACT_APP_FIREBASE_PROJECT_ID="webshop-463af"
const REACT_APP_FIREBASE_STORAGE_BUCKET="webshop-463af.appspot.com"
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID="1012130637288"
const REACT_APP_FIREBASE_APP_ID="1:1012130637288:web:0a302e7cb06365b80af05d"
const REACT_APP_FIREBASE_MEASUREMENT_ID="G-N95L5ZW5DX"


const firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: vREACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb=getStorage(app)
export const storeDb=getFirestore(app)

export default app