<template>
  <v-card elevation="0">
    <v-row>
      <!-- หัวข้อบนสุด -->
      <v-col cols="12">
        <v-card-title align="center" class="text-h4 my-4">
          Input data for Failure Mode : Fabrication F Frame
        </v-card-title>
        <v-divider thickness="2" class="mt-2"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <!-- ตัวเลือกทางด้านซ้าย -->
        <v-item-group mandatory model-value="3">
          <v-card elevation="0" class="ml-4">
            <v-col v-for="(item, index) in title" :key="index">
              <v-item v-slot="{ isSelected, toggle }" :value="item.id">
                <v-card
                  :color="isSelected ? 'primary' : '#D9D9D9'"
                  class="d-flex justify-center pa-6 text-h6"
                  dark
                  @click="toggle"
                  :to="item.url + gettype()"
                >
                  {{ item.name }}
                </v-card>
              </v-item>
            </v-col>
          </v-card>
        </v-item-group>
      </v-col>

      <v-col>
        <v-card height="850" color="#AAAAAA" class="pa-4 mr-4">
          <v-card elevation="5" color="#CFCFCF" class="mt-4">
            <v-tabs v-model="tab" fixed-tabs bg-color="primary">
              <v-tab value="one">Downtime</v-tab>
              <v-tab value="two">Edit</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="tab" class="d-flex justify-center">
                <!-- ตัวเลือก Downtime -->
                <v-window-item value="one">
                  <v-row>
                    <v-col cols="6" class="d-flex align-start flex-column mb-6">
                      <v-row>
                        <v-timeline side="end" align="start">
                          <v-timeline-item dot-color="green" size="small">
                            <strong class="mr-4">Downtime</strong>
                            <!--strong>New Icon</strong-->
                            <div class="">
                              ถ้าเครื่องจักรหยุดทำงานให้กดปุ่ม
                              <v-btn class="ml-2" @click="valueclicks = 1">
                                time start
                              </v-btn>
                            </div>
                          </v-timeline-item>

                          <v-timeline-item dot-color="pink" size="small">
                            <div class="">
                              <strong class="mr-4">
                                Is in the process of correcting
                              </strong>

                              <v-col class="d-flex justify-content-center">
                                <v-progress-circular
                                  :width="10"
                                  :size="70"
                                  color="error"
                                  indeterminate
                                  v-if="valueclicks == 1"
                                ></v-progress-circular>

                                <div
                                  class="text-center text-h4 align-self-center"
                                >
                                  {{ countsec() }}
                                </div>

                                <!-- <div class="d-flex justify-center">
                                  <v-btn @click="valueclicks = 2">
                                    Pause
                                  </v-btn>
                                </div> -->
                              </v-col>
                            </div>
                          </v-timeline-item>

                          <v-timeline-item dot-color="green" size="small">
                            <div class="d-flex">
                              <div>
                                <strong>Machine Start</strong>
                              </div>
                            </div>
                            <div class="mt-2">
                              <div class="mt-1">
                                หลังจากกลับมาเดินเครื่องกดปุ่ม
                                <v-btn
                                  class="ml-2 mb-3"
                                  @click="valueclicks = 2"
                                >
                                  time stop
                                </v-btn>
                              </div>
                              เลือกรายละเอียดเครื่องจักรและสาเหตุที่เกิดขึ้นทางด้านซ้าย
                            </div>
                          </v-timeline-item>
                        </v-timeline>
                      </v-row>

                      <!-- Employee Name and ID -->

                      <SetEmployeeName @updateValue="updateValue" />
                    </v-col>

                    <v-divider vertical color="black" thickness="1"></v-divider>

                    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

                    <v-col>
                      <!-- Shift -->
                      <SetShitf @updateValue="updateValue" />

                      <v-divider class="mt-3 mr-3" thickness="3" />

                      <!-- Station -->
                      <v-card
                        color="#CFCFCF"
                        class="pt-3 overflow-y-auto mt-2"
                        elevation="8"
                        height="170px"
                      >
                        <div class="text-h6 ml-3">Station :</div>
                        <v-col cols="12" class="">
                          <v-item-group mandatory>
                            <v-row>
                              <v-col
                                cols="4"
                                class="pb-1 pt-1"
                                v-for="(item, index) in station"
                                :key="index"
                              >
                                <v-item v-slot="{ isSelected, toggle }">
                                  <v-card
                                    :color="isSelected ? 'primary' : ''"
                                    class="d-flex justify-center text-h6"
                                    dark
                                    @click="toggle"
                                  >
                                    {{ item.name }}
                                  </v-card>
                                </v-item>
                              </v-col>
                            </v-row>
                          </v-item-group>
                        </v-col>
                      </v-card>

                      <v-divider class="mt-3 mr-3" thickness="3" />

                      <!-- Caused -->
                      <v-card
                        color="#CFCFCF"
                        height="300px"
                        class="py-3 overflow-y-auto mt-2 mb-3"
                        elevation="8"
                        ><div class="text-h6 ml-3">
                          Select the problem that caused the downtime :
                        </div>
                        <v-col cols="12" class="pa-0">
                          <v-item-group mandatory>
                            <v-col
                              class="pb-1 pt-1"
                              v-for="(item, index) in downtime_f"
                              :key="index"
                            >
                              <v-item v-slot="{ isSelected, toggle }">
                                <v-card
                                  :color="isSelected ? 'primary' : ''"
                                  class="d-flex justify-center text-h6"
                                  dark
                                  @click="toggle"
                                >
                                  {{ item.name }}
                                </v-card>
                              </v-item>
                            </v-col>
                          </v-item-group>
                        </v-col>
                      </v-card>
                      <div cols="6" class="d-flex justify-end mt-4">
                        <v-btn> Enter </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>

                <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

                <!-- ตัวเลือก Edit -->
                <v-window-item value="two">
                  <v-card
                    height="735px"
                    color="#CFCFCF"
                    elevation="0"
                    class="text-h6"
                  >
                    Select Time :</v-card
                  >
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import SetEmployeeName from "../components/SetEmployeeName.vue";
import SetShitf from "../components/SetShitf.vue";
import moment from "moment";
import axiosInstance from "../utils/axios.instance";

