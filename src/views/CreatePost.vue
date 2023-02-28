<template>
  <div class="create-post">
    <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
    <Loading v-show="loading"/>
    <div class="container">

      <div :class="{'invisible': !error}" class="err-message">
        <p><span>Error:</span>{{this.errorMsg}}</p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" @change="fileChange" id="blog-photo" accept=".png, .jpg, .jpeg">
          <button @click="openPreview" class="preview"
            :class="{'button-inactive': !this.$store.state.blogPhotoFileURL}">Preview
            Photo</button>
          <span>File Choosen: {{this.$store.state.blogPhotoName}}</span>
        </div>
      </div>

      <div class="editor">
        <VueEditor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler
          @image-added="imageHandler" />
      </div>

      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{name: 'BlogPreview'}">Post Preview</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue3-editor";
import BlogCoverPreview from "@/components/BlogCoverPreview.vue"; // this de las version for VUE 3 -> https://www.npmjs.com/package/vue3-editor
import Loading from '../components/Loading.vue'

import app from '../firebase/firebaseInit'; // inicalizamos
import { getFirestore, doc, setDoc } from "firebase/firestore";// para almacenar los datos del usuario en Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { uuid } from 'vue-uuid' // Import uuid  to create ID for eache BLOG
// import Quill from "quill";
// window.Quill = Quill;
// const ImageResize = require("quill-image-resize-module").default;

// // import { ImageResize } from 'quill-image-resize-module';

// Quill.register('modules/imageResize', ImageResize);


export default {
  namew: "CreatePost",
  components: { VueEditor, BlogCoverPreview, Loading },
  data() {
    return {
      uuid: uuid.v1(),
      file: null,
      error: null,
      errorMsg: null,
      loading: null,
      editorSettings: {
        modules: {
          // ImageResize: {},
        },
      },
    };
  },
  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file)) // creamos la URL de la foto
    },
    openPreview() {
      this.$store.commit('oprenPhotoPreview');
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {

      // https://firebase.google.com/docs/storage/web/upload-files


      // Initialize Cloud Storage and get a reference to the service
      const storage = getStorage(app);
      // Create a child reference
      const storageRef = ref(storage, `documents/blogPostPhotos/${file.name}`);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!' + snapshot);
      }, (err) => {
        console.log(err)
      })
        .then(async () => {
          const downloadURL = await getDownloadURL(storageRef); // getDownloadURL(ref(storage, 'images/stars.jpg'))
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }).catch(err => {
          alert('there is an errro when your try to take de URL ima! ' + err)
        });
    },
    uploadBlog() {
      if (this.blogTitle.lenght !== 0 && this.blogHTML.lenght !== 0) {
        if (this.file) {
          this.loading = true;
          // https://firebase.google.com/docs/storage/web/upload-files
          // Initialize Cloud Storage and get a reference to the service
          const storage = getStorage(app);
          // Create a child reference
          const storageRef = ref(storage, `documents/BlogCoverPhotos/${this.$store.state.blogPhotoName}`);
          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, this.file).then((snapshot) => {
            console.log('Uploaded a Blog Cover File!' + snapshot);
          }, (err) => {
            console.log(err);
            this.loading = false;
          })
            .then(async () => {
              const downloadURL = await getDownloadURL(storageRef); // getDownloadURL(ref(storage, 'images/stars.jpg'))
              const timestamp = await Date.now();
              console.log('this de URL ------>  ' + downloadURL)

              var id_blog = this.uuid; // with this we create an Id for eache BLOG
              // Initialize Cloud Firestore and get a reference to the service
              const db = getFirestore(app);
              // Add a new document in collection "cities"
              await setDoc(doc(db, "blogPosts", id_blog), {
                blogID: id_blog,
                blogHTML: this.blogHTML,
                blogCoverPhoto: downloadURL,
                blogCoverPhotoName: this.blogCoverPhotoName,
                blogTitle: this.blogTitle,
                profileId: this.profileId,
                date: timestamp,
              });
              await this.$store.dispatch('getPost'); // obtenemos de nuevo la informacion de la base de datos para obtener el utlimo dato ingresado
              this.loading = false;
              this.$router.push({ name: "ViewBlog", params: {blogid: id_blog} });
            }).catch(err => {
              alert('there is an errro when your try to take de URL ima! ' + err)
            });
            return;
        }
        this.error = true;
        this.errorMsg = 'Please ensure yor uploa a cover photo!'
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = 'Please ensure Blog Title and Blog Post has been filled!'
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    }
  },
  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit('updateBlogTitle', payload);
      }
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit('newBlogPost', payload);
      }
    }
  }

}
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: rgb(246, 81, 81);
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
