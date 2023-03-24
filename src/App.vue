<template>
  <v-app>
    <v-main>
      <ul v-if="!isLoginPage">
        <!-- <li><router-link to="/">Home</router-link></li> -->
        <li class="dropdown">
          <router-link to="/home" class="dropbtn">Home</router-link>
          <div class="dropdown-content">
            <router-link to="/FG_F/F">Fabrication F Frame</router-link>
            <router-link to="/FG_F/S">Fabrication S Frame</router-link>
            <router-link to="/FG_F/P">Paint</router-link>
          </div>
        </li>
        <li>
          <router-link to="/productionPlan">Production Plan</router-link>
        </li>
        <li>
          <router-link to="/productDetails">Product Details</router-link>
        </li>
        <li><router-link to="/test">test</router-link></li>
        <li style="float: right">
          <router-link to="/login">log out</router-link>
        </li>
      </ul>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    isLoginPage() {
      return this.$route.path === "/login";
    },
  },
  data: () => ({}),
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a,
.dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover,
.dropdown:hover .dropbtn {
  background-color: #111;
}

li.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
