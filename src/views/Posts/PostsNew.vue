<template>
  <div class="posts-new">
    <p v-if="$parent.isLoggedIn()"></p>
    <h1>New Post</h1>
    <form v-on:submit.prevent="createPost()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Title: <input type="text" v-model="newPostTitle" /> Body:
      <input type="text" v-model="newPostBody" /> Address:
      <input type="text" v-model="newPostAddress" /> Image:
      <input type="text" v-model="newPostUrl" />
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
      instruments: [],
      selectedInstrumentIds: [],
    };
  },
  created: function() {
    axios.get("/api/instruments").then((response) => {
      this.instruments = response.data;
      console.log(response.data);
    });
  },
  methods: {
    createPost: function() {
      var params = {
        title: this.newPostTitle,
        body: this.newPostBody,
        address: this.newPostAddress,
        image_url: this.newPostUrl,
        instrument_ids: this.selectedInstrumentIds,
      };
      axios
        .post("/api/posts", params)
        .then((response) => {
          console.log("posts create", response);
          this.$router.push(`/posts/${response.data.id}`);
        })
        .catch((error) => {
          console.log("posts create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
