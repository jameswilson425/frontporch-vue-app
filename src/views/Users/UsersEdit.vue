<template>
  <div class="users-edit">
    <section class="text-light bg-dark">
      <div class="col-lg-12 col-md-12 sm-margin-50px-bottom">
        <h1 class="text-light bg-dark">Edit Profile</h1>
        <form v-on:submit.prevent="updateUser(user)">
          <ul>
            <li v-for="error in errors">{{ error }}</li>
          </ul>
          Username: <input type="text" v-model="user.user_name" /><br />
          Address: <input type="text" v-model="user.address" /><br />
          Profile Image:
          <input type="text" v-model="user.profile_image" /><br />
          <!-- Bio: <input type="text" v-model="user.bio" /><br /> -->
          <div class="form-group">
            <label>Bio:</label> <br />
            <!-- <input type="text" class="form-control" v-model="bio" /> <br /> -->
            <textarea
              v-model="user.bio"
              name="bio"
              rows="10"
              cols="100"
            ></textarea>
            <small>{{ 900 - user.bio.length }} characters remaining</small>
          </div>
          <button v-on:click="updateUser()">Update</button><br />
          <button v-on:click="destroyUser()">Delete Profile</button><br />
          <h1 class="text-light bg-dark">Account Information</h1>
          Email: <input type="text" v-model="user.email" /><br />
          <button
            type="button"
            v-on:click="passwordUpdate = !passwordUpdate"
            v-if="!isHidden"
            @click="isHidden = true"
          >
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
              <small v-if="password.length < 8" class="text-danger"
                >Must be at least 8 characters</small
              >
              <small v-if="password.length > 20" class="text-danger"
                >Cannot exceed 20 characters</small
              >
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                class="form-control"
                v-model="passwordConfirmation"
              />
              <small
                v-if="password !== passwordConfirmation"
                class="text-danger"
                >passwords do not match</small
              >
            </div>
            <button type="button" @click="updateUser(user)">
              Update Password
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style></style>

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
      passwordConfirmation: "",
      passwordUpdate: false,
      isHidden: false,
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
        profile_image: user.profile_image,
        bio: user.bio,
        current_password: this.current_password,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
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
