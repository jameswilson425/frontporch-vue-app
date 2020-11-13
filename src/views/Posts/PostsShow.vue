<template>
  <div class="posts-show">
    <h2>{{ post.title }}</h2>
    <img v-bind:src="post.image_url" v-bind:alt="post.title" />
    <p>Posted by: {{ post.user_name }}</p>
    <p>Location: {{ post.address }}</p>
    <p>Details: {{ post.body }}</p>
    <router-link
      v-if="post.user_id == $parent.getUserId()"
      v-bind:to="`/posts/${post.id}/edit`"
      >Edit post</router-link
    >
    <br />
    <router-link to="/posts">Back to all posts</router-link>
    <h2>Replies</h2>
    <div v-for="reply in post.replies">
      <p>{{ reply.user_name }} replied:</p>
      <p>{{ reply.body }}</p>
      <button
        v-if="reply.user_id == $parent.getUserId() && !isHidden"
        @click="isHidden = true"
        type="button"
        v-on:click="replyUpdate = !replyUpdate"
      >
        Edit Reply
      </button>
      <div v-if="reply.user_id == $parent.getUserId() && replyUpdate === true">
        <div class="form-group">
          <label>{{ reply.body }}</label>
          <input type="text" class="form-control" v-model="current_reply" />
        </div>
        <button type="button" @click="updateReply()">Update Reply</button>

        <button
          v-if="reply.user_id == $parent.getUserId()"
          v-on:click="destroyReply()"
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      post: {},
      replies: [],
      newPostReply: "",
      current_reply: "",
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
  methods: {
    createReply: function(reply) {
      var params = {
        body: this.newPostReply,
        post_id: this.reply.post_id,
      };
      axios
        .post("/api/replies", params)
        .then((response) => {
          console.log("replies create", response);
          this.$router.push(`/${reply.id}`);
        })
        .catch((error) => {
          console.log("replies create error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    updateReply: function(reply) {
      var params = {
        body: reply.body,
      };
      axios
        .patch("/api/replies/" + reply.id, params)
        .then((response) => {
          console.log("replies update", response);
          this.$router.push("/posts");
        })
        .catch((error) => {
          console.log("replies update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyReply: function() {
      axios.delete(`/api/replies/${this.reply.id}`).then((response) => {
        console.log("Success", response.data);
        this.$router.push("/posts");
      });
    },
  },
};
</script>
