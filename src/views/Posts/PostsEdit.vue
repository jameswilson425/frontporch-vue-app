<template>
  <div class="posts-edit">
    <!--  start about left-->
    <section class="text-light bg-dark">
      <div class="col-lg-4 col-md-6 sm-margin-50px-bottom form-center">
        <div>
          <div class="margin-30px-bottom">
            <img src="img/content/about.jpg" alt="" />
          </div>
          <h5 class="font-size48 text-light bg-dark">Edit Post</h5>
          <form v-on:submit.prevent="updatePost(post)">
            <ul>
              <li v-for="error in errors">{{ error }}</li>
            </ul>
            Title:
            <input type="text" class="form-control" v-model="post.title" />
            Address:
            <input type="text" class="form-control" v-model="post.address" />
            <div class="form-group">
              <label>Body:</label> <br />
              <textarea
                v-model="post.body"
                name="bio"
                class="form-control"
                rows="10"
                cols="100"
              ></textarea>
              <small class="text-warning"
                >{{ 500 - this.post.body.length }} characters remaining</small
              >
            </div>
            Image:
            <input type="text" class="form-control" v-model="post.image_url" />
            <br />
            <h2 class="text-light bg-dark">Instruments</h2>
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
            <!-- <span>Selected instrument ids: {{ selectedInstrumentIds }}</span> -->
            <input class="text-warning bg-dark" type="submit" value="Update" />
            <button class="text-warning bg-dark" v-on:click="destroyPost()">
              Delete Post
            </button>
          </form>
        </div>
      </div>
      <!--  end about left-->
    </section>
  </div>
</template>

<style scoped>
.form-center {
  margin: 0 auto;
}
</style>

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
          this.$router.push(`/posts/${this.post.id}`);
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
