<template>
  <div class="posts-show">
    <h2>{{ post.title }}</h2>
    <img v-bind:src="post.image_url" v-bind:alt="post.title" />
    <p>Posted by: {{ post.user_name }}</p>
    <p>Location: {{ post.address }}</p>
    <input type="text" v-model="this.post.address" /><button
      v-on:click="geolocateAddress()"
    >
      See on map
    </button>
    <div id="map"></div>

    <p>Details: {{ post.body }}</p>
    <router-link
      v-if="post.user_id == $parent.getUserId()"
      v-bind:to="`/posts/${post.id}/edit`"
      >Edit post</router-link
    >
    <br />

    <h2>Replies</h2>
    <div v-for="reply in post.replies">
      <p>{{ reply.user_name }} replied:</p>
      <p>{{ reply.body }}</p>
      <button
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
        v-if="reply.user_id == $parent.getUserId() && reply === currentReply"
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
    <form v-on:submit.prevent="createReply()">
      <h3>Reply to this post:</h3>
      <input type="text" v-model="newPostReply" />
      <input type="submit" value="Reply" />
    </form>
    <router-link to="/posts">Back to all posts</router-link>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 200px;
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
    };
  },
  created: function() {
    axios.get(`/api/posts/${this.$route.params.id}`).then((response) => {
      console.log("posts show", response.data);
      this.post = response.data;
    });
  },
  mounted: function() {
    this.geolocateAddress();
  },
  methods: {
    geolocateAddress: function() {
      mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;
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
            new mapboxgl.Marker().setLngLat(feature.center).addTo(map);
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
