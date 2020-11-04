<template>
  <div class="users-show">
    <!-- <h2>{{ user.userName }}</h2> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      photo: {},
    };
  },
  created: function() {
    axios.get("/api/users/" + this.$route.params.id).then((response) => {
      console.log("users show", response);
      this.photo = response.data;
    });
  },
  methods: {},
};
</script>
