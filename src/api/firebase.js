// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB822qyknDo8GDPTkejgh1YPkLRp8VehME',
  authDomain: 'tmovie-authen.firebaseapp.com',
  projectId: 'tmovie-authen',
  storageBucket: 'tmovie-authen.appspot.com',
  messagingSenderId: '815180203739',
  appId: '1:815180203739:web:a5ca39b8755d6ea9c72efe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
