<template>
  <FirstPage />
</template>

<script>
import { defineComponent } from "vue";

// Components
import FirstPage from "../components/FirstPage.vue";

export default defineComponent({
  name: "FirstPage2",

  components: {
    FirstPage,
  },
});
</script>
