// export const firebaseConfig = {
//   // Your web app's Firebase configuration here
//   // See https://firebase.google.com/docs/web/setup#add-sdks-initialize
//   apiKey: 'API_KEY',
//   authDomain: 'PROJECT_ID.firebaseapp.com',
//   databaseURL: 'https://PROJECT_ID.firebaseio.com',
//   projectId: 'PROJECT_ID',
//   storageBucket: 'PROJECT_ID.appspot.com',
//   messagingSenderId: 'SENDER_ID',
//   appId: 'APP_ID',
//   measurementId: 'G-MEASUREMENT_ID'
// };
//
// export const vapidKey = '<YOUR_PUBLIC_VAPID_KEY_HERE>';

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
