<template>
  <v-card elevation="0">
    <v-row>
      <!-- หัวข้อบนสุด -->
      <v-col cols="12">
        <v-card-title
          align="center"
          class="text-h4 my-4"
          v-if="type == 'F' || type == 'S'"
        >
          Input data for Failure Mode : Fabrication {{ type }} Frame
        </v-card-title>
        <v-card-title align="center" class="text-h4 my-4" v-if="type == 'P'">
          Input data for Defect Type : Paint
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
        <v-card color="#AAAAAA" class="px-2 pb-2 mr-4">
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
                              <v-btn
                                class="ml-2"
                                @click="
                                  (valueclicks = 1), (startAtDT = new Date())
                                "
                              >
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
                                  @click="
                                    (valueclicks = 2), (endAtDT = new Date())
                                  "
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

                    <v-divider vertical thickness="3"></v-divider>

                    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

                    <v-col>
                      <!-- Shift -->
                      <SetShitf @updateValue="updateValue" />

                      <v-divider class="mt-3 mr-3" thickness="3" />

                      <!-- Station -->
                      <SetStation @updateValue="updateValue" />

                      <v-divider class="mt-3 mr-3" thickness="3" />

                      <!-- Caused -->
                      <SetdtCaused @updateValue="updateValue" />

                      <div cols="6" class="d-flex justify-end mt-4">
                        <v-btn :disabled="check1" @click="dialogcheck1 = true">
                          Enter
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>

                <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

                <!-- ตัวเลือก Edit -->
                <v-window-item value="two">
                  <v-row>
                    <v-col cols="7" class="d-flex flex-column">
                      <div class="d-flex justify-center flex-row">
                        <div class="">
                          <div class="text-h6 mb-1">start at:</div>
                          <Datepicker
                            v-model="startAtDate"
                            inline
                            text-input
                            auto-apply
                            mode-height="84"
                            :enableTimePicker="false"
                          />
                          <Datepicker
                            v-model="startAtTime"
                            time-picker
                            inline
                            text-input
                            auto-apply
                            minutes-increment="5"
                            mode-height="84"
                          />
                        </div>
                        <!-- @@@@@@@@@@@@ -->
                        <div>
                          <div class="text-h6 mb-1">end at:</div>
                          <Datepicker
                            v-model="endAtDate"
                            inline
                            text-input
                            auto-apply
                            mode-height="84"
                            :enableTimePicker="false"
                          />
                          <Datepicker
                            v-model="endAtTime"
                            time-picker
                            inline
                            text-input
                            auto-apply
                            minutes-increment="5"
                            mode-height="84"
                          />
                        </div>
                      </div>
                      <!-- Employee Name and ID -->
                      <SetEmployeeName @updateValue="updateValue" />
                    </v-col>

                    <v-divider vertical thickness="3"></v-divider>

                    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

                    <v-col>
                      <!-- Shift -->
                      <SetShitf @updateValue="updateValue" />

                      <v-divider class="mt-3 mr-3" thickness="3" />

                      <!-- Station -->
                      <SetStation @updateValue="updateValue" />

                      <v-divider class="mt-3 mr-3" thickness="3" />

                      <!-- Caused -->
                      <SetdtCaused @updateValue="updateValue" />

                      <div cols="6" class="d-flex justify-end mt-4">
                        <v-btn
                          :disabled="check2"
                          @click="(dialogcheck2 = true), setdata()"
                        >
                          Enter
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
  <v-dialog v-model="dialogcheck1" persistent width="auto">
    <v-card
      color="white"
      width="650"
      height="445"
      class="d-flex justify-center px-4"
    >
      <div align="center" class="text-h4 my-4">
        Check for Completeness
        <v-divider thickness="2" class="mt-2"></v-divider>
      </div>
      <div align="center" class="text-h5 my-4">
        <table>
          <tr>
            <td>Start at :</td>
            <td colspan="2">{{ this.startAtDT }}</td>
          </tr>
          <tr>
            <td>End at :</td>
            <td colspan="2">{{ this.endAtDT }}</td>
          </tr>
          <tr>
            <td>Employee ID and Name :</td>
            <td colspan="2">Group : {{ selectedGroup }}</td>
          </tr>
          <tr>
            <td></td>
            <td colspan="2">{{ this.selectName }}</td>
          </tr>
          <tr>
            <td>Shitf :</td>
            <td>{{ this.selectedDayNight }}</td>
            <td>{{ this.selectedOT }}</td>
          </tr>
          <tr>
            <td>Station Inspection :</td>
            <td colspan="2">{{ this.selectedStation }}</td>
          </tr>
          <tr>
            <td>Failure Mode :</td>
            <td colspan="2">{{ this.selectedDT }}</td>
          </tr>
        </table>
        <v-btn color="primary" variant="text" @click="dialogcheck1 = false">
          cancel
        </v-btn>

        <v-btn
          color="green-darken-1"
          variant="text"
          @click="
            submit1();
            dialogcheck1 = false;
          "
        >
          Agree
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog v-model="dialogcheck2" persistent width="auto">
    <v-card
      color="white"
      width="600"
      height="550"
      class="d-flex justify-center px-4"
    >
      <div align="center" class="text-h4 my-4">
        Check for Completeness
        <v-divider thickness="2" class="mt-2"></v-divider>
      </div>
      <div align="center" class="text-h5 my-4">
        <table>
          <tr>
            <td>Start at :</td>
            <td colspan="2">{{ this.startAt }}</td>
          </tr>
          <tr>
            <td>End at :</td>
            <td colspan="2">{{ this.endAt }}</td>
          </tr>
          <tr>
            <td>Employee ID and Name :</td>
            <td colspan="2">Group : {{ selectedGroup }}</td>
          </tr>
          <tr>
            <td></td>
            <td colspan="2">{{ this.selectName }}</td>
          </tr>
          <tr>
            <td>Shitf :</td>
            <td>{{ this.selectedDayNight }}</td>
            <td>{{ this.selectedOT }}</td>
          </tr>
          <tr>
            <td>Station Inspection :</td>
            <td colspan="2">{{ this.selectedStation }}</td>
          </tr>
          <tr>
            <td>Failure Mode :</td>
            <td colspan="2">{{ this.selectedDT }}</td>
          </tr>
        </table>
        <v-btn color="primary" variant="text" @click="dialogcheck2 = false">
          cancel
        </v-btn>

        <v-btn
          color="green-darken-1"
          variant="text"
          @click="submit2(), (dialogcheck2 = false)"
        >
          Agree
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
  <v-snackbar
    v-model="snackbar"
    timeout="2000"
    location="top"
    :color="error == 'success' ? 'success' : 'error'"
  >
    {{ error }}
  </v-snackbar>
