<template>
  <div class="posts-edit">
    <h1>Edit Post</h1>
    <form v-on:submit.prevent="updatePost(post)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Title: <input type="text" v-model="post.title" /> Address:
      <input type="text" v-model="post.address" /> Body:
      <input type="text" v-model="post.body" /> Image:
      <input type="text" v-model="post.image_url" />
      <input type="submit" value="Update" />
      <button v-on:click="destroyPost()">
        Delete Post
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      post: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then((response) => {
      console.log("posts show", response);
      this.post = response.data;
    });
  },
  methods: {
    updatePost: function(post) {
      var params = {
        title: post.title,
        address: post.address,
        body: post.body,
        image_url: post.imageUrl,
      };
      axios
        .patch("/api/posts/" + post.id, params)
        .then((response) => {
          console.log("posts update", response);
          this.$router.push("/posts");
        })
        .catch((error) => {
          console.log("posts update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyPost: function() {
      axios.delete(`/api/posts/${this.post.id}`).then((response) => {
        console.log("Success", response.data);
        this.$router.push("/posts");
      });
    },
  },
};
</script>
