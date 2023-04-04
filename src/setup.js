// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrGQKA8bga-aFCOpKkb8rF8DvMoXB_n8Q",
  authDomain: "please-wait-2325.firebaseapp.com",
  databaseURL: "https://please-wait-2325-default-rtdb.firebaseio.com",
  projectId: "please-wait-2325",
  storageBucket: "please-wait-2325.appspot.com",
  messagingSenderId: "541470657258",
  appId: "1:541470657258:web:b8ba96f6e56856f2d6a593",
  measurementId: "G-TL6329719K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);

export function addEmail(email){
    const oEmail = email;
    const flawedEmail = email.replace(/\./g, 'µ');
    const emailRef = ref(database, 'emails/' + flawedEmail);
    try{
        set(emailRef, {
            send: true,
            email: oEmail,
        });
    }
    catch(e) {
        console.log(e);
    }
}

const valuesRef = ref(database, 'values');

export let valueObjectSubscriberList = [];;

get(valuesRef).then(snapshot => {
    if(snapshot.exists()){
        valueObjectSubscriberList.forEach(f => f(snapshot.val()));
        console.log(snapshot.val());
    } else {
        console.log("No values");
    }
}).catch(error => console.error(error));