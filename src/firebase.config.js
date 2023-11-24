import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRMW9SqTayvYuJkACYZQ7fG7REX7vjDf0",
  authDomain: "house-marketplace-app-bd283.firebaseapp.com",
  projectId: "house-marketplace-app-bd283",
  storageBucket: "house-marketplace-app-bd283.appspot.com",
  messagingSenderId: "100914976561",
  appId: "1:100914976561:web:9b05cba387620107298210"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
export const db =  getFirestore()