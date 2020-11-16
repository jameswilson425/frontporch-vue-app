<template>
  <div class="posts-index">
    <h1>All Posts</h1>
    <div v-for="post in posts">
      <h2>{{ post.title }}</h2>
      <small class="text-muted"
        >Created {{ relativeDate(post.created_at) }}</small
      >
      <br />
      <img v-bind:src="post.image_url" v-bind:alt="post.title" />
      <p>Location: {{ post.address }}</p>
      <p>Instrument(s):</p>
      <div v-for="instrument in post.instruments">
        {{ instrument.name }}
      </div>

      <router-link v-bind:to="`/posts/${post.id}`">View Post</router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      posts: [],
      instruments: [],
    };
  },
  created: function() {
    axios.get("/api/posts").then((response) => {
      console.log("posts index", response);
      this.posts = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
