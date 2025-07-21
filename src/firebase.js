import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChEd36lmmdjHbh6Qa62DFCXdbozCnjENE",
  authDomain: "formapp-21f85.firebaseapp.com",
  projectId: "formapp-21f85",
  storageBucket: "formapp-21f85.firebasestorage.app",
  messagingSenderId: "632064546717",
  appId: "1:632064546717:web:feaf98423afb0583ffc174"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };