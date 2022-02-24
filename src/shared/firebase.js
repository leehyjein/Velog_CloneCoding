// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnPMciX0d8AdP0mRcAsObw0RSSVMeeBMk",
  authDomain: "velog-clone.firebaseapp.com",
  projectId: "velog-clone",
  storageBucket: "velog-clone.appspot.com",
  messagingSenderId: "237767826671",
  appId: "1:237767826671:web:bb6686b791662443354f1a",
  measurementId: "G-2KKCJC24LE"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const storage = getStorage();

export { storage };