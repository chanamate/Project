<template>
  <v-card
    elevation="8"
    color="#CFCFCF"
    class="pa-4 mt-4"
    height="140px"
    width="100%"
  >
    <v-row class="ml-0 mt-0"
      ><div class="text-h6">Employee ID and Name :</div>
      <v-radio-group
        v-model="selectedGroup"
        inline
        @update:modelValue="update2"
      >
        <v-radio label="Group A" value="A"></v-radio>
        <v-radio label="Group B" value="B"></v-radio>
      </v-radio-group>
    </v-row>

    <v-autocomplete
      :items="name"
      dense
      variant="filled"
      label="Select ID and Name"
      bg-color="#FFFFFF"
      class=""
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
      // console.log("selectName", e);
      this.$emit("updateValue", {
        key: "selectName", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e.split(" ")[0], // ค่าที่จะ UPDATE
      });
    },
    update2(e) {
      // console.log("selectedGroup", e);
      this.$emit("updateValue", {
        key: "selectedGroup", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e.split(" ")[0], // ค่าที่จะ UPDATE
      });
    },
  },

  data: () => ({
    name: [],
    selectedGroup: "",
  }),

  async created() {
    const name = await axiosInstance.get(`/employee`);
    // this.name = name;
    this.name = name.map((n) => `${n.employeeId} ${n.employeeName}`);
    // console.log("name", name);
  },
};
</script>
