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
        <v-card color="#AAAAAA" class="pa-4 mr-4">
          <v-row>
            <v-col cols="6">
              <!-- Model -->
              <SetModel
                type="F"
                :selectedValueModel="selectedValueModel"
                @updateValue="updateValue"
              />

              <!-- Pin Stamp Number -->
              <SetPinStampNumber type="F" @updateValue="updateValue" />

              <!-- Employee Name and ID  -->
              <SetEmployeeName @updateValue="updateValue" />

              <!-- Shift -->
              <SetShitf @updateValue="updateValue" />
            </v-col>

            <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

            <v-col cols="6">
              <!-- StationInspection -->
              <SetStationInspec @updateValue="updateValue" />

              <!-- Scrap Repair Rework -->
              <v-card elevation="5" color="#CFCFCF" class="mt-4">
                <v-tabs v-model="tab" bg-color="primary">
                  <v-tab
                    v-if="type == 'F' || type == 'S' || type == 'P'"
                    value="one"
                    >Scrap</v-tab
                  >
                  <v-tab v-if="type == 'F' || type == 'S'" value="two"
                    >Repair</v-tab
                  >
                  <v-tab v-if="type == 'P'" value="three">Rework</v-tab>
                </v-tabs>

                <v-window v-model="tab">
                  <!-- Scrap -->
                  <v-window-item value="one">
                    <!-- StationInspection -->
                    <SetScrap @updateValue="updateValue" />
                  </v-window-item>

                  <!-- Repair -->
                  <v-window-item value="two">
                    <v-carousel height="471px">
                      <v-card height="471px">
                        <v-card elevation="3" opacity="100">
                          -----ข้อมูลที่เลือก-----
                        </v-card>

                        <!-- pic_1 -->
                        <v-carousel-item
                          src="../src/assets/pic_1.png"
                          @click="dialog = true"
                        >
                          <!-- pic_1 dialog -->
                          <v-dialog v-model="dialog">
                            <v-card class="center">
                              <div width="550" height="360">
                                <v-img
                                  src="../src/assets/pic_1.png"
                                  width="550"
                                  height="360"
                                >
                                  <v-btn
                                    v-for="(el, index) in btn_img1"
                                    :key="index"
                                    class="absolute"
                                    :style="{
                                      top: `${el.Y}px`,
                                      left: `${el.X}px`,
                                    }"
                                    color="red"
                                    size="x-small"
                                    rounded="pill"
                                    @click="(dialog = false), (dialog2 = true)"
                                  >
                                    {{ el.name }}
                                  </v-btn>
                                </v-img>
                              </div>

                              <v-card-actions>
                                <v-btn
                                  color="primary"
                                  block
                                  @click="dialog = false"
                                  >Close Dialog</v-btn
                                >
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-carousel-item>

                        <!-- pic_2 -->
                        <v-carousel-item
                          src="../src/assets/pic_2.png"
                          max-height="500"
                        >
                        </v-carousel-item>

                        <!-- pic_3 -->
                        <v-carousel-item
                          src="../src/assets/pic_3.png"
                          max-height="500"
                        >
                        </v-carousel-item>

                        <!-- dialog2 -->
                        <v-dialog v-model="dialog2">
                          <v-card width="800px" class="center">
                            <v-item-group mandatory>
                              <v-card elevation="3" color="#CFCFCF" class="">
                                <div class="ml-4 mt-4 text-h5">Cause :</div>
                                <v-col
                                  v-for="(item, index) in cause"
                                  :key="index"
                                >
                                  <v-item v-slot="{ isSelected, toggle }">
                                    <v-card
                                      :color="isSelected ? 'primary' : ''"
                                      class="d-flex justify-center text-h6 pb-1 pt-1"
                                      dark
                                      @click="dialog2 = false"
                                    >
                                      {{ item.name }}
                                    </v-card>
                                  </v-item>
                                </v-col>
                              </v-card>
                            </v-item-group>
                          </v-card>
                        </v-dialog>
                      </v-card>
                    </v-carousel>
                  </v-window-item>

                  <!-- Rework -->
                  <v-window-item value="three">
                    <v-card
                      color="#CFCFCF"
                      height="471px"
                      class="py-3 overflow-y-auto"
                    >
                      Three
                    </v-card>
                  </v-window-item>
                </v-window>
              </v-card>

              <!-- Enter -->
              <div cols="6" class="d-flex justify-end mt-4">
                <!-- <v-btn class="mr-4"> PRINT </v-btn> -->
                <v-btn :disabled="check" @click="dialogcheck = true">
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
                      <tr>
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
                      <tr>
                        <td>Station Inspection :</td>
                        <td colspan="2">{{ this.selectedStaInspecCheck }}</td>
                      </tr>
                      <tr>
                        <td>Defect Type :</td>
                        <td colspan="2">{{ this.selectedScrap }}</td>
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
import SetScrap from "../components/SetScrap.vue";
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
        this.selectedScrap !== ""
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
    selectedGroup: "",
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
      try {
        const b = await axiosInstance.post("/product", {
          modelId: this.selectedValueModel,
          serialNumber: this.serialNumberSent,
          timestamp: moment(
            this.dataPin.date + this.dataPin.time,
            "DDMMYYHH:mm"
          ).toDate(),
          defect: {
            stationId: this.selectedStaInspec,
            failureDetailId: parseInt(this.selectedScrap.split(" ")[0]),
            position: "1",
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
    },
    updateValue(event) {
      this[event.key] = event.value;

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
      }
      switch (this.selectedStaInspec) {
        case "OP05":
          this.selectedStaInspecCheck = "OP05 Inspection 1";
          break;
        case "OP08":
          this.selectedStaInspecCheck = "OP08 Inspection 2";
          break;
        case "OP10":
          this.selectedStaInspecCheck = "OP10 Q-Gate Inspection 3";
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
