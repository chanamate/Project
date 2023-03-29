<template>
  <v-card
    color="#CFCFCF"
    :height="type !== 'P' ? '300px' : '260px'"
    class="py-3 overflow-y-auto mt-2 mb-3"
    elevation="8"
  >
    <div v-if="type !== 'P'" class="text-h6 ml-3">
      Select the problem that caused the downtime :
    </div>
    <div v-if="type == 'P'" class="text-h6 ml-3">Failure Mode :</div>
    <v-card
      color="#CFCFCF"
      class="py-3 overflow-y-auto mt-2 mb-3"
      elevation="0"
    >
      <v-col cols="12" class="pa-0">
        <v-item-group mandatory :model-value="selectedDT">
          <v-col class="pb-1 pt-1" v-for="(item, index) in dt_f" :key="index">
            <v-item v-slot="{ isSelected, toggle }" :value="item.details">
              <v-card
                :color="isSelected ? 'primary' : ''"
                class="d-flex justify-center text-h6"
                dark
                @click="
                  toggle();
                  update(item.availabilityId + ` ` + item.details);
                "
              >
                {{ item.availabilityId + ` ` + item.details }}
              </v-card>
            </v-item>
          </v-col>
        </v-item-group>
      </v-col>
    </v-card>
  </v-card>
</template>

<script>
import axiosInstance from "../utils/axios.instance";

export default {
  name: "selectedDT",
  props: ["selectedDT"],

  computed: {
    type() {
      return this.$route.params.type;
    },
  },

  data: () => ({
    scrap: "",
    dt_f: "",
    lineId: null,
  }),

  async mounted() {
    const line = await axiosInstance.get("/line");
    this.lineList = line;
    // console.log(this.lineId);
  },

  methods: {
    // ADD THIS SHIT
    update(e) {
      this.$emit("updateValue", {
        key: "selectedDT", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
  },
  async created() {
    switch (this.type) {
      case "F":
        this.lineId = 1;
        const FF = await axiosInstance.get(`/availability-lose/${this.lineId}`);
        this.dt_f = FF;
        break;
      case "S":
        this.lineId = 2;
        const SS = await axiosInstance.get(`/availability-lose/${this.lineId}`);
        this.dt_f = SS;
        break;
      case "P":
        this.lineId = 3;
        const PP = await axiosInstance.get(`/availability-lose/${this.lineId}`);
        this.dt_f = PP;
        break;
    }
    console.log(
      "🚀 ~ file: SetdtCaused.vue:89 ~ created ~ this.dt_f:",
      this.dt_f
    );
    // const dt_f = await axiosInstance.get(`/availability-lose/${this.lineId}`);
    // this.dt_f = dt_f;

    // console.log(typeof this.dt_f);
    // let scrap = await axiosInstance.post(`/failure-detail/${this.lineId}`, {
    //   type: "SCRAP",
    // });
    // station = station.slice(4, 9); @@@@@@@@@@@@@@@@@@@@@@ใช้ตอน scrap @@@@@@@@@@@
    // station = station.filter((e) => {
    //   const re = new RegExp("inspection", "i");
    //   return re.test(e.stationName);
    // });
    // this.scrap = scrap;
    // console.log("scrap", scrap);
  },
};
</script>
