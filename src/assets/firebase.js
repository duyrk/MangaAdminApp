import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyD0CuJ3nmXVeCUWUWLt4FrnlV8Z-AFt-jc",
  authDomain: "mangaapp-ce074.firebaseapp.com",
  projectId: "mangaapp-ce074",
  storageBucket: "mangaapp-ce074.appspot.com",
  messagingSenderId: "903978534235",
  appId: "1:903978534235:web:dc26f6aebc463a37b5867e",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
