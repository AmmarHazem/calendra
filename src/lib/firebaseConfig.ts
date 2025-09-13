import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBxN-KR4idez99_NcdbvImVUavkx-yegRE",
  authDomain: "calendra-4eb94.firebaseapp.com",
  projectId: "calendra-4eb94",
  storageBucket: "calendra-4eb94.firebasestorage.app",
  messagingSenderId: "600396470230",
  appId: "1:600396470230:web:becc3f9ec4a73f99637677",
});

export const googleProvider = new GoogleAuthProvider();

export const fireAuth = getAuth(firebaseApp);
