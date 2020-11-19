<template>
  <div class="signup">
    <section class="bg-dark">
      <div class="col-lg-4 col-md-6 sm-margin-50px-bottom form-center">
        <form class="text-light bg-dark" v-on:submit.prevent="submit()">
          <h1 class="text-light bg-dark">Signup</h1>
          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <div class="form-group">
            <label>Username:</label>
            <input type="text" class="form-control" v-model="userName" />
            <small class="text-warning"
              >{{ 20 - userName.length }} characters remaining</small
            >
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input type="email" class="form-control" v-model="email" />
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="password" />
            <small v-if="password.length < 8" class="text-warning"
              >Must be at least 8 characters</small
            >
            <small v-if="password.length > 20" class="text-warning"
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

            <small v-if="password !== passwordConfirmation" class="text-warning"
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
            <textarea name="bio" class="form-control" rows="10" cols="100">
Tell us about yourself! Feel free to include links to your music and whatnot.</textarea
            >
            <small class="text-warning"
              >{{ 900 - bio.length }} characters remaining</small
            >
          </div>
          Profile Picture:
          <input type="text" class="form-control" v-model="newProfileImage" />
          <br />
          <input
            type="submit"
            class="btn btn-secondary form-control text-warning bg-dark"
            value="Submit"
          />
        </form>
      </div>
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
      userName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      address: "",
      bio: "",
      newProfileImage: "",
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
        profile_image: this.newProfileImage,
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
