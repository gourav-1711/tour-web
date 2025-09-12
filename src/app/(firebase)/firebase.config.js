// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
console.log(firebaseConfig , process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// const firebaseConfig = {
//   apiKey: "AIzaSyAtbDfKWnYc2Kx_THyx2efBDkfVWfWNiow",
//   authDomain: "song-64d4a.firebaseapp.com",
//   databaseURL: "https://song-64d4a-default-rtdb.firebaseio.com",
//   projectId: "song-64d4a",
//   storageBucket: "song-64d4a.firebasestorage.app",
//   messagingSenderId: "514910186591",
//   appId: "1:514910186591:web:15af49e87cf98cea053fea"
// };
