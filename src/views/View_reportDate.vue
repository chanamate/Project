<template>
  <reportDate />
</template>

<script>
import { defineComponent } from "vue";

// Components
import reportDate from "../components/reportDate.vue";

export default defineComponent({
  name: "reportDate2",

  components: {
    reportDate,
  },
});
</script>
