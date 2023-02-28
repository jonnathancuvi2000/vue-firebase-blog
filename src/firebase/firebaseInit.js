import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// https://firebase.google.com/docs/auth/web/start#web-version-9_1
// https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    // ...
    apiKey: "AIzaSyANo0uLQRXynv2KLn_8Xx-7ahDRQ6gmmEs",
    authDomain: "fireblogsyt-ef412.app.com",
    projectId: "fireblogsyt-ef412",
    storageBucket: "fireblogsyt-ef412.appspot.com",
    messagingSenderId: "680510015960",
    appId: "1:680510015960:web:c8d5f08506e3d8927e8aad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;










{/* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyANo0uLQRXynv2KLn_8Xx-7ahDRQ6gmmEs",
    authDomain: "fireblogsyt-ef412.app.com",
    projectId: "fireblogsyt-ef412",
    storageBucket: "fireblogsyt-ef412.appspot.com",
    messagingSenderId: "680510015960",
    appId: "1:680510015960:web:c8d5f08506e3d8927e8aad"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script> */}