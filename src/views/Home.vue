<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <!-- start logo -->

    <img
      class="navbar-brand width-450px sm-width-180px xs-width-150px"
      id="logo"
      src="img/logos/porchpick.png"
      alt="logo"
    />
    <!-- end logo -->
    <h4>
      The place to connect with bluegrass, folk, & old-time musicians in the
      Chicago area
    </h4>
    <br />
    <h6>Head on up to the top to sign up or login!</h6>
  </div>
</template>

<style></style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to frontporch!",
    };
  },
  created: function() {},
  methods: {},
};
</script>
