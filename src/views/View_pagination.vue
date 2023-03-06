<template>
  <pagination />
</template>

<script>
import { defineComponent } from "vue";

// Components
import pagination from "../components/pagination.vue";

export default defineComponent({
  name: "pagination1",

  components: {
    pagination,
  },
});
</script>
