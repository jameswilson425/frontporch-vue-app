<template>
  <div class="posts-index">
    <h1>All Posts</h1>
    <div v-for="post in posts">
      <h2>{{ post.title }}</h2>
      <!-- <img v-bind:src="post.image_url" v-bind:alt="post.title" /> -->
      <p>Location: {{ post.address }}</p>
      <router-link v-bind:to="`/posts/${post.id}`">View Post</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      posts: [],
    };
  },
  created: function() {
    axios.get("/api/posts").then((response) => {
      console.log("posts index", response);
      this.posts = response.data;
    });
  },
  methods: {},
};
</script>
