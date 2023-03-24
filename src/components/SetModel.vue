<template>
  <v-item-group mandatory :model-value="selectedValueModel">
    <v-card elevation="3" color="#CFCFCF">
      <div class="ml-4 mt-4 text-h6">Model :</div>
      <v-col class="pb-4 pt-1" v-for="(item, index) in model" :key="index">
        <v-item v-slot="{ isSelected, toggle }" :value="item.modelName">
          <v-card
            :color="isSelected ? 'primary' : ''"
            class="d-flex justify-center text-h6 pa-6 pb-1 pt-0"
            dark
            @click="
              toggle();
              update(item.modelId);
            "
          >
            {{ item.modelName }}
          </v-card>
        </v-item>
      </v-col>
    </v-card>
  </v-item-group>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

export default {
  name: "SetModel",
  props: ["selectedValueModel"],

  computed: {
    type() {
      return this.$route.params.type;
    },
  },

  data: () => ({
    model: "",
    lineId: null,
  }),

  async mounted() {
    const line = await axiosInstance.get("/line");
    this.lineList = line;
    // console.log(this.lineList);
    // console.log(this.lineId);
  },

  methods: {
    // ADD THIS SHIT
    update(e) {
      this.$emit("updateValue", {
        key: "selectedValueModel", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
  },
  // ของใหม่ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async created() {
    switch (this.type) {
      case "F":
        this.lineId = 1;
        break;
      case "S":
        this.lineId = 2;
        break;
      case "P":
        this.lineId = 3;
        break;
    }
    const model = await axiosInstance.get(`/model/line/${this.lineId}`);
    this.model = model;
    // console.log(model);
  },
};
</script>
