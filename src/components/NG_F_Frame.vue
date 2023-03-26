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
          Input data for Defect Type : Fabrication {{ type }} Frame
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
        <v-item-group mandatory model-value="2">
          <v-card elevation="0" class="ml-4 mt-n6">
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
        <v-card min-height="820" color="#AAAAAA" class="pa-4 mr-4 mt-n3">
          <v-row>
            <v-col cols="6">
              <!-- Model -->
              <SetModel
                v-if="type !== 'P'"
                class="mb-3"
                @updateValue="updateValue"
              />

              <!-- Pin Stamp Number -->
              <SetPinStampNumber @updateValue="updateValue" />

              <!-- Employee Name and ID  -->
              <SetEmployeeName @updateValue="updateValue" />

              <!-- Shift -->
              <SetShitf class="mt-3" @updateValue="updateValue" />

              <!-- Station -->
              <SetStation
                v-if="type == 'P'"
                class="mt-3"
                @updateValue="updateValue"
              />
            </v-col>

            <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

            <v-col cols="6">
              <!-- StationInspection -->
              <SetStationInspec
                v-if="type !== 'P'"
                class="mb-3"
                @updateValue="updateValue"
              />

              <SetDefectType
                v-if="type == 'P'"
                class="mb-3"
                @updateValue="updateValue"
              />

              <!-- Scrap Repair -->
              <v-card
                v-if="type == 'F' || type == 'S'"
                elevation="5"
                color="#CFCFCF"
              >
                <v-tabs v-model="tab" bg-color="primary">
                  <v-tab value="one">Scrap</v-tab>
                  <v-tab value="two">Repair</v-tab>
                </v-tabs>

                <v-window v-model="tab">
                  <!-- Scrap -->
                  <v-window-item value="one">
                    <SetScrap @updateValue="updateValue" />
                  </v-window-item>

                  <!-- Repair -->
                  <v-window-item value="two">
                    <SetRepair @updateValue="updateValue" />
                  </v-window-item>
                </v-window>
              </v-card>

              <!-- Rework -->
              <v-card v-if="type == 'P'" elevation="5" color="#CFCFCF">
                <v-tabs v-model="tab" bg-color="primary">
                  <v-tab value="one">Rework</v-tab>
                </v-tabs>

                <v-window v-model="tab">
                  <!-- Rework -->
                  <v-window-item value="one">
                    <SetRework @updateValue="updateValue" />
                  </v-window-item>
                </v-window>
              </v-card>

              <!-- Enter -->
              <div cols="6" class="d-flex justify-end mt-4">
                <!-- <v-btn class="mr-4"> PRINT </v-btn> -->
                <v-btn
                  v-if="type != 'P'"
                  :disabled="check"
                  @click="dialogcheck = true"
                >
                  Enter
                </v-btn>
                <v-btn
                  v-if="type == 'P'"
                  :disabled="checkP"
                  @click="dialogcheck = true"
                >
                  Enter
                </v-btn>
              </div>

              <!-- dialog enter -->
              <!-- <v-dialog v-model="dialogEnter">
                <v-card height="600px" width="775px" class="px-3 center">
                  <v-col class="text-h4 d-flex justify-center">
                    <div>NCM TAG</div>
                  </v-col>

                  <v-row>
                    <v-col cols="6">
                      <b> A. Date: (MM/DD/YY)</b>
                      {{ getdatenow() }}</v-col
                    >
                    <v-col cols="6">
                      <b>E. Rotation Group#:</b>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6"
                      ><b> B. Part Number: </b>{{ dataPin.pinNumber }}
                    </v-col>
                    <v-col cols="6"><b> F. Area Resp:</b></v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6"
                      ><b> C. Part Description: </b>
                      <v-textarea rows="1"> </v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <b> G. Identified By:</b> <br /><br />
                      <b> H. Quantity:</b>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <b>D. Non-Conforming Conditions:</b>
                      <v-textarea rows="6"> </v-textarea>
                    </v-col>
                    <v-col cols="6">
                      <b>I. Security#(if applicable):</b>
                      <v-divider color="black" thickness="2" class="mt-0" />
                      <table>
                        <tr>
                          <th scope="row" rowspan="6">Disp</th>
                          <td>Use As ir</td>
                          <td>
                            <input type="checkbox" />
                          </td>
                        </tr>
                        <tr>
                          <td>Rework</td>
                          <td><input type="checkbox" /></td>
                        </tr>
                        <tr>
                          <td>Repair</td>
                          <td><input type="checkbox" /></td>
                        </tr>
                        <tr>
                          <td>Return to Supplier</td>
                          <td><input type="checkbox" /></td>
                        </tr>
                        <tr>
                          <td>Return Inter-Plant</td>
                          <td><input type="checkbox" /></td>
                        </tr>
                        <tr>
                          <td>Scrap</td>
                          <td><input type="checkbox" /></td>
                        </tr>
                      </table>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6"> </v-col>
                  </v-row>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      variant="text"
                      onclick="window.print()"
                    >
                      Print
                    </v-btn>
                    <v-btn
                      color="green-darken-1"
                      variant="text"
                      @click="
                        dialogEnter = false;
                        submit();
                      "
                    >
                      Agree
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->

              <!-- dialog check -->
              <v-dialog v-model="dialogcheck" persistent width="auto">
                <v-card
                  color="white"
                  width="600"
                  height="500"
                  class="d-flex justify-center px-4"
                >
                  <div align="center" class="text-h4 my-4">
                    Check for Completeness
                    <v-divider thickness="2" class="mt-2"></v-divider>
                  </div>
                  <div align="center" class="text-h5 my-4">
                    <table>
                      <tr v-if="type != 'P'">
                        <td>Model :</td>
                        <td colspan="2">{{ this.modelCheck }}</td>
                      </tr>
                      <td>Pin Stamp Number :</td>
                      <td>{{ this.dataPin.date }}</td>
                      <td>{{ this.dataPin.time }}</td>
                      <tr>
                        <td></td>
                        <td>{{ this.dataPin.pinNumber }}</td>
                        <td>{{ this.dataPin.machine }}</td>
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
                      <tr v-if="type != 'P'">
                        <td>Station Inspection :</td>
                        <td colspan="2">{{ this.selectedStaInspecCheck }}</td>
                      </tr>
                      <tr>
                        <td>Defect Type :</td>
                        <td>
                          {{ this.selectedDefectType }}
                        </td>
                        <td>
                          {{ this.selectedSRR }}
                        </td>
                      </tr>
                    </table>
                    <v-btn
                      color="primary"
                      variant="text"
                      @click="dialogcheck = false"
                    >
                      cancel
                    </v-btn>

                    <v-btn
                      color="green-darken-1"
                      variant="text"
                      @click="submit()"
                    >
                      Agree
                    </v-btn>
                  </div>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
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
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import axiosInstance from "../utils/axios.instance";

