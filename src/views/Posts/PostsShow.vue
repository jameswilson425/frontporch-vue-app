<template>
  <div class="posts-show">
    <h2>{{ post.title }}</h2>
    <img v-bind:src="post.image_url" v-bind:alt="post.title" />
    <p>Location: {{ post.address }}</p>
    <p>Details: {{ post.body }}</p>
    <router-link v-bind:to="`/posts/${post.id}/edit`">Edit post</router-link>
    <br />
    <router-link to="/posts">Back to all posts</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      post: {},
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then((response) => {
      console.log("posts show", response);
      this.post = response.data;
    });
  },
  methods: {},
};
</script>