import { name } from "../assets/constant_F";

export default {
  name: "FG_F_Frame",
  components: {
    SetEmployeeName,
    SetShitf,
  },

  computed: {
    type() {
      return this.$route.params.type;
    },
  },

  methods: {
    // getdatenow() {
    //   return moment().format("MMMM Do YYYY");
    // },
    submit() {
      // console.log(this.selectedValueModel);
      // console.log(this.dataPin);
      // console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
    },
    updateValue(event) {
      this[event.key] = event.value;
    },
  },

  data: () => ({
    title: [
      {
        name: "Finished Goods",
        id: "1",
        url: "/FG_F/",
      },
      {
        name: "Defect Type",
        id: "2",
        url: "/NG_F/",
      },
      {
        name: "Failure Mode",
        id: "3",
        url: "/DT_F/",
      },
    ],
    station: [
      {
        name: "OP1",
        id: 1,
      },
      {
        name: "OP2",
        id: 2,
      },
      {
        name: "OP3",
        id: 3,
      },
      {
        name: "OP4",
        id: 4,
      },
      {
        name: "OP5",
        id: 5,
      },
      {
        name: "OP6",
        id: 6,
      },
      {
        name: "OP7",
        id: 7,
      },
      {
        name: "OP8",
        id: 8,
      },
      {
        name: "OP9",
        id: 9,
      },
    ],
    machine: [
      {
        name: "machine01",
        id: 1,
      },
      {
        name: "machine02",
        id: 2,
      },
      {
        name: "machine03",
        id: 3,
      },
    ],
    downtime_f: [
      { name: "Machine Weld cell 1 Break Down", id: 1 },
      { name: "Machine Weld cell 2 Break Down", id: 2 },
      { name: "Machine Weld cell X Change Over", id: 3 },
      { name: "Machine Weld cell X Robot Teaching", id: 4 },
      { name: "Machine Makino cell 1 Break Down", id: 5 },
      { name: "Man Power Absentee", id: 6 },
      { name: "Material Shortage", id: 7 },
      { name: "Material Reject", id: 8 },
      { name: "Quality check and inspection Down time", id: 9 },
      { name: "Electrical  EE ,Gas GA,Air Ai ,", id: 10 },
    ],

    name: name,
    tab: null,
    interval: {},
    value: 0,
    valueS: 0,
    valueSS: 0,
    valueM: 0,
    valueMM: 0,
    valueH: 0,
    valueHH: 0,
    valueclicks: 0,
    selectName: null,
  }),
  beforeUnmount() {
    clearInterval(this.interval);
  },

  // ตัวจับเวลา
  mounted() {
    this.interval = setInterval(() => {
      if (this.valueclicks === 1) {
        this.valueS += 1;
        this.value += 1;
        // return (this.value = 0);
      }
      if (this.valueclicks === 2) {
        return (this.valueS = this.valueS);
      }
      if (this.valueclicks === 3) {
        return (this.valueS = 0);
      }
    }, 1000);
  },
  methods: {
    countsec() {
      return moment.utc(this.value * 1000).format("HH:mm:ss");
    },
    getdatenow() {
      return moment().format("MMMM Do YYYY");
    },
    gettype() {
      return this.type;
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
