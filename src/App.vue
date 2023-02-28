<template>
  <div class="app-wrapper">
    <div class="app" v-if="this.$store.state.postLoaded">
      <Navigation v-if="!navigation" />
      <router-view />
      <Footer v-if="!navigation" />
    </div>
  </div>
</template>

<!-- INFORMACION "FIREBASE"
https://firebase.google.com/docs/auth/web/start#web-version-9_3
https://firebase.google.com/docs/firestore/manage-data/add-data#web-version-9 -->
  
<script>

import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './firebase/firebaseInit'; // inicalizamos

export default {
  name: "app",
  components: { Navigation, Footer },
  data() {
    return {
      navigation: null
    };
  },
  created() {

    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => { // https://firebase.google.com/docs/auth/web/manage-users#web-version-9
      this.$store.commit('updateUser', user);
      if (user) {
        this.$store.dispatch("getCurrentUser")
        const uid = user.uid;
        console.log("in App.vue"+uid);
      } else {
        console.log("Usuarion NO Logueado");
      }
    });

    this.checkRoute(); // here we initialize our funtion, as we are not calling it from anywhere 
    this.$store.dispatch('getPost'); // from here we call de function "getPost" that is located in "store/index.js", that is, running the funtion automacticaly
  },
  mounted() { },
  methods: {
    checkRoute() {
      if (this.$route.name === "Login" || this.$route.name === "Register" || this.$route.name === "ForgotPassword") {
        this.navigation = true;
        return;
      } this.navigation = false;
    }
  },
  watch: {// with this the funtion insid it will run
    $route() {// everytime the "route" changes, it is goinh to run de function "checkRoute" 
      this.checkRoute();
    }
  },
};
</script>
  
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  max-width: 1440px;
  margin: 0 auto;
}

.link {
  cursor: pointer;
  text-decoration: none;
  text-transform: uppercase;
  color: black;
}

.link-light {
  color: #fff;
}

.arrow {
  font-size: 12px;
  margin-left: 8px;
  width: 12px;
  fill: #000;
}

.arrow-light {
  fill: #fff;
}

/* BUTTON  */

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;
  /* :focus {
    }
    :hover {
    } */
}

button:focus,
.router-button:focus {
  outline: none;

}

button:hover,
.router-button:hover {
  background-color: rgba(48, 48, 48, 0.7);

}


.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
}

.button-ghost i {
  margin-left: 8px;

}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}


.error {
  text-align: center;
  font-size: 12px;
  color: red;
}

/* BLOG CARD  */
.blog-card-wrap {
  position: relative;
  padding: 80px 16px;
  background-color: #f1f1f1;

  @media (min-width: 500px) {
    padding: 100px 16px;
  }

  .blog-cards {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;

    @media (min-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 900px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1200px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>
  