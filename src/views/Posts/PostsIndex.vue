<template>
  <div class="posts-index">
    <!-- start blog Section -->
    <section class="bg-dark">
      <div class="container">
        <div class="row">
          <!--  start blog left-->
          <div
            v-for="post in posts"
            class="col-lg-12 col-md-12 sm-margin-50px-bottom"
          >
            <div class="card margin-40px-bottom border-0 bg-light rounded-0">
              <div class="row no-gutters list-blog">
                <div class="col-md-5">
                  <div
                    class="bg-img cover-background h-100 min-height-250"
                    data-overlay-dark="0"
                    :data-background="post.image_url"
                    :style="`background-image: url(${post.image_url});`"
                  ></div>
                </div>
                <div class="col-md-7">
                  <div class="card-body">
                    <h5>
                      <router-link v-bind:to="`/posts/${post.id}`">{{
                        post.title
                      }}</router-link>
                    </h5>

                    <span class="category">{{ post.address }}</span>

                    <p>Instrument(s):</p>
                    <div v-for="instrument in post.instruments">
                      {{ instrument.name }}
                    </div>

                    <div class="meta">
                      <span class="date"
                        >Created {{ relativeDate(post.created_at) }}</span
                      >
                      <span class="author"
                        >By
                        <a :href="`/users/${post.user_id}`">{{
                          post.user_name
                        }}</a></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- start pager  -->
          <div class="margin-50px-top">
            <div
              class="pagination text-small text-uppercase text-extra-dark-gray"
            >
              <ul>
                <li>
                  <a href="javascript:void(0);"
                    ><i
                      class="fas fa-long-arrow-alt-left margin-5px-right xs-display-none"
                    ></i>
                    Prev</a
                  >
                </li>
                <li class="active"><a href="javascript:void(0);">1</a></li>
                <li><a href="javascript:void(0);">2</a></li>
                <li><a href="javascript:void(0);">3</a></li>
                <li>
                  <a href="javascript:void(0);"
                    >Next
                    <i
                      class="fas fa-long-arrow-alt-right margin-5px-left xs-display-none"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- end pager  -->

          <!--  end blog left-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data: function() {
    return {
      posts: [],
      instruments: [],
    };
  },
  created: function() {
    axios.get("/api/posts").then((response) => {
      console.log("posts index", response);
      this.posts = response.data;
    });
  },
  methods: {
    relativeDate: function(date) {
      return moment(date).fromNow();
    },
  },
};
</script>
