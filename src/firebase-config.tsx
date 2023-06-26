import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB4b9tFZiZDed8ZzHWuYliA3rBtmkykhow", //!gerçek projede bu özellikleri paylaşmamam gerekiyor
    authDomain: "im-hungry-927c9.firebaseapp.com",
    projectId: "im-hungry-927c9",
    storageBucket: "im-hungry-927c9.appspot.com",
    messagingSenderId: "569802747376",
    appId: "1:569802747376:web:a3963dd02a2c1ee0a50135",
    measurementId: "G-CRL6JRZEL8"
  };

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)