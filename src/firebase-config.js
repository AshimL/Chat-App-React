
import { initializeApp } from "firebase/app";

import {getAuth, GoogleAuthProvider, } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBjU3uH_ecY44LOlSfdWK8RrJRMssL8CAE",
  authDomain: "chat-app-22f48.firebaseapp.com",
  projectId: "chat-app-22f48",
  storageBucket: "chat-app-22f48.firebasestorage.app",
  messagingSenderId: "424954840950",
  appId: "1:424954840950:web:93b820689fb320c248dc57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider();



