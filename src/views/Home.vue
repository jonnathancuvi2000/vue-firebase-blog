<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
        </div>
      </div>
    </div>

    <div v-if="!user" class="updates">
      <div class="container">
        <h2>never miss a post. Register for your free account today!</h2>
        <router-link class="router-button" :to="{ name: 'Login' }"> Register for FireBlogs <span class="arrow"> -></span> </router-link>
      </div>
    </div>

  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
export default {
  name: "Home",
  components: { BlogPost, BlogCard },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
        welcomeScreen: true,
        photo: "coding",
      },
      sampleBlogPost: [
        {
          title: "Tis is going to be deleted",
          blogHTML: "Tis is going to be deleted",
          blogCoverPhoto: "beautiful-stories",
        },
        {
          title: "TITLE 44",
          blogHTML: "Tis is going to be deleted",
          blogCoverPhoto: "designed-for-everyone",
        }
      ],


    };
  },
  computed: {
    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    }, blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },
    user() {
      return this.$store.state.user;
    }
  }

};
</script>


<style scoped>
.blog-card-wrap h3 {
  font-weight: 300;
  font-size: 28px;
  margin-bottom: 32px;
}

.updates .container {
  padding: 100px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.updates .container .router-button {
  display: flex;
  font-size: 14px;
  text-decoration: none;
}

.updates .container h2 {
  font-weight: 300;
  font-size: 32px;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;

}
</style>