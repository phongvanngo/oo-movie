// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB822qyknDo8GDPTkejgh1YPkLRp8VehME',
  authDomain: 'tmovie-authen.firebaseapp.com',
  projectId: 'tmovie-authen',
  storageBucket: 'tmovie-authen.appspot.com',
  messagingSenderId: '815180203739',
  appId: '1:815180203739:web:a5ca39b8755d6ea9c72efe',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export { firebase };
