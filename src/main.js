import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebase/firebaseInit'; // inicalizamos


const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log("Usuarion LOGUEADO");
    const uid = user.uid;
    console.log("In main.js -> " + uid);
    // ...
  } else {
    console.log("Usuarion NO Logueado");
    // User is signed out
    // ...
  }

  createApp(App).use(store).use(router).mount('#app'); // this is the only thing that it was the other thinks were not 

});


