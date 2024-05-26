// firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC12_pD3F-2375PV0uyq-Hoym8c7pLTp4g",
  authDomain: "petstore-monsif.firebaseapp.com",
  projectId: "petstore-monsif",
  storageBucket: "petstore-monsif.appspot.com",
  messagingSenderId: "290321583501",
  appId: "1:290321583501:web:7b7d03b4d246e69ccd01c4",
  measurementId: "G-77LS55VD59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };
