<template>
  <div class="users-edit">
    <h1>Edit Profile</h1>
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Username: <input type="text" v-model="user.user_name" /> Email:
      <input type="text" v-model="user.email" /> Address:
      <input type="text" v-model="user.address" /> Bio:
      <input type="text" v-model="user.bio" />
      <input type="submit" value="Update" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      user: {},
      errors: [],
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then((response) => {
      console.log("users show", response);
      this.user = response.data;
    });
  },
  methods: {
    updateUser: function(user) {
      var params = {
        userName: user.user_name,
        email: user.email,
        address: user.address,
        bio: user.bio,
      };
      axios
        .patch("/api/users/" + user.id, params)
        .then((response) => {
          console.log("users update", response);
          this.$router.push("/users");
        })
        .catch((error) => {
          console.log("users update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
