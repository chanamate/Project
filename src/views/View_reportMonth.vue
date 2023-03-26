<template>
  <reportMonth />
</template>

<script>
import { defineComponent } from "vue";

// Components
import reportMonth from "../components/reportMonth.vue";

export default defineComponent({
  name: "reportMonth2",

  components: {
    reportMonth,
  },
});
</script>
