import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// // Auth functions
// export const signUpWithEmail = (email, password) => 
//   createUserWithEmailAndPassword(auth, email, password);

// export const logInWithEmail = (email, password) => 
//   signInWithEmailAndPassword(auth, email, password);

// export const logInWithGoogle = () => 
//   signInWithPopup(auth, googleProvider);

// export const resetPassword = (email) => 
//   sendPasswordResetEmail(auth, email);

// export const updateUserProfile = (profile) => 
//   updateProfile(auth.currentUser, profile);


// export const onAuthChange = (callback) => 
//   onAuthStateChanged(auth, callback);


export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const logInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logInWithGoogle = () =>
  signInWithPopup(auth, googleProvider);

export const resetPassword = (email) =>
  sendPasswordResetEmail(auth, email);

export const firebaseLogOut = () =>
  signOut(auth);

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);

export const updateUserProfile = (data) =>
  updateProfile(auth.currentUser, data);
export const logOut = () => signOut(auth);
