import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD6_wyqLON39ZSR1VU1APz3k6FxoP3jKH4",
    authDomain: "pdfbot-a021d.firebaseapp.com",
    projectId: "pdfbot-a021d",
    storageBucket: "pdfbot-a021d.appspot.com",
    messagingSenderId: "994839452806",
    appId: "1:994839452806:web:cdc90d91be07ddb98f8507"
  };

  const app=getApps().length===0?initializeApp(firebaseConfig):getApp();
  const db=getFirestore(app);
  const storage=getStorage(app);

  export {db,storage};
