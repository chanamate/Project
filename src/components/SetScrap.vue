<template>
  <v-card color="#CFCFCF" height="471px" class="py-3 overflow-y-auto">
    <v-col cols="12" class="pa-0">
      <v-item-group mandatory :model-value="selectedScrap">
        <v-col class="pb-1 pt-1" v-for="(item, index) in scrap" :key="index">
          <v-item v-slot="{ isSelected, toggle }" :value="item.details">
            <v-card
              :color="isSelected ? 'primary' : ''"
              class="d-flex justify-center text-h6"
              dark
              @click="
                toggle();
                update(item.failureDetailId + ` ` + item.details);
              "
            >
              {{ item.details }}
            </v-card>
          </v-item>
        </v-col>
      </v-item-group>
    </v-col>
  </v-card>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

export default {
  name: "selectedScrap",
  props: ["selectedScrap"],

  computed: {
    type() {
      return this.$route.params.type;
    },
  },

  data: () => ({
    scrap: "",
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
        key: "selectedScrap", // VALUE NAME ที่ จะอัพเดท ใน parent()
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
    let scrap = await axiosInstance.post(`/failure-detail/${this.lineId}`, {
      type: "SCRAP",
    });
    this.scrap = scrap;
    // station = station.slice(4, 9); @@@@@@@@@@@@@@@@@@@@@@ใช้ตอน scrap @@@@@@@@@@@
    // station = station.filter((e) => {
    //   const re = new RegExp("inspection", "i");
    //   return re.test(e.stationName);
    // });
    // console.log("scrap", scrap);
  },
};
</script>
