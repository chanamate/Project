<template>
  <v-row>
    <!-- หัวข้อบนสุด -->
    <v-col cols="12">
      <v-card-title align="center" class="text-h3 my-4">
        Production Plan
      </v-card-title>
    </v-col>
  </v-row>
  <v-card color="#AAAAAA" class="pa-4 mx-4">
    <v-row>
      <v-col cols="3">
        <v-autocomplete
          label="Select a production line"
          :items="this.line"
        ></v-autocomplete>
        <div class="d-flex justify-center">
          <Datepicker
            v-model="date"
            inline
            auto-apply
            range
            auto-range="5"
            :disabled-week-days="[0]"
            :enableTimePicker="false"
          >
            <template #calendar-header="{ index, day }">
              <div :class="index === 6 ? 'red-color' : ''">
                {{ day }}
              </div>
            </template>
          </Datepicker>
        </div>
        <v-btn @click="genarate()">genarate</v-btn>
      </v-col>

      <!-- ---------------------------------------------------------------- -->

      <v-col cols="9">
        <div v-for="(date, index) in dateRange" :key="index">
          <div class="text-h5 d-flex justify-center mb-3 mt-3">{{ date }}</div>
          <v-row>
            <v-col cols="6" class="px-2">
              <v-card width="max" color="#AAAAAA" elevation="0">
                <v-row>
                  <v-item-group
                    mandatory
                    class="ma-3"
                    :model-value="selectedOT"
                  >
                    <v-row>
                      <div class="text-h6 d-flex align-self-center ml-6">
                        Day :
                      </div>
                      <v-col v-for="(item, index) in OT">
                        <v-item
                          v-slot="{ isSelected, toggle }"
                          :value="item.name"
                        >
                          <v-card
                            :color="isSelected ? 'primary' : ''"
                            class="d-flex justify-center text-h6 py-2"
                            width="80px"
                            dark
                            @click="toggle()"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                  <v-item-group
                    mandatory
                    class="ma-3 ml-6"
                    :model-value="selectedgroup"
                  >
                    <v-row>
                      <div class="text-h6 d-flex align-self-center ml-6">
                        Group :
                      </div>
                      <v-col v-for="(item, index) in group">
                        <v-item
                          v-slot="{ isSelected, toggle }"
                          :value="item.name"
                        >
                          <v-card
                            :color="isSelected ? 'primary' : ''"
                            class="d-flex justify-center text-h6 py-2"
                            width="80px"
                            dark
                            @click="toggle()"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-row>
                <div class="text-h6 d-flex align-self-center ml-3 mt-3">
                  <div class="text-h6 d-flex align-self-center mt-2 mr-2">
                    Target :
                  </div>
                  <v-text-field
                    clearable
                    variant="solo"
                    label="( input the number of frames as planned )"
                    hide-details="auto"
                    bg-color="#FFFFFF"
                    class="mt-2"
                    v-model="target"
                  />
                  <div class="text-h6 d-flex align-self-center mt-2 ml-2 mr-6">
                    Frame
                  </div>
                </div>
              </v-card>
            </v-col>
            <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
            <v-col cols="6" class="px-2">
              <v-card width="max" color="#AAAAAA" elevation="0">
                <v-row>
                  <v-item-group
                    mandatory
                    class="ma-3"
                    :model-value="selectedOT"
                  >
                    <v-row>
                      <div class="text-h6 d-flex align-self-center ml-6">
                        Night :
                      </div>
                      <v-col v-for="(item, index) in OT">
                        <v-item
                          v-slot="{ isSelected, toggle }"
                          :value="item.name"
                        >
                          <v-card
                            :color="isSelected ? 'primary' : ''"
                            class="d-flex justify-center text-h6 py-2"
                            width="80px"
                            dark
                            @click="toggle()"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                  <v-item-group
                    mandatory
                    class="ma-3 ml-6"
                    :model-value="selectedgroup"
                  >
                    <v-row>
                      <div class="text-h6 d-flex align-self-center ml-6">
                        Group :
                      </div>
                      <v-col v-for="(item, index) in group">
                        <v-item
                          v-slot="{ isSelected, toggle }"
                          :value="item.name"
                        >
                          <v-card
                            :color="isSelected ? 'primary' : ''"
                            class="d-flex justify-center text-h6 py-2"
                            width="80px"
                            dark
                            @click="toggle()"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-row>
                <div class="text-h6 d-flex align-self-center ml-3 mt-3">
                  <div class="text-h6 d-flex align-self-center mt-2 mr-2">
                    Target :
                  </div>
                  <v-text-field
                    clearable
                    variant="solo"
                    label="( input the number of frames as planned )"
                    hide-details="auto"
                    bg-color="#FFFFFF"
                    class="mt-2"
                    v-model="target"
                  />
                  <div class="text-h6 d-flex align-self-center mt-2 ml-2 mr-6">
                    Frame
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
          <v-divider thickness="2" class="mt-2"></v-divider>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import axiosInstance from "../utils/axios.instance";
import moment from "moment";
import "@vuepic/vue-datepicker/dist/main.css";

import { ref } from "vue";

export default {
  name: "productionPlan",
  components: {
    Datepicker,
  },

  data: () => ({
    line: [],
    OT: [
      {
        name: "OT",
        send: "OVERTIME",
        id: 1,
      },
      {
        name: "No OT",
        send: "NOT_OVERTIME",
        id: 2,
      },
    ],
    group: [
      {
        name: "A",
        id: 1,
      },
      {
        name: "B",
        id: 2,
      },
    ],
    selectedOT: "",
    selectedgroup: "",
    target: "",
    date: ref(),
    dateRange: [],
  }),
  async created() {
    const lineA = await axiosInstance.get(`/line`);
    this.line = lineA.map((n) => `${n.lineId} ${n.lineName}`);
    // console.log("line", this.line);
  },
  methods: {
    genarate() {
      // console.log("date", this.date);
      // console.log("date1", this.date[0]);
      // console.log("date2", this.date[1]);
      // this.date1 = moment(this.date[0]).format("DD MMMM YYYY");
      // this.date2 = moment(this.date[1]).format("DD MMMM YYYY");
      // console.log("date1", this.date1);
      // console.log("date1", this.date2);

      const date1 = this.date[0];
      const date2 = this.date[1];
      console.log("date1", date1);
      console.log("date2", date2);
      const setupdate = [];
      let current = date1;
      while (current <= date2) {
        console.log(current);
        setupdate.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      console.log("setupdate", setupdate);
      this.dateRange = setupdate;
      // console.log("date1", moment(this.date1).format("DD MMMM YYYY"));
      // console.log("date2", moment(this.date2).format("DD MMMM YYYY"));
      return;
    },
  },
};
</script>

<style>
.red-color {
  color: red;
}
</style>
