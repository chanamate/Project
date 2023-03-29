<template>
  <v-card
    color="#CFCFCF"
    class="pt-3 overflow-y-auto"
    elevation="8"
    height="170px"
  >
    <div class="text-h6 ml-3">Station :</div>
    <v-col cols="12" class="">
      <v-item-group mandatory :model-value="selectedStation">
        <v-row>
          <v-col
            cols="4"
            class="pb-1 pt-1"
            v-for="(item, index) in station"
            :key="index"
          >
            <v-item v-slot="{ isSelected, toggle }" :value="item.stationId">
              <v-card
                :color="isSelected ? 'primary' : ''"
                class="d-flex justify-center text-h6"
                dark
                @click="
                  toggle();
                  update(item.stationId + ` ` + item.stationName);
                "
              >
                {{ item.stationId }}
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-col>
  </v-card>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

export default {
  name: "selectedStation",
  props: ["selectedStation"],

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
        key: "selectedStation", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
  },
  async created() {
    switch (this.type) {
      case "F":
        this.lineId = 1;
        let stationFF = await axiosInstance.get(`/station/line/${this.lineId}`);
        stationFF = stationFF.slice(0, 9);
        this.station = stationFF;
        break;
      case "S":
        this.lineId = 2;
        let stationSS = await axiosInstance.get(`/station/line/${this.lineId}`);
        stationSS = stationSS.slice(0, 9);
        this.station = stationSS;
        break;
      case "P":
        this.lineId = 3;
        let stationPP = await axiosInstance.get(`/station/line/${this.lineId}`);

        this.station = stationPP.filter(
          (item) => !item.stationName.includes("Inspection")
        );
        console.log("🚀stationPP:", stationPP);
        console.log("🚀this.station:", this.station);
        break;
    }

    // console.log("station", station);
  },
};
</script>