import SetModel from "../components/SetModel.vue";
import SetPinStampNumber from "../components/SetPinStampNumber.vue";
import SetEmployeeName from "../components/SetEmployeeName.vue";
import SetShitf from "../components/SetShitf.vue";
import SetStationInspec from "../components/SetStationInspec.vue";
import SetStation from "../components/SetStation.vue";
import SetScrap from "../components/SetScrap.vue";
import SetRepair from "../components/SetRepair.vue";
import SetRework from "../components/SetRework.vue";
import SetDefectType from "../components/SetDefectType.vue";
import { btn_img1, cause, scrap_f } from "../assets/constant_F";

const date = ref();

export default {
  name: "NG_F_Frame",

  components: {
    Datepicker,
    SetModel,
    SetPinStampNumber,
    SetEmployeeName,
    SetShitf,
    SetStationInspec,
    SetScrap,
    SetRepair,
    SetRework,
    SetDefectType,
    SetStation,
  },

  computed: {
    type() {
      return this.$route.params.type;
    },

    check() {
      if (
        this.selectedValueModel !== "" &&
        this.dataPin.pinNumber !== null &&
        this.dataPin.machine !== null &&
        this.selectedGroup !== "" &&
        this.selectName !== "" &&
        this.selectedDayNight !== "" &&
        this.selectedOT !== "" &&
        this.selectedStaInspec !== "" &&
        (this.selectedScrap !== "" || this.selectedRepair !== "")
      ) {
        return false;
      }
      return true;
    },
    checkP() {
      if (
        this.dataPin.pinNumber !== null &&
        this.dataPin.machine !== null &&
        this.selectedGroup !== "" &&
        this.selectName !== "" &&
        this.selectedDayNight !== "" &&
        this.selectedOT !== "" &&
        this.selectedStation !== "" &&
        this.selectedSRR !== "" &&
        this.selectedDefectType !== ""
      ) {
        return false;
      }
      return true;
    },
  },

  data: () => ({
    isShowTitle: "",
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
    lineId: null,
    scrap: "",
    cause: cause,
    btn_img1: btn_img1,

    tab: null,
    dialog: false,
    dialog2: false,
    dialogEnter: false,
    dialogcheck: false,
    selectName: null,
    //date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    snackbar: false,
    error: "",

    selectedValueModel: "",
    selectName: "",
    selectedDayNight: "",
    selectedOT: "",
    selectedStaInspec: "",
    selectedStaInspecCheck: "",
    selectedScrap: "",
    selectedRepair: "",
    selectedRework: "",
    selectedScrapC: "",
    selectedRepairC: "",
    selectedReworkC: "",
    selectedSRR: "",
    selectedGroup: "",
    selectedDefectType: "",
    selectedStation: "",
    serialNumberSent: "",
    dataPin: { pinNumber: null, machine: null },
  }),

  methods: {
    getdatenow() {
      return moment().format("MMMM Do YYYY");
    },

    async submit() {
      console.log("modelId :", this.selectedValueModel);
      console.log(
        "serialNumber :",
        `${this.dataPin.date}-${this.dataPin.time}-${this.dataPin.pinNumber}`
      );
      console.log(
        "timestamp :",
        moment(this.dataPin.date + this.dataPin.time, "DDMMYYHH:mm:00").toDate()
      );
      console.log("defect_____________");
      console.log("stationId :", this.selectedStaInspec);
      console.log("failureDetailId :", this.selectedScrap.split(" ")[0]);
      console.log("position :", "1");
      console.log("employee___________");
      console.log("employeeId :", this.selectName.split(" ")[0]);
      console.log("shift :", this.selectedDayNight);
      console.log("workingTimeType :", this.selectedOT);
      console.log("group :", this.selectedGroup);

      // console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
      console.log("this.dataPin.pinNumber}", this.dataPin.pinNumber);

      const numToStr = this.dataPin.pinNumber.toString();
      if (numToStr == this.dataPin.pinNumber.toString()) {
        this.serialNumberSent = `${this.dataPin.date}-${this.dataPin.time}-${numToStr}`;
      } else {
        this.serialNumberSent = "";
      }

      if (this.type == "F" || this.type == "S") {
        try {
          const b = await axiosInstance.post("/product", {
            modelId: this.selectedValueModel,
            serialNumber: this.serialNumberSent,
            machineNumber: this.dataPin.machine,
            timestamp: moment(
              this.dataPin.date + this.dataPin.time,
              "DDMMYYHH:mm"
            ).toDate(),
            defect: {
              stationId: this.selectedStaInspec,
              failureDetailId: this.selectedSRR,
              position: "null",
            },
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
      }
      if (this.type == "P") {
        try {
          const b = await axiosInstance.post("/product/paint", {
            serialNumber: this.serialNumberSent,
            paintAt: new Date(),
            lineId: 3,
            defect: {
              stationId: this.selectedStation.split(" ")[0],
              failureDetailId: this.selectedSRR,
              defectTypeId: this.selectedDefectType.split(" ")[0],
            },
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
      }
    },
    updateValue(event) {
      this[event.key] = event.value;

      if (this.selectedScrapC != this.selectedScrap) {
        this.selectedScrapC = this.selectedScrap;
        this.selectedSRR = parseInt(this.selectedScrap.split(" ")[0]);
      }
      if (this.selectedRepairC != this.selectedRepair) {
        this.selectedRepairC = this.selectedRepair;
        this.selectedSRR = parseInt(this.selectedRepair.split(" ")[0]);
      }
      if (this.selectedReworkC != this.selectedRework) {
        this.selectedReworkC = this.selectedRework;
        this.selectedSRR = this.selectedRework.split(" ")[0];
      }

      switch (this.selectedValueModel) {
        case 1:
          this.modelCheck = "Model F01";
          break;
        case 2:
          this.modelCheck = "Model F02";
          break;
        case 3:
          this.modelCheck = "Model F03";
          break;
        case 4:
          this.modelCheck = "Model S01";
          break;
        case 5:
          this.modelCheck = "Model S02";
          break;
        case 6:
          this.modelCheck = "Model S03";
          break;
        case 7:
          this.modelCheck = "Model S04";
          break;
      }
      switch (this.selectedStaInspec) {
        case "OPF05":
          this.selectedStaInspecCheck = "OPF05 Inspection 1";
          break;
        case "OPF08":
          this.selectedStaInspecCheck = "OPF08 Inspection 2";
          break;
        case "OPF10":
          this.selectedStaInspecCheck = "OPF10 Q-Gate Inspection 3";
          break;
        case "OPS04":
          this.selectedStaInspecCheck = "OPS04 Inspection S";
          break;
        case "OPS05":
          this.selectedStaInspecCheck = "OPS05 Q-Gate Inspection 3";
          break;
      }
    },
    gettype() {
      return this.type;
    },
  },
};
</script>

<style scoped>
.center {
  margin: 0 auto;
}
.absolute {
  position: absolute;
}
.relative {
  position: relative;
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
