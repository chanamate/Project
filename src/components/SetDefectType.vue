<template>
  <v-item-group mandatory :model-value="selectedDefectType">
    <v-card elevation="3" color="#CFCFCF">
      <div class="ml-4 mt-4 text-h6">Defect Type :</div>
      <v-col class="pb-3 pt-1" v-for="(item, index) in defectType" :key="index">
        <v-item v-slot="{ isSelected, toggle }" :value="item.type">
          <v-card
            :color="isSelected ? 'primary' : ''"
            class="d-flex justify-center text-h6 pa-6 pb-1 pt-0"
            dark
            @click="
              toggle();
              update(item.failureDetailId);
            "
          >
            {{ item.type + " : " + item.details }}
          </v-card>
        </v-item>
      </v-col>
    </v-card>
  </v-item-group>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

export default {
  name: "selectedDefectType",
  props: ["selectedDefectType"],

  computed: {
    type() {
      return this.$route.params.type;
    },
  },

  data: () => ({
    defectType: [],
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
        key: "selectedDefectType", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
  },
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
    let RT = await axiosInstance.post(`/failure-detail/${this.lineId}`, {
      type: "RT",
    });
    let RP = await axiosInstance.post(`/failure-detail/${this.lineId}`, {
      type: "RP",
    });
    let RW = await axiosInstance.post(`/failure-detail/${this.lineId}`, {
      type: "RW",
    });
    let PS = await axiosInstance.post(`/failure-detail/${this.lineId}`, {
      type: "PS",
    });
    this.defectType.push(RT[0], RP[0], RW[0], PS[0]);
    // console.log(
    //   "🚀 ~ file: SetDefectType.vue:83 ~ created ~ this.defectType:",
    //   this.defectType
    // );
    // console.log("defectType", this.defectType);
    // console.log("station", station);
  },
};
</script>
