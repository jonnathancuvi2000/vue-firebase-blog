<template>
    <div class="blog-wrapper" :class="{'no-user' : !user}">
        <div class="blog-content">
            <div>
                <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
                <h2 v-else>{{ post.blogTitle }}</h2>
                <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
                <p class="content-preview" v-else v-html="post.blogHTML"></p>
                <router-link class="link link-light" v-if="post.welcomeScreen" :to="{ name: 'Login' }">
                    Login/Register <span class="arrow arrow-light"> -></span>
                </router-link>
                <router-link class="link" v-else :to="{name: 'ViewBlog', params: {blogid: this.post.blogID}}">
                    View The Post <span class="arrow"> -></span>
                </router-link>
            </div>
        </div>
        <div class="blog-photo">
            <img v-if="post.welcomeScreen" :src="require(`../assets/blogPhotos/${post.photo}.jpg`)" alt="" />
            <img v-else :src="post.blogCoverPhoto" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: "blogPost",
    props: ["post"],
    computed: { // with this the funtions are gint to run por defecto 
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style scoped>
.blog-wrapper {
    display: flex;
    /* flex-direction: column; */
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    /* this was no before  */
    height: 90vh; 

}

.blog-wrapper .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
}

.blog-wrapper .blog-content div {
    max-width: 375px;
    padding: 72px 24px;
}

.blog-wrapper .blog-content div h2 {
    font-size: 32px;
    font-weight: 300;
    text-transform: uppercase;
    margin-bottom: 24px;
}

.blog-wrapper .blog-content div p {
    font-size: 15px;
    font-weight: 300;
    line-height: 1.7;
}

.blog-wrapper .blog-content div .content-preview {
    font-size: 13px;
    max-height: 24px;
    width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.blog-wrapper .blog-content div .link {
    display: inline-flex;
    align-items: center;
    margin-top: 32px;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    transition: 0.5s ease-in all;
}

.blog-wrapper .blog-content div .link:hover {
    border-bottom-color: #303030;
}

.blog-wrapper .blog-content div .link-light:hover {
    border-bottom-color: #ffff;
}

/* to the PHOTO */

.blog-wrapper .blog-photo {
    order: 1;
    flex: 3;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-wrapper .blog-photo img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

/* child */
.blog-wrapper:nth-child(even) .blog-content {
    order: 1;
}

.blog-wrapper:nth-child(even) .blog-photo {
    order: 2;
}


.no-user:first-child .blog-content {
    background-color: #303030;
    color: #fff;
}
</style>