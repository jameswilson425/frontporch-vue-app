<template>
  <div class="posts-show">
    <section class="bg-dark">
      <div class="col-lg-8 col-md-12 sm-margin-50px-bottom form-center">
        <h2 class="text-light bg-dark">{{ post.title }}</h2>
        <img v-bind:src="post.image_url" v-bind:alt="post.title" />
        <div class="card-body text-light bg-dark">
          <p>POSTED by: {{ post.user_name }}</p>
          <p>LOCATION: {{ post.address }}</p>
          <!-- <input type="text" v-model="this.post.address" /> -->
          <button
            class="text-warning bg-dark"
            type="button"
            value="this.post.address"
            v-on:click="
              toggleMap();
              geolocateAddress();
            "
          >
            See on map
          </button>

          <div v-if="mapVisible" id="map"></div>

          <p>DETAILS: {{ post.body }}</p>
          <router-link
            class="text-warning"
            v-if="post.user_id == $parent.getUserId()"
            v-bind:to="`/posts/${post.id}/edit`"
            >Edit post</router-link
          >
        </div>
        <br />

        <!--  start comment-->
        <div class="comments-area">
          <div class="margin-50px-bottom sm-margin-30px-bottom">
            <h3
              class="font-size28 sm-font-size26 xs-font-size24 text-light bg-dark"
            >
              Replies
            </h3>
          </div>
          <div v-for="reply in post.replies">
            <div class="comment-box text-light bg-dark">
              <div class="author-thumb">
                <img
                  src="img/blog/01.png"
                  alt=""
                  class="rounded-circle width-85 xs-width-100"
                />
              </div>
              <div class="comment-info">
                <h6>
                  <a class="text-white bg-dark" href="javascript:void(0);"
                    >{{ reply.user_name }}:</a
                  >
                </h6>
                <p>
                  {{ reply.body }}
                </p>
                <!-- <div class="reply">
                <a href="javascript:void(0);">
                  <i class="fa fa-reply" aria-hidden="true"></i> Reply
                </a>
              </div> -->
              </div>
              <button
                class="text-warning bg-dark"
                v-if="reply.user_id == $parent.getUserId() && !isHidden"
                type="button"
                v-on:click="
                  isHidden = true;
                  currentReply = reply;
                "
              >
                Edit Reply
              </button>
              <div
                v-if="
                  reply.user_id == $parent.getUserId() && reply === currentReply
                "
              >
                <form v-on:submit.prevent="updateReply(currentReply)">
                  <input type="text" v-model="currentReply.body" />
                  <input type="submit" value="Update" />
                </form>

                <button
                  v-if="reply.user_id == $parent.getUserId()"
                  v-on:click="destroyReply(currentReply)"
                >
                  Delete Reply
                </button>
              </div>
            </div>
          </div>
          <form v-if="$parent.isLoggedIn()" v-on:submit.prevent="createReply()">
            <h5 class="text-light bg-dark">Reply to this post:</h5>
            <input type="text" class="form-control" v-model="newPostReply" />
            <input
              class="col-lg-4 col-md-6 sm-margin-50px-bottom form-center form-control text-warning bg-dark"
              type="submit"
              value="Reply"
            />
          </form>
          <router-link class="text-warning bg-dark" to="/posts"
            >Back to all posts</router-link
          >
        </div>
        <!-- end comment-->
      </div>
    </section>
  </div>
</template>

<style>
.form-center {
  margin: 0 auto;
}
#map {
  width: 50%;
  height: 250px;
  margin-left: auto;
  margin-right: auto;
}
#marker {
  background-image: url("https://static.thenounproject.com/png/55437-200.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}
</style>

<script>
import axios from "axios";
import mapboxgl from "mapbox-gl";

export default {
  data: function() {
    return {
      post: {},
      replies: [],
      newPostReply: "",
      currentReply: "",
      updatePostReply: "",
      replyUpdate: false,
      isHidden: false,
      address: "Chicago",
      mapVisible: false,
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log("posts show", response.data);
      this.post = response.data;
    });
  },
  mounted: function() {
    // this.geolocateAddress();
  },

  methods: {
    toggleMap: function() {
      this.mapVisible = !this.mapVisible;
    },
    geolocateAddress: function() {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
      // eslint-disable-next-line no-undef
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      mapboxClient.geocoding
        .forwardGeocode({
          query: this.post.address,
          autocomplete: false,
          limit: 1,
        })
        .send()
        .then(function(response) {
          if (
            response &&
            response.body &&
            response.body.features &&
            response.body.features.length
          ) {
            var feature = response.body.features[0];

            var map = new mapboxgl.Map({
              container: "map",
              style: "mapbox://styles/mapbox/streets-v11",
              center: feature.center,
              zoom: 13,
            });
            // create DOM element for the marker
            var el = document.createElement("div");
            el.id = "marker";
            // create the marker
            new mapboxgl.Marker(el).setLngLat(feature.center).addTo(map);
          }
        });
    },
    createReply: function() {
      var params = {
        body: this.newPostReply,
        post_id: this.post.id,
      };
      axios
        .post("/api/replies", params)
        .then((response) => {
          console.log("replies create", response);
          this.post.replies.push(response.data);
          this.newPostReply = "";
        })
        .catch((error) => {
          console.log("replies create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    updateReply: function(reply) {
      var params = {
        body: reply.body,
        post_id: this.post.id,
      };
      axios
        .patch("/api/replies/" + reply.id, params)
        .then((response) => {
          console.log("replies update", response);
          this.isHidden = false;
          this.currentReply = "";
        })
        .catch((error) => {
          console.log("replies update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyReply: function(reply) {
      axios.delete(`/api/replies/${reply.id}`).then((response) => {
        console.log("Success", response.data);
        this.isHidden = false;
        this.currentReply = "";
        var index = this.post.replies.indexOf(reply);
        this.post.replies.splice(index, 1);
      });
    },
  },
};
</script>
