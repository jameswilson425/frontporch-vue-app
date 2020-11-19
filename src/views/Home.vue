<template>
  <div class="home">
    <section class="text-light bg-dark">
      <div class="col-lg-10 col-md-12 sm-margin-50px-bottom form-center">
        <h1 class="text-light bg-dark">{{ message }}</h1>

        <!-- start logo -->

        <img
          class="navbar-brand width-600px sm-width-180px xs-width-150px"
          id="logo"
          src="img/logos/home.png"
          alt="logo"
        />
        <!-- end logo -->
        <h4 class="text-light bg-dark">
          The place to connect with bluegrass, folk, & old-time musicians in the
          Chicago area
        </h4>
        <br />
        <h6 class="text-light bg-dark">
          Head on up to the top to sign up or login!
        </h6>
        <br />
        <h6 class="text-light bg-dark">
          Or stay a while and check out the weekly video!
        </h6>

        <!-- Video -->
        <div>
          <!-- <img
          class="navbar-brand width-450px sm-width-180px xs-width-150px"
          id="logo"
          src="img/blog/video-bg.jpg"
          alt="logo"
        /> -->

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
    </section>
  </div>
</template>

<style scoped>
.form-center {
  margin: 0 auto;
}
</style>

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
