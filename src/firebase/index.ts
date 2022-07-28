// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCkiSmee9uuJorm8BcZMZrP1iK4-4kSrlU",
  authDomain: "am-143.firebaseapp.com",
  projectId: "am-143",
  storageBucket: "am-143.appspot.com",
  messagingSenderId: "226544980206",
  appId: "1:226544980206:web:c29eb3dc4659be1fce63ff",
  measurementId: "G-X94JJHEYEV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
