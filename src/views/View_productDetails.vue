<template>
  <productDetails />
</template>

<script>
import { defineComponent } from "vue";

// Components
import productDetails from "../components/productDetails.vue";

export default defineComponent({
  name: "productDetails1",

  components: {
    productDetails,
  },
});
</script>
