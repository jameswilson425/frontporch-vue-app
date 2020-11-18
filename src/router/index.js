import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from "../views/Users/Signup.vue";
import Login from "../views/Users/Login.vue";
import Logout from "../views/Users/Logout.vue";
import UsersShow from "../views/Users/UsersShow.vue";
import UsersEdit from "../views/Users/UsersEdit.vue";
import PostsIndex from "../views/Posts/PostsIndex.vue";
import PostsNew from "../views/Posts/PostsNew.vue";
import PostsShow from "../views/Posts/PostsShow.vue";
import PostsEdit from "../views/Posts/PostsEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { 
    path: "/users/signup", 
    name: "signup", 
    component: Signup 
  },
  { 
    path: "/users/login", 
    name: "login", 
    component: Login 
  },
  { 
    path: "/users/logout", 
    name: "logout", 
    component: Logout 
  },
  { 
    path: "/users/:id", 
    name: "users-show", 
    component: UsersShow 
  },
  { 
    path: "/users/:id/edit", 
    name: "users-edit", 
    component: UsersEdit
  },
  { 
    path: "/posts", 
    name: "posts-index", 
    component: PostsIndex
  },
  { 
    path: "/posts/new", 
    name: "posts-new", 
    component: PostsNew
  },
  { 
    path: "/posts/:id", 
    name: "posts-show", 
    component: PostsShow
  },
  { 
    path: "/posts/:id/edit", 
    name: "posts-edit", 
    component: PostsEdit
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
