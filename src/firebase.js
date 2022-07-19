// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "ecomerce-325cc.firebaseapp.com",
  projectId: "ecomerce-325cc",
  storageBucket: "ecomerce-325cc.appspot.com",
  messagingSenderId: "872349594498",
  appId: "1:872349594498:web:500b0a1fc5a3c44413559b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
