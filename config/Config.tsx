import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";
import { getAuth} from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDWEMzN6aOmXAyIJzhJsosKe-ll8oicAFg",
  authDomain: "evaluacion1-cdb65.firebaseapp.com",
  databaseURL: "https://evaluacion1-cdb65-default-rtdb.firebaseio.com",
  projectId: "evaluacion1-cdb65",
  storageBucket: "evaluacion1-cdb65.appspot.com",
  messagingSenderId: "98817539951",
  appId: "1:98817539951:web:1b163d7eed3a8a633cb29a"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
//export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const storage = getStorage(app);

