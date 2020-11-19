<template>
  <div class="users-show">
    <section class="text-light bg-dark">
      <div class="col-lg-12 col-md-12 sm-margin-50px-bottom form-center">
        <h2 class="text-light bg-dark">{{ user.user_name }}</h2>
        <img :src="user.profile_image" alt="" />
        <p>EMAIL: {{ user.email }}</p>
        <p>ADDRESS: {{ user.address }}</p>
        <p>BIO: {{ user.bio }}</p>
        <router-link
          class="text-warning"
          v-if="user.id == $parent.getUserId()"
          v-bind:to="`/users/${user.id}/edit`"
          >Edit Profile</router-link
        >
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
      user: {},
      posts: [],
      title: [],
      errors: [],
    };
  },
  created: function() {
    this.showUser();
  },
  methods: {
    showUser: function() {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        console.log(response.data);
        this.user = response.data;
      });
    },
  },
};
</script>
