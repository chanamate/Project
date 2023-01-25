<template>
  <v-card
    elevation="8"
    color="#CFCFCF"
    class="pa-4 mt-4"
    height="140px"
    width="100%"
  >
    <div class="text-h6">Employee Name and ID :</div>
    <v-autocomplete
      :items="name"
      dense
      variant="filled"
      label="Employee Name and ID"
      bg-color="#FFFFFF"
      class="mt-4"
      @update:modelValue="update"
    ></v-autocomplete>
  </v-card>
</template>

<script>
import { name } from "../assets/constant_F";

export default {
  name: "SetEmployeeName",

  methods: {
    // ADD THIS SHIT
    update(e) {
      this.$emit("updateValue", {
        key: "selectName", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
  },
  data: () => ({
    name: name,
  }),
};
</script>
