import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD4cPJ4Z-WcUKcVG1ehvayMuWvZdy5vKUw',
  authDomain: 'next-6b573.firebaseapp.com',
  projectId: 'next-6b573',
  storageBucket: 'next-6b573.appspot.com',
  messagingSenderId: '373305147042',
  appId: '1:373305147042:web:26e44b6cb1977ce66c61fb',
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const db = app.firestore();

export default db;

// import * as firebase from 'firebase/app';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyD4cPJ4Z-WcUKcVG1ehvayMuWvZdy5vKUw',
//   authDomain: 'next-6b573.firebaseapp.com',
//   projectId: 'next-6b573',
//   storageBucket: 'next-6b573.appspot.com',
//   messagingSenderId: '373305147042',
//   appId: '1:373305147042:web:26e44b6cb1977ce66c61fb',
// };

// const app = !firebase.initializeApp(firebaseConfig) && firebase.initializeApp(firebaseConfig);
// const db = app.firestore();

// export default db;
