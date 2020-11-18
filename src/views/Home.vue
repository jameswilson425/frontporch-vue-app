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
    <br />
    <h6>Or stay a while and check out the weekly video!</h6>

    <!-- Video -->
    <div>
      <img
        class="navbar-brand width-450px sm-width-180px xs-width-150px"
        id="logo"
        src="img/blog/video-bg.jpg"
        alt="logo"
      />

      <div class="display-inline story-video">
        <div class=" z-index-12 position-center">
          <a class="video video_btn" href="img/logos/GroundSpeed.mp4"
            ><i class="fas fa-play font-size18 xs-font-size16"></i
          ></a>
        </div>
      </div>
    </div>
    <!-- Video -->
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
