<template>
  <v-card elevation="0">
    <v-row>
      <!-- หัวข้อบนสุด -->
      <v-col cols="12">
        <v-card-title align="center" class="text-h4 my-4">
          Input data for Defect Type : Fabrication F Frame
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
                  :to="item.url"
                >
                  {{ item.name }}
                </v-card>
              </v-item>
            </v-col>
          </v-card>
        </v-item-group>
      </v-col>

      <v-col>
        <v-card height="870" color="#AAAAAA" class="pa-4 mr-4">
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
                  <v-tab value="one">Scrap</v-tab>
                  <v-tab value="two">Repair</v-tab>
                  <v-tab value="three">Rework</v-tab>
                </v-tabs>

                <v-window v-model="tab">
                  <!-- Scrap -->
                  <v-window-item value="one">
                    <v-card
                      color="#CFCFCF"
                      height="460px"
                      class="py-3 overflow-y-auto"
                    >
                      <v-col cols="12" class="pa-0">
                        <v-item-group mandatory>
                          <v-col
                            class="pb-1 pt-1"
                            v-for="(item, index) in scrap_f"
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
                  </v-window-item>

                  <!-- Repair -->
                  <v-window-item value="two">
                    <v-carousel height="460px">
                      <v-card height="460px">
                        <v-card elevation="3" opacity="100">
                          -----ข้อมูลที่เลือก-----
                        </v-card>

                        <!-- pic_1 -->
                        <v-carousel-item
                          src="src/assets/pic_1.png"
                          @click="dialog = true"
                        >
                          <!-- pic_1 dialog -->
                          <v-dialog v-model="dialog">
                            <v-card class="center">
                              <div width="550" height="360">
                                <v-img
                                  src="src/assets/pic_1.png"
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
                          src="src/assets/pic_2.png"
                          max-height="500"
                        >
                        </v-carousel-item>

                        <!-- pic_3 -->
                        <v-carousel-item
                          src="src/assets/pic_3.png"
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
                      height="460px"
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
                <v-btn @click="dialogEnter = true"> Enter </v-btn>
              </div>

              <v-dialog v-model="dialogEnter">
                <v-card height="550px" width="775px" class="px-3 center">
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
                  sdsds
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      variant="text"
                      @click="dialogEnter = false"
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
              </v-dialog>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
//import logo from "../assets/logo.svg";
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import axios from "../api/axios.js";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";

import SetModel from "../components/SetModel.vue";
import SetPinStampNumber from "../components/SetPinStampNumber.vue";
import SetEmployeeName from "../components/SetEmployeeName.vue";
import SetShitf from "../components/SetShitf.vue";
import SetStationInspec from "../components/SetStationInspec.vue";
import { title, btn_img1, cause, scrap_f } from "../assets/constant_F";

const date = ref();

export default {
  components: {
    Datepicker,
    SetModel,
    SetPinStampNumber,
    SetEmployeeName,
    SetShitf,
    SetStationInspec,
  },

  // mounted() {
  //   axios.get("/products").then((res) => {
  //     console.log(res.data.products);
  //     let name = res.data.products.map((item) => item.title);
  //     this.name = name;
  //   });
  // },
  methods: {
    getdatenow() {
      return moment().format("MMMM Do YYYY");
    },
    submit() {
      console.log(this.selectedValueModel);
      console.log(this.dataPin);
      console.log(this.selectName);
      console.log(this.selectedDayNight);
      console.log(this.selectedOT);
      console.log(this.selectedStaInspec);
      console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));
    },
    updateValue(event) {
      this[event.key] = event.value;
    },
  },

  name: "NG_F_Frame",
  data: () => ({
    title: title,

    scrap_f: scrap_f,
    cause: cause,
    btn_img1: btn_img1,

    tab: null,
    dialog: false,
    dialog2: false,
    dialogEnter: false,
    selectName: null,
    //date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,

    selectedValueModel: "",
    selectName: "",
    selectedDayNight: "",
    selectedOT: "",
    selectedStaInspec: "",
    dataPin: { pinNumber: null, machine: null },
  }),
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
