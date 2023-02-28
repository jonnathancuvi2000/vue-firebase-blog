<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Already have an account?
                <router-link class="router-link" :to="{name: 'Login'}"> Login</router-link>
            </p>
            <h2>Create your FireBLog Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName">
                    <user class="icon" />
                </div>

                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName">
                    <user class="icon" />
                </div>

                <div class="input">
                    <input type="text" placeholder="Usernam" v-model="username">
                    <user class="icon" />
                </div>

                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <email class="icon" />
                </div>

                <div class="input">
                    <input type="password" placeholder="Password" v-model="password">
                    <password class="icon" />
                </div>

                <div v-show="error" class="error">{{this.errorMsg}}</div>

            </div>
            <!-- we use prevent in the button because in tat way the page will not charged again -->
            <button @click.prevent="register">Sing Up</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script>

import email from '../assets/Icons/envelope-regular.vue';
import password from '../assets/Icons/lock-alt-solid.vue';
import user from '../assets/Icons/user-alt-light.vue';

import app from '../firebase/firebaseInit'; // inicalizamos
import { getFirestore, doc, setDoc } from "firebase/firestore";// para almacenar los datos del usuario en Firebase
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";// para registrar el correo y la contrasena

export default {
    name: 'Register',
    components: {
        email,
        password,
        user
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            error: null,
            errorMsg: "",
        };
    },
    methods: {
        async register() {
            if (
                this.email !== "" &&
                this.password !== "" &&
                this.firstName !== "" &&
                this.lastName !== "" &&
                this.username !== ""
            ) {
                this.error = false;
                this.errorMsg = "";

                // Initialize Firebase Authentication and get a reference to the service
                const auth = getAuth(app);
                const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password);
                const result = await createUser;

                // Initialize Cloud Firestore and get a reference to the service
                const db = getFirestore(app);
                // Add a new document in collection "cities"
                await setDoc(doc(db, "users", result.user.uid), {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    email: this.email,
                });
               
                this.$router.push({ name: "Home" });
                return;
            }
            this.error = true;
            this.errorMsg = "Please fill out all the fields!";
            return;
        },
    }
}
</script>

<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;
    }
}
</style>