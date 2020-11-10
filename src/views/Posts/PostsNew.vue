<template>
  <div class="posts-new">
    <h1>New Post</h1>
    <form v-on:submit.prevent="createPost()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Title: <input type="text" v-model="newPostTitle" /> Body:
      <input type="text" v-model="newPostBody" /> Address:
      <input type="text" v-model="newPostAddress" /> Image:
      <input type="text" v-model="newPostUrl" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      newPostTitle: "",
      newPostBody: "",
      newPostAddress: "",
      newPostUrl: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createPost: function() {
      var params = {
        title: this.newPostTitle,
        body: this.newPostBody,
        address: this.newPostAddress,
        image_url: this.newPostUrl,
      };
      axios
        .post("/api/posts", params)
        .then((response) => {
          console.log("posts create", response);
          this.$router.push("/posts");
        })
        .catch((error) => {
          console.log("posts create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
