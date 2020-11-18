<template>
  <div id="app">
    <div id="nav">
      <div class="navbar-default">
        <!-- start top search -->
        <!-- <div class="top-search bg-theme">
          <div class="container">
            <form
              class="search-form"
              action="search.html"
              method="GET"
              accept-charset="utf-8"
            >
              <div class="input-group">
                <span class="input-group-addon cursor-pointer">
                  <button
                    class="search-form_submit fas fa-search font-size18 text-white"
                    type="submit"
                  ></button>
                </span>
                <input
                  type="text"
                  class="search-form_input form-control"
                  name="s"
                  autocomplete="off"
                  placeholder="Type & hit enter..."
                />
                <span class="input-group-addon close-search"
                  ><i class="fas fa-times font-size18 margin-10px-top"></i
                ></span>
              </div>
            </form>
          </div>
        </div> -->
        <!-- end top search -->

        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-12">
              <div class="menu_area">
                <nav class="navbar navbar-expand-lg navbar-light no-padding">
                  <div class="navbar-header navbar-header-custom">
                    <!-- start logo -->
                    <a
                      href="/"
                      class="navbar-brand width-500px sm-width-180px xs-width-150px"
                      ><img
                        id="logo"
                        src="img/logos/frontporch.png"
                        alt="img/logos/frontporch.png"
                    /></a>
                    <!-- end logo -->
                  </div>

                  <div class="navbar-toggler"></div>

                  <!-- start menu area -->
                  <ul
                    class="navbar-nav ml-auto"
                    id="nav"
                    style="display: none;"
                  >
                    <!-- <li><router-link to="/">Home</router-link></li> -->
                    <li><router-link to="/posts">Posts</router-link></li>
                    <li v-if="isLoggedIn()">
                      <router-link to="/posts/new">New Post</router-link>
                    </li>
                    <li v-if="isLoggedIn()">
                      <router-link :to="`/users/${getUserId()}`"
                        >Profile</router-link
                      >
                    </li>
                    <li v-if="!isLoggedIn()">
                      <router-link to="/users/signup">Signup</router-link>
                    </li>
                    <li v-if="!isLoggedIn()">
                      <router-link to="/users/login">Login</router-link>
                    </li>
                    <li v-if="isLoggedIn()">
                      <router-link to="/users/logout">Logout</router-link>
                    </li>
                  </ul>
                  <!-- end menu area -->
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {};
  },
  methods: {
    isLoggedIn: function() {
      return localStorage.getItem("jwt");
    },
    getUserId: function() {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
