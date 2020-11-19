<template>
  <div class="posts-new">
    <!--  start about left-->
    <section class="text-light bg-dark">
      <div class="col-lg-4 col-md-6 sm-margin-50px-bottom form-center">
        <div>
          <div class="margin-30px-bottom">
            <img src="img/content/about.jpg" alt="" />
          </div>
          <h5 class="font-size48 text-light bg-dark">Make A Post</h5>
          <div>
            <form v-on:submit.prevent="createPost()">
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
              Title:
              <input type="text" class="form-control" v-model="newPostTitle" />
              <div class="form-group">
                <label>Body:</label> <br />
                <textarea
                  v-model="newPostBody"
                  name="body"
                  class="form-control"
                  rows="10"
                  cols="100"
                ></textarea>
                <small class="text-warning"
                  >{{ 500 - newPostBody.length }} characters remaining</small
                >
              </div>
              Address:
              <input
                type="text"
                class="form-control"
                v-model="newPostAddress"
              />
              Image:
              <input type="text" class="form-control" v-model="newPostUrl" />
              <br />
              <h2 class="text-light bg-dark">Instruments</h2>
              <div v-for="instrument in instruments">
                <input
                  type="checkbox"
                  :id="instrument.id"
                  :value="instrument.id"
                  v-model="selectedInstrumentIds"
                />
                <label :for="instrument.id"> -{{ instrument.name }}</label>
              </div>
              <!-- <span>Selected instrument ids: {{ selectedInstrumentIds }}</span> -->
              <input
                type="submit"
                class="text-warning bg-dark"
                value="Create"
              />
              <br />
            </form>
          </div>
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
.textarea {
  /* width: 300px; */
  height: 150px;
  padding: 0%;
}
</style>

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
