<template>
  <v-app>
    <v-main>
      <router-link to="/login"> --login-- </router-link>
      <router-link to="/"> __Home__ </router-link>
      <router-link to="/productionPlan"> --Production Plan-- </router-link>
      <router-link to="/productDetails"> __Product Details__ </router-link>

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
