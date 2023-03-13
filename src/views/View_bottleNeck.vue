<template>
  <bottleNeck />
</template>

<script>
import { defineComponent } from "vue";

// Components
import bottleNeck from "../components/bottleNeck.vue";

export default defineComponent({
  name: "bottleNeck2",

  components: {
    bottleNeck,
  },
});
</script>
