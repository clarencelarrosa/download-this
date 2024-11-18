import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCkgCRgVLCl36t7VpBP8vcwunu5UsqEi7o",
    authDomain: "gender-height.firebaseapp.com",
    projectId: "gender-height",
    storageBucket: "gender-height.firebasestorage.app",
    messagingSenderId: "912504830733",
    appId: "1:912504830733:web:59f61d17a96d17d70a8e44",
    measurementId: "G-31XJLJ05FL"
}

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db }