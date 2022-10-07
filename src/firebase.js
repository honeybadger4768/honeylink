// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore, doc, setDoc, getDoc} from "firebase/firestore"
import {firebaseConfig as fbsconfig} from "./firebase.config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = fbsconfig

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)

export const saveLink = async (code, target) => {
    try {
        const ref = doc(firestore, "links", code)
        if ((await getDoc(ref)).exists()) {
            return {status: false, no: 2}
        } else {
            await setDoc(ref, {
                target: target
            })
            return {status: true, no: 1, code: code}
        }
    } catch (e) {
        return {status: false, no: 0}
    }
}

export const controlCode = async (code) =>{
    try{
        const ref = doc(firestore, "links", code)
        const data = await getDoc(ref)
        if(data.exists()){
            return {status: true, no: 2, target: data.data()?.target}
        } else{
            return {status: false, no: 1}
        }
    } catch (e) {
        console.log(e)
        return {status: false, no: 0}
    }
}
