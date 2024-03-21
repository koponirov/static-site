// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCghLzs0TXy_S9o43xWjIlbjF84S1tkgqA",
  authDomain: "web-push-70b46.firebaseapp.com",
  projectId: "web-push-70b46",
  storageBucket: "web-push-70b46.appspot.com",
  messagingSenderId: "558360177347",
  appId: "1:558360177347:web:22900be921b184d4551076"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const vapidKey = 'BKXydzMkHq6TLZSNSpLQpC2STYwCAlry0ucB56ci7hO1PPeMiKP1VtWG_Zg1CszbJAC_bbQgrfkBrmNccLtU5Z8';
