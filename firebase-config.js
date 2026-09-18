// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyDdiX3qVQl4rxQPXMdin0Zt1xA0nI7Shk4",

  authDomain: "hgvrequest.firebaseapp.com",

  projectId: "hgvrequest",

  storageBucket: "hgvrequest.firebasestorage.app",

  messagingSenderId: "382442573607",

  appId: "1:382442573607:web:96d3303b01e3fce996e302",

  measurementId: "G-Z51N7QKV68"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);