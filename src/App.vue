<template>
  <v-app>
    <v-main>
      <router-link to="/"> __home__ </router-link>
      <router-link to="/productionPlan"> --productionPlan-- </router-link>
      <router-link to="/pagination"> __pagination__ </router-link>

      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
