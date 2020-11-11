<template>
  <div class="users-edit">
    <h1>Edit Profile</h1>
    <form v-on:submit.prevent="updateUser(user)">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Username: <input type="text" v-model="user.user_name" /><br />
      <!-- Email: <input type="text" v-model="user.email" /><br /> -->
      Address: <input type="text" v-model="user.address" /><br />
      Bio: <input type="text" v-model="user.bio" /><br />
      <input type="submit" value="Update" /><br />
      <button v-on:click="destroyUser()">Delete Profile</button><br />
      <h1>Account Information</h1>
      Email: <input type="text" v-model="user.email" /><br />
      <button v-on:click="passwordUpdate = !passwordUpdate">
        Change Password
      </button>
      <div v-if="passwordUpdate === true">
        <div class="form-group">
          <label>Current Password</label>
          <input
            type="password"
            class="form-control"
            v-model="current_password"
          />
        </div>
        <div class="form-group">
          <label>New Password</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            class="form-control"
            v-model="password_confirmation"
          />
        </div>
      </div>
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
      current_password: "",
      password: "",
      password_confirmation: "",
      passwordUpdate: false,
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
        user_name: user.user_name,
        email: user.email,
        address: user.address,
        bio: user.bio,
        current_password: user.password,
        password: this.password,
        password_confirmation: this.password,
      };
      axios
        .patch("/api/users/" + user.id, params)
        .then((response) => {
          console.log("users update", response);
          this.$router.push(`/users/${user.id}`);
        })
        .catch((error) => {
          console.log("users update error", error.response);
          this.errors = error.response.data.errors;
        });
    },
    destroyUser: function() {
      axios.delete(`/api/users/${this.user.id}`).then((response) => {
        console.log("Success", response.data);
        localStorage.removeItem("jwt");
        localStorage.removeItem("user_id");
        this.$router.push("/");
      });
    },
  },
};
</script>
