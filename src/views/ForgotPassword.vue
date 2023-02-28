<template>
    <!-- minuto 2:35 -->
    <div class="reset-password">

        <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:click-modal="closeModal" />

        <Loading v-if="loading" />

        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    Back to
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>
                <h2>Reset Password</h2>
                <p>Forgot your passowrd? Enter your email to reset it</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email" />
                        <email class="icon" />
                    </div>
                </div>
                <button @click.prevent="reserPassword">Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.vue';
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'

import app from '../firebase/firebaseInit'; // inicalizamos
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default {
    name: 'ForgotPassword',
    data() {
        return {
            email: "",
            modalMessage: '',
            modalActive: false,
            loading: null
        }
    },
    components: {
        email,
        Modal,
        Loading
    },
    methods: {
        reserPassword() {
            // minuto 3:09
            // link firebase -> https://firebase.google.com/docs/auth/web/manage-users#web-version-9_9
            // la nueva clave de  jonnathancuvi@gmail.com es 090825212
            this.loading = true;

            const auth = getAuth(app);
            sendPasswordResetEmail(auth, this.email)
                .then(() => {
                    this.modalMessage = "If your account exists, you will receive a email!";
                    this.loading = false;
                    this.modalActive = true;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    this.modalMessage = errorMessage;
                    this.loading = false;
                    this.modalActive = true;

                });
        },
        closeModal() {
            this.modalActive = false;
            // this.email = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.reset-password {
    position: relative;

    .form-wrap {
        .reset {
            h2 {
                margin-bottom: 8px;
            }

            p {
                text-align: center;
                margin-bottom: 32px;
            }
        }
    }
}
</style>