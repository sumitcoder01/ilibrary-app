import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAeVykIIYTKxnGa6P6O2QTdOzkx7Gl-Blc",
  authDomain: "ilibrary-app.firebaseapp.com",
  projectId: "ilibrary-app",
  storageBucket: "ilibrary-app.appspot.com",
  messagingSenderId: "127162217351",
  appId: "1:127162217351:web:0d60d86050257135e79922"
};


export const app = initializeApp(firebaseConfig);