import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// App's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWbz_96-49N7_khgs8zV3X8_eF70KK3h8",
  authDomain: "tools-manufacturer-668e1.firebaseapp.com",
  projectId: "tools-manufacturer-668e1",
  storageBucket: "tools-manufacturer-668e1.appspot.com",
  messagingSenderId: "347414890086",
  appId: "1:347414890086:web:d38cc01a162fa459140fa7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
