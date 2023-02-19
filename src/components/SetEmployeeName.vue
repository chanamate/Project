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
      label="Select ID and Name"
      bg-color="#FFFFFF"
      class="mt-4"
      @update:modelValue="update"
    ></v-autocomplete>
  </v-card>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

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
    name: [],
  }),
  async created() {
    const name = await axiosInstance.get(`/employee`);
    // this.name = name;
    this.name = name.map((n) => `${n.employeeId} ${n.employeeName}`);
    // console.log("name", name);
  },
};
</script>
