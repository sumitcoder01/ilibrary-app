import { initializeApp } from "firebase/app";
const {API_KEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,SENDER_ID,APP_ID,DATABASE_URL} = process.env;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain:AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket:STORAGE_BUCKET,
  messagingSenderId: SENDER_ID,
  appId: APP_ID,
  databaseURL:DATABASE_URL
};


export const app = initializeApp(firebaseConfig);