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
          class="text-h6"
          bg-color="white"
          variant="solo"
          label="Select a production line"
          :items="this.line"
          v-model="selectedLine"
        >
        </v-autocomplete>
        <div class="d-flex justify-center">
          <Datepicker
            v-model="date"
            inline
            auto-apply
            range
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
        <div class="d-flex justify-center">
          <v-btn @click="genarate()" class="text-h6 mt-6">genarate </v-btn>
        </div>
      </v-col>

      <!-- ---------------------------------------------------------------- -->

      <v-col cols="9">
        <!-- loop -->
        <div v-for="(date, index) in dateRange" :key="index">
          <!-- แสดงวันที่ -->
          <div class="text-h5 d-flex justify-center mb-3 mt-3">{{ date }}</div>
          <v-row>
            <v-col cols="6" class="px-2">
              <v-card width="max" color="#AAAAAA" elevation="0">
                <v-row>
                  <!-- เลือก ot เช้า -->
                  <v-item-group
                    mandatory
                    class="ma-3"
                    v-model="selectedOTDay[index]"
                  >
                    <v-row>
                      <div class="text-h6 d-flex align-self-center ml-6">
                        Day :
                      </div>
                      <v-col v-for="(item, index) in OT">
                        <v-item
                          v-slot="{ isSelected, toggle }"
                          :value="item.send"
                        >
                          <v-card
                            :color="isSelected ? 'primary' : ''"
                            class="d-flex justify-center text-h6 py-2"
                            width="80px"
                            dark
                            v-model="selectedOTDay[index]"
                            @click="toggle"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>

                  <!-- เลือกกลุ่มเช้า -->
                  <v-item-group
                    mandatory
                    class="ma-3 ml-3"
                    v-model="selectedGroupDay[index]"
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
                            v-model="selectedGroupDay[index]"
                            @click="toggle"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-row>

                <!-- Day Target -->
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
                    v-model="targetDay[index]"
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
                  <!-- เลือก ot ดึก -->
                  <v-item-group
                    mandatory
                    class="ma-3"
                    v-model="selectedOTNight[index]"
                  >
                    <v-row>
                      <div class="text-h6 d-flex align-self-center ml-6">
                        Night :
                      </div>
                      <v-col v-for="(item, index) in OT">
                        <v-item
                          v-slot="{ isSelected, toggle }"
                          :value="item.send"
                        >
                          <v-card
                            :color="isSelected ? 'primary' : ''"
                            class="d-flex justify-center text-h6 py-2"
                            width="80px"
                            dark
                            v-model="selectedOTNight[index]"
                            @click="toggle"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>

                  <!-- เลือกกลุ่มดึก -->
                  <v-item-group
                    mandatory
                    class="ma-3 ml-6"
                    v-model="selectedGroupNight[index]"
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
                            v-model="selectedGroupNight[index]"
                            @click="toggle()"
                          >
                            {{ item.name }}
                          </v-card>
                        </v-item>
                      </v-col>
                    </v-row>
                  </v-item-group>
                </v-row>

                <!-- Night Target -->
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
                    v-model="targetNight[index]"
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

        <div class="d-flex justify-end mt-4 mr-5">
          <v-btn
            v-if="btn == 1"
            color="primary"
            class="text-h5"
            @click="dialogcheck = true"
            >Enter</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-card>

  <!-- dialog check -->
  <v-dialog v-model="dialogcheck" persistent width="auto">
    <v-card
      color="white"
      width="1000"
      height="500"
      class="d-flex justify-center px-4"
    >
      <div align="center" class="text-h4 my-4">
        Check for Completeness
        <v-divider thickness="2" class="mt-2"></v-divider>
      </div>
      <div align="center" class="text-h5 my-4">
        <table>
          <tr>
            <td></td>
            <td colspan="3">Day</td>
            <td colspan="3">Night</td>
          </tr>
          <tr>
            <td></td>
            <td>Working Time Type</td>
            <td>Group</td>
            <td>Target</td>
            <td>Working Time Type</td>
            <td>Group</td>
            <td>Target</td>
          </tr>
          <tr v-for="(date, index) in dateRange" :key="index">
            <td>{{ date }}</td>
            <td>{{ selectedOTDay[index] }}</td>
            <td>{{ selectedGroupDay[index] }}</td>
            <td>{{ targetDay[index] }}</td>
            <td>{{ selectedOTNight[index] }}</td>
            <td>{{ selectedGroupNight[index] }}</td>
            <td>{{ targetNight[index] }}</td>
          </tr>
        </table>
        <v-btn color="primary" variant="text" @click="dialogcheck = false">
          cancel
        </v-btn>

        <v-btn color="green-darken-1" variant="text" @click="submit()">
          Agree
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";
import axiosInstance from "../utils/axios.instance";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

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
    selectedOTDay: [],
    selectedOTNight: [],
    selectedGroupDay: [],
    selectedGroupNight: [],
    targetDay: [],
    targetNight: [],
    selectedLine: "",
    date: ref(),
    dateRange: [],
    btn: 0,
    dialogcheck: false,
    forsubmit: {
      shitf: [],
      workingTimeType: [],
      group: [],
      lineId: [],
      date: [],
    },
  }),
  async created() {
    const lineA = await axiosInstance.get(`/line`);
    this.line = lineA.map((n) => `${n.lineId} ${n.lineName}`);
    // console.log("line", this.line);
  },
  methods: {
    genarate() {
      const date1 = this.date[0];
      const date2 = this.date[1];
      const setupdate = [];
      const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      let current = date1;
      while (current <= date2) {
        setupdate.push(current.toLocaleDateString("en-GB", options));
        current.setDate(current.getDate() + 1);
      }
      this.dateRange = setupdate;
      this.btn = 1;
      return;
    },
    async submit() {
      // console.log("selectedLine", this.selectedLine.split(" ")[0]);
      // console.log("selectedOTDay", this.selectedOTDay);
      // console.log("selectedOTNight", this.selectedOTNight);
      // console.log("selectedGroupDay", this.selectedGroupDay);
      // console.log("selectedGroupNight", this.selectedGroupNight);
      // console.log("targetDay", this.targetDay);
      // console.log("targetNight", this.targetNight);

      for (let i = 0; i < this.dateRange.length; i++) {
        console.log("i", i);
        // console.log("date", moment(this.dateRange[i]).toDate());
        // console.log("target", parseInt(this.targetDay[i]));
        // console.log("shitf", "DAY");
        // console.log("group", this.selectedGroupDay[i]);
        // console.log("workingTimeType", this.selectedOTDay[i]);
        // console.log("lineId", parseInt(this.selectedLine.split(" ")[0]));

        // Day @@@@@@@
        const dateDay = moment(this.dateRange[i]).toDate();
        const targetDay = parseInt(this.targetDay[i]);
        const groupDay = this.selectedGroupDay[i];
        const workingTimeTypeDay = this.selectedOTDay[i];
        const lineIdDay = parseInt(this.selectedLine.split(" ")[0]);

        // Night @@@@@@@
        const dateNight = moment(this.dateRange[i]).toDate();
        const targetNight = parseInt(this.targetNight[i]);
        const groupNight = this.selectedGroupNight[i];
        const workingTimeTypeNight = this.selectedOTNight[i];
        const lineIdNight = parseInt(this.selectedLine.split(" ")[0]);

        const b = await axiosInstance.post("/production-plan", {
          plans: [
            {
              date: dateDay,
              target: targetDay,
              shift: "DAY",
              group: groupDay,
              workingTimeType: workingTimeTypeDay,
              lineId: lineIdDay,
            },
            {
              date: dateNight,
              target: targetNight,
              shift: "NIGHT",
              group: groupNight,
              workingTimeType: workingTimeTypeNight,
              lineId: lineIdNight,
            },
          ],
        });
        console.log("DAY completed", i);
        console.log("NIGHT completed", i);
        // const n = await axiosInstance.post("/production-plan", {
        //   date: dateNight,
        //   target: targetNight,
        //   shift: "NIGHT",
        //   group: groupNight,
        //   workingTimeType: workingTimeTypeNight,
        //   lineId: lineIdNight,
        // });
      }

      // for (let i = 0; i < this.dateRange.length; i++) {
      //   const date = moment(this.dateRange[i]).toDate();
      //   const dayData = {
      //     date: date,
      //     target: this.targetDay[i],
      //     shift: "DAY",
      //     group: this.selectedGroupDay[i],
      //     workingTimeType: this.selectedOTDay[i],
      //     lineId: this.selectedLine.split(" ")[0],
      //   };
      //   const nightData = {
      //     date: date,
      //     target: this.targetNight[i],
      //     shift: "NIGHT",
      //     group: this.selectedGroupNight[i],
      //     workingTimeType: this.selectedOTNight[i],
      //     lineId: this.selectedLine.split(" ")[0],
      //   };
      //   const headers = {
      //     "Content-Type": "application/json",
      //   };

      //   const b = await axiosInstance.post("/production-plan", dayData);
      //   const n = await axiosInstance.post("/production-plan", nightData);
      //   console.log("NIGHT completed", i);
      // }
    },
  },
};
</script>

<style scoped>
.red-color {
  color: red;
}
table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-family: sans-serif;
  font-size: 0.8rem;
  width: 100%;
}

td,
th {
  border: 1px solid rgb(190, 190, 190);
  padding: 4px 20px;
}

th {
  background-color: rgb(235, 235, 235);
}

td {
  text-align: left;
}

tr:nth-child(even) td {
  background-color: rgb(250, 250, 250);
}

tr:nth-child(odd) td {
  background-color: rgb(240, 240, 240);
}
.center {
  margin: 0 auto;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
}
</style>
