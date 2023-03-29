<template>
  <v-item-group mandatory :model-value="selectedStaInspec">
    <v-card elevation="3" color="#CFCFCF" class="">
      <div class="ml-4 mt-4 text-h6">Station Inspection :</div>
      <v-col class="pb-4 pt-1" v-for="(item, index) in station" :key="index">
        <v-item v-slot="{ isSelected, toggle }" :value="item.stationName">
          <v-card
            :color="isSelected ? 'primary' : ''"
            class="d-flex justify-center text-h6 pa-6 pb-1 pt-0"
            dark
            @click="
              toggle();
              update(item.stationId); // ADD THIS SHIT
            "
          >
            {{ item.stationId + " " + item.stationName }}
          </v-card>
        </v-item>
      </v-col>
    </v-card>
  </v-item-group>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

export default {
  name: "selectedStaInspec",
  props: ["selectedStaInspec"],

  computed: {
    type() {
      return this.$route.params.type;
    },
  },

  data: () => ({
    station: "",
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
        key: "selectedStaInspec", // VALUE NAME ที่ จะอัพเดท ใน parent()
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
    let station = await axiosInstance.get(`/station/line/${this.lineId}`);
    // station = station.slice(4, 9); @@@@@@@@@@@@@@@@@@@@@@ใช้ตอน scrap @@@@@@@@@@@
    station = station.filter((e) => {
      const re = new RegExp("inspection", "i");
      return re.test(e.stationName);
    });
    this.station = station;
    // console.log("station", station);
  },
};
</script>
