<template>
  <test />
</template>

<script>
import { defineComponent } from "vue";

// Components
import test from "../components/test.vue";

export default defineComponent({
  name: "test2",

  components: {
    test,
  },
});
</script>
