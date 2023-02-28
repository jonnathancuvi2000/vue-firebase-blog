<template>
    <!-- minuto 3:32 -->
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{name:  'Home'}">FireBlogs</router-link>
            </div>
            <div class="nav-links">
                <!-- if mobile is "false" it is going to hide the element below  -->
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                    <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                    <router-link class="link" :to="{ name: 'CreatePost' }">Create Posts</router-link>
                    <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
                </ul>

                <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                    <span>{{$store.state.profileIniitials}}</span>

                    <div v-show="profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="initials">{{$store.state.profileIniitials}}</p>
                            <div class="right">
                                <p>{{$store.state.profileFirstName}} {{$store.state.profileLastName}}</p>
                                <p>{{$store.state.profileUsername}}</p>
                                <p>{{$store.state.profileEmail}}</p>
                            </div>
                        </div>

                        <div class="options">
                            <div class="option">
                                <router-link class="option" :to="{name: 'Profile'}">
                                    <userIcon class="icon" />
                                    <p>Profile</p>
                                </router-link>
                            </div>
                            <div class="option">
                                <router-link class="option" :to="{name: 'Admin'}">
                                    <adminIcon class="icon" />
                                    <p>Admin</p>
                                </router-link>
                            </div>
                            <div @click="signOut" class="option">
                                <signOutIcon class="icon" />
                                <p>Sign Out</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>

        <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
                <router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
                <router-link class="link" :to="{ name: 'CreatePost' }">Create Posts</router-link>
                <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</router-link>
            </ul>
        </transition>

    </header>
</template>

<script>
import menuIcon from '../assets/Icons/bars-regular.vue';
import userIcon from '../assets/Icons/user-alt-light.vue';
import adminIcon from '../assets/Icons/user-crown-light.vue';
import signOutIcon from '../assets/Icons/sign-out-alt-regular.vue';

import { getAuth, signOut } from "firebase/auth";
import app from '../firebase/firebaseInit'; // inicalizamos


export default {
    name: "navigation",
    components: {
        menuIcon,
        userIcon,
        adminIcon,
        signOutIcon
    },
    data() {
        return {
            profileMenu: null,
            mobile: null,
            mobileNav: null,
            windownWith: null,
        }
    },
    created() {
        window.addEventListener('resize', this.checkScreen); // everytime that the size of the screen changes it is going to activate the function "this.checkScreen"
        this.checkScreen(); // this is for the app first run 
    },
    methods: { // aqui hay que hacer alguna accion para que se ejecuten las funciones
        checkScreen() {
            this.windownWith = window.innerWidth;
            if (this.windownWith < 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },

        toggleMobileNav() { // with this funtion we are goit to close or open the slide nav 
            this.mobileNav = !this.mobileNav;
        },

        toggleProfileMenu(e) {
            // console.log(e.target); // e.target -> this allows us to take de "div" taht we just clicked, in that case is 'profile'
            // console.log(this.$refs.profile) // this.$refs.profile -> this allows us to take de div where 'ref' is writen
            if (e.target === this.$refs.profile) { // if the two DIVs are teh same, the menu will close or will open
                this.profileMenu = !this.profileMenu;
            }
        },

        signOut() {
            // https://firebase.google.com/docs/auth/web/password-auth#web-version-9_2
            const auth = getAuth(app);
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log('Sign Out was succesfull..');
                // window.location.reload(); 
            }).catch((error) => {
                // An error happened.
            });
            
        }
    },

    computed: { // with this the funtions are gint to run por defecto 
        user(){
            return this.$store.state.user;
        }
    }

}

</script>

<style lang="scss" scoped>
header {
    background-color: white;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
    z-index: 99;
}

.link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;
}

.link:hover {
    color: #1eb8b8;
}

nav {
    display: flex;
    padding: 25px 0;
}

nav .branding {
    display: flex;
    align-items: center;
}


nav .branding .header {
    font-weight: 600;
    font-size: 24px;
    text-decoration: none;
}

nav .nav-links {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: flex-end;
}

nav .nav-links ul {
    margin-right: 32px;

}

nav .nav-links ul .link {
    margin-right: 32pz;
}

nav .nav-links ul .link:last-child {
    margin-right: 0;
}

nav {
    .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;

        span {
            pointer-events: none;
        }

        .profile-menu {
            position: absolute;
            top: 60px;
            right: 0;
            width: 250px;
            background-color: #303030;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

            .info {
                display: flex;
                align-items: center;
                padding: 15px;
                border-bottom: 1px solid #fff;

                .initials {
                    position: initial;
                    width: 40px;
                    height: 40px;
                    background-color: #fff;
                    color: #303030;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                }

                .right {
                    flex: 1;
                    margin-left: 24px;

                    p:nth-child(1) {
                        font-size: 14px;
                    }

                    p:nth-child(2),
                    p:nth-child(3) {
                        font-size: 12px;
                    }
                }
            }

            .options {
                padding: 15px;

                .option {
                    text-decoration: none;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    margin-bottom: 12px;

                    .icon {
                        width: 18px;
                        height: auto;
                    }

                    p {
                        font-size: 14px;
                        margin-left: 12px;
                    }

                    &:last-child {
                        margin-bottom: 0px;
                    }
                }
            }
        }

    }
}

.menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
}

.mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #303030;
    top: 0;
    left: 0;
}

.mobile-nav .link {
    padding: 15px 0;
    color: #fff;
}

.mobile-nav .link:hover {
    color: #1eb8b8;
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
    transition: all 1s ease;
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
    transform: translateX(-250px);

}
</style>