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
      <h2>Instruments</h2>
      <div v-for="instrument in instruments">
        <input
          type="checkbox"
          :id="instrument.id"
          :value="instrument.id"
          v-model="selectedInstrumentIds"
        />
        <label :for="instrument.id">{{ instrument.name }}</label>
      </div>

      <br />
      <span>Selected instrument ids: {{ selectedInstrumentIds }}</span>
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
      instruments: [],
      selectedInstrumentIds: [],
    };
  },
  created: function() {
    axios.get("/api/posts/" + this.$route.params.id).then((response) => {
      console.log("posts show", response);
      this.post = response.data;
      this.selectedInstrumentIds = this.post.instruments.map(
        (instrument) => instrument.id
      );
    });
    axios.get("/api/instruments").then((response) => {
      this.instruments = response.data;
      console.log(response.data);
    });
  },
  methods: {
    updatePost: function(post) {
      var params = {
        title: post.title,
        address: post.address,
        body: post.body,
        image_url: post.imageUrl,
        instrument_ids: this.selectedInstrumentIds,
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
