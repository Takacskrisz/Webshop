// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeB3mi0nQu9js0a3V4-__TSG62YV9kY4Y",
  authDomain: "webshop-463af.firebaseapp.com",
  databaseURL: "https://webshop-463af-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "webshop-463af",
  storageBucket: "webshop-463af.appspot.com",
  messagingSenderId: "1012130637288",
  appId: "1:1012130637288:web:0a302e7cb06365b80af05d",
  measurementId: "G-N95L5ZW5DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app