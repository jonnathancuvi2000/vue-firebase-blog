import { createStore } from 'vuex'
import app from '../firebase/firebaseInit'; // inicalizamos
import { getFirestore, doc, getDoc, updateDoc, terminate, collection, getDocs, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default createStore({
  state: {
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileEmail: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileIniitials: null,
  },
  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    oprenPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(post => post.blogID !== payload);
    },
    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileInfo(state, db_results) {
      console.log("they are de results of de consult");
      console.log(db_results.data())
      state.profileId = db_results.id;
      state.profileEmail = db_results.data().email;
      state.profileFirstName = db_results.data().firstName;
      state.profileLastName = db_results.data().lastName;
      state.profileUsername = db_results.data().username;
    },
    setProfileInitials(state) {
      state.profileIniitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") + state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      // link FIREBASE get data -> https://firebase.google.com/docs/firestore/query-data/get-data#web-version-9_1

      const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service
      const user = auth.currentUser; // https://firebase.google.com/docs/auth/web/manage-users#web-version-9

      const db = getFirestore(app);// Initialize Cloud Firestore and get a reference to the service
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.id);
        commit("setProfileInfo", docSnap);
        commit("setProfileInitials");
      } else {
        // doc.data() will be undefined in this case
        console.log("---------------- No such document!");
      }
    },
    async getPost({ state }) {
      // Initialize Cloud Firestore and get a reference to the service
      const db = getFirestore(app);
      const dbResults = await getDocs(collection(db, "blogPosts"));

      dbResults.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    async updatePost({ commit, dispatch }, payload) {
      commit('filterBlogPost', payload);
      await dispatch('getPost'); // dispatch allows us to get the actions in this case the action is located right above this
    },
    async deletePost({ commit }, payload) {
      // we use commit her to get the mutations from here
      const db = getFirestore(app);// Initialize Cloud Firestore and get a reference to the service
      const deleteBlog = await deleteDoc(doc(db, "blogPosts", payload));
      commit('filterBlogPost', payload);

    },
    async updateUserSettings({ commit, state }) {
      const db = getFirestore(app);// Initialize Cloud Firestore and get a reference to the service
      const dataBase = doc(db, "users", state.profileId);

      await updateDoc(dataBase, {
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitials");

    }
  },
  modules: {
  }
})