</template>

<script>
import SetEmployeeName from "../components/SetEmployeeName.vue";
import SetShitf from "../components/SetShitf.vue";
import SetStation from "../components/SetStation.vue";
import SetdtCaused from "../components/SetdtCaused.vue";

import Datepicker from "@vuepic/vue-datepicker";

import moment from "moment";
import "@vuepic/vue-datepicker/dist/main.css";
const date = ref(new Date());

import axiosInstance from "../utils/axios.instance";

import { name } from "../assets/constant_F";

import { ref } from "vue";

export default {
  name: "FG_F_Frame",
  components: {
    SetEmployeeName,
    SetShitf,
    SetStation,
    SetdtCaused,
    Datepicker,
  },

  computed: {
    type() {
      return this.$route.params.type;
    },
    check1() {
      if (
        this.selectedGroup !== "" &&
        this.selectName !== "" &&
        this.selectedDayNight !== "" &&
        this.selectedOT !== "" &&
        this.selectedStation !== "" &&
        this.startAtDT !== "" &&
        this.endAtDT !== "" &&
        this.selectedDT !== ""
      ) {
        return false;
      }
      return true;
    },
    check2() {
      if (
        this.selectedGroup !== "" &&
        this.selectName !== "" &&
        this.selectedDayNight !== "" &&
        this.selectedOT !== "" &&
        this.selectedStation !== "" &&
        this.startAtDate !== "" &&
        this.endAtDate !== "" &&
        this.startAtTime !== "" &&
        this.endAtTime !== "" &&
        this.selectedDT !== ""
      ) {
        return false;
      }
      return true;
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

      {
        name: "Bottle Neck",
        id: "4",
        url: "/bottleNeck/",
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
    error: "",

    name: name,
    tab: null,
    interval: {},
    value: 0,
    valueS: 0,
    valueclicks: 0,
    startAtDate: ref(new Date()),
    endAtDate: ref(new Date()),
    startAtTime: ref(new Date()),
    endAtTime: ref(new Date()),
    selectName: "",
    selectedDayNight: "",
    selectedDT: "",
    selectedOT: "",
    selectedStation: "",
    selectedGroup: "",
    startAt: "",
    endAt: "",
    startAtDT: "",
    endAtDT: "",
    dialogcheck1: false,
    dialogcheck2: false,
    snackbar: false,
    selectedStaInspecCheck: "",
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
    async submit1() {
      console.log("startAt :", this.startAtDT);
      console.log("endAt :", this.endAtDT);
      console.log("stationId :", this.selectedStation);
      console.log("availabilityId :", this.selectedDT);
      console.log("employee____________");
      console.log("employeeId :", this.selectName);
      console.log("shift :", this.selectedDayNight);
      console.log("workingTimeType :", this.selectedOT);
      console.log("group :", this.selectedGroup);

      try {
        const b = await axiosInstance.post("/downtime", {
          startAt: this.startAtDT,
          endAt: this.endAtDT,
          stationId: this.selectedStation.split(" ")[0],
          availabilityId: this.selectedDT.split(" ")[0],
          employee: {
            employeeId: this.selectName.split(" ")[0],
            shift: this.selectedDayNight,
            workingTimeType: this.selectedOT,
            group: this.selectedGroup,
          },
        });
        this.error = "success";
        this.dialogcheck = false;
      } catch (error) {
        console.log("error :", error.response);
        this.error = `${error.response.data.statusCode} ${error.response.statusText} \n ${error.response.data.message[0]}`;
      } finally {
        this.snackbar = true;
      }
    },
    async submit2() {
      // console.log("startAtDate", moment(this.startAtDate).format("DDMMYY"));
      // console.log("-startAtTime", moment(this.startAtTime).format("HHmm"));
      // console.log("endAtDate", moment(this.endAtDate).format("DDMMYY"));
      // console.log("-endAtTime", moment(this.endAtTime).format("HHmm"));

      console.log(
        "startAt",
        moment(
          moment(this.startAtDate).format("DDMMYY") +
            moment(this.startAtTime).format("HHmm"),
          "DDMMYYHHmm"
        ).toDate()
      );
      console.log(
        "endAt",
        moment(
          moment(this.endAtDate).format("DDMMYY") +
            moment(this.endAtTime).format("HHmm"),
          "DDMMYYHHmm"
        ).toDate()
      );
      console.log("stationId :", this.selectedStation);
      console.log("availabilityId :", this.selectedDT);
      console.log("employee____________");
      console.log("employeeId :", this.selectName);
      console.log("shift :", this.selectedDayNight);
      console.log("workingTimeType :", this.selectedOT);
      console.log("group :", this.selectedGroup);

      try {
        const b = await axiosInstance.post("/downtime", {
          startAt: moment(
            moment(this.startAtDate).format("DDMMYY") +
              moment(this.startAtTime).format("HHmm"),
            "DDMMYYHHmm"
          ).toDate(),
          endAt: moment(
            moment(this.endAtDate).format("DDMMYY") +
              moment(this.endAtTime).format("HHmm"),
            "DDMMYYHHmm"
          ).toDate(),
          stationId: this.selectedStation.split(" ")[0],
          availabilityId: this.selectedDT.split(" ")[0],
          employee: {
            employeeId: this.selectName.split(" ")[0],
            shift: this.selectedDayNight,
            workingTimeType: this.selectedOT,
            group: this.selectedGroup,
          },
        });
        this.error = "success";
        this.dialogcheck = false;
      } catch (error) {
        console.log("error :", error.response);
        this.error = `${error.response.data.statusCode} ${error.response.statusText} \n ${error.response.data.message[0]}`;
      } finally {
        this.snackbar = true;
      }
    },
    updateValue(event) {
      this[event.key] = event.value;
    },
    setdata() {
      return (
        (this.startAt = moment(
          moment(this.startAtDate).format("DDMMYY") +
            moment(this.startAtTime).format("HHmm"),
          "DDMMYYHHmm"
        ).toDate()),
        (this.endAt = moment(
          moment(this.endAtDate).format("DDMMYY") +
            moment(this.endAtTime).format("HHmm"),
          "DDMMYYHHmm"
        ).toDate())
      );
    },
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
</style>
