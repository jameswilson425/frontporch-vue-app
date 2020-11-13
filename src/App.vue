<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/users/signup" v-if="!isLoggedIn()">Signup</router-link>
      |

      <router-link to="/users/login" v-if="!isLoggedIn()">Login</router-link> |
      <router-link to="/users/logout" v-if="isLoggedIn()">Logout</router-link> |
      <!-- <router-link :to="`/users/${user.id}`">Profile</router-link> | -->
      <router-link :to="`/users/${getUserId()}`" v-if="isLoggedIn()"
        >Profile</router-link
      >
      | <router-link to="/posts">All Posts</router-link> |
      <router-link to="/posts/new">New Post</router-link> |
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
img {
  width: 250px;
}
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
