import { initializeApp } from "firebase/app"

import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDASSeyq7TlnTtIwD_AvW2AKqE-kDbaPhI",
  authDomain: "market-place-d161d.firebaseapp.com",
  projectId: "market-place-d161d",
  storageBucket: "market-place-d161d.firebasestorage.app",
  messagingSenderId: "196622513454",
  appId: "1:196622513454:web:ba4ec7896446cde8b7b6bf",
  measurementId: "G-X189TC75NE"
};
const app = initializeApp(firebaseConfig)


export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({

    prompt: "select_account",

})