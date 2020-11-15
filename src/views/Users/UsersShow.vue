<template>
  <div class="users-show">
    <h2>{{ user.user_name }}</h2>
    <img :src="user.profile_image" alt="" />
    <p>Email: {{ user.email }}</p>
    <p>Address: {{ user.address }}</p>
    <p>Bio: {{ user.bio }}</p>
    <router-link v-bind:to="`/users/${user.id}/edit`">Edit Profile</router-link>
    <h2>Activity</h2>
    <p>Posts: {{ user.posts }}</p>
    <p>Replies: {{ user.replies }}</p>

    <!-- <h2>Your Posts</h2>
    <div v-for="post in posts">
      <div v-if="post.user_id == user.id"></div>
      <router-link :to="`/posts/${post.id}`">{{ post.title }}</router-link>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      posts: [],
      errors: [],
    };
  },
  created: function() {
    this.showUser();
  },
  methods: {
    showUser: function() {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
  },
};
</script>
