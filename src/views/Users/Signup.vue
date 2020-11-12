<template>
  <div class="signup">
    <form v-on:submit.prevent="submit()">
      <h1>Signup</h1>
      <ul>
        <li class="text-danger" v-for="error in errors">{{ error }}</li>
      </ul>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" class="form-control" v-model="userName" /> <br />
        <small>{{ 20 - userName.length }} characters remaining</small>
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" class="form-control" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" class="form-control" v-model="password" /> <br />
        <small v-if="password.length < 8" class="text-danger"
          >Must be at least 8 characters</small
        >
        <small v-if="password.length > 20" class="text-danger"
          >Cannot exceed 20 characters</small
        >
      </div>
      <div class="form-group">
        <label>Password confirmation:</label>
        <input
          type="password"
          class="form-control"
          v-model="passwordConfirmation"
        />
        <br />
        <small v-if="password !== passwordConfirmation" class="text-danger"
          >passwords do not match</small
        >
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input type="text" class="form-control" v-model="address" />
      </div>
      <div class="form-group">
        <label>Bio:</label> <br />
        <!-- <input type="text" class="form-control" v-model="bio" /> <br /> -->
        <textarea name="bio" rows="10" cols="100">
Tell us about yourself! Feel free to include links to your music and whatnot.</textarea
        >
        <small>{{ 900 - bio.length }} characters remaining</small>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      address: "",
      bio: "",
      errors: [],
      status: "",
    };
  },
  methods: {
    submit: function() {
      var params = {
        user_name: this.userName,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        address: this.address,
        bio: this.bio,
      };
      axios
        .post("/api/users", params)
        .then((response) => {
          this.$router.push("/users/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    },
  },
};
</script>
