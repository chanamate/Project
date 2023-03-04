<template>
  <productionPlan />
</template>

<script>
import { defineComponent } from "vue";

// Components
import productionPlan from "../components/productionPlan.vue";

export default defineComponent({
  name: "productionPlan2",

  components: {
    productionPlan,
  },
});
</script>
