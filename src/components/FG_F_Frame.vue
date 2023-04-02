<template>
  <ul>
    <!-- <li><router-link to="/">Home</router-link></li> -->
    <li class="dropdown">
      <router-link to="/home" class="dropbtn">Home</router-link>
      <!-- <div class="dropdown-content">
            <router-link to="/FG_F/F">Fabrication F Frame</router-link>
            <router-link to="/FG_F/S">Fabrication S Frame</router-link>
            <router-link to="/FG_F/P">Paint</router-link>
          </div> -->
    </li>
    <li>
      <router-link to="/productionPlan">Production Plan</router-link>
    </li>
    <li>
      <router-link to="/productDetails">Product Details</router-link>
    </li>
    <li><router-link to="/reportDate">Report Date</router-link></li>
    <li><router-link to="/reportMonth">Report Month</router-link></li>
    <li style="float: right">
      <router-link to="/login">log out</router-link>
    </li>
  </ul>

  <v-card elevation="0">
    <v-row>
      <!-- หัวข้อบนสุด -->
      <v-col cols="12">
        <v-card-title
          align="center"
          class="text-h4 my-4"
          v-if="type == 'F' || type == 'S'"
        >
          Input data for Finished Goods : Fabrication {{ type }} Frame
        </v-card-title>
        <v-card-title align="center" class="text-h4 my-4" v-if="type == 'P'">
          Input data for Finished Goods : Powder Coat Painting
        </v-card-title>
        <v-divider thickness="2" class="mt-2"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <!-- ตัวเลือกทางด้านซ้าย -->
        <v-item-group mandatory model-value="1" v-if="type !== 'P'">
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

        <v-item-group mandatory model-value="1" v-if="type == 'P'">
          <v-card elevation="0" class="ml-4 mt-n6">
            <v-col v-for="(item, index) in title" :key="index">
              <v-item v-slot="{ isSelected, toggle }" :value="item.id">
                <v-card
                  :color="isSelected ? 'primary' : '#D9D9D9'"
                  class="d-flex justify-center pa-6 text-h6"
                  dark
                  @click="toggle"
                  :to="item.url + gettype()"
                  v-if="item.name !== 'Bottle Neck'"
                >
                  {{ item.name }}
                </v-card>
              </v-item>
            </v-col>
          </v-card>
        </v-item-group>
      </v-col>

      <v-col>
        <v-card height="820" color="#AAAAAA" class="pa-4 mr-4 mt-n3">
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
              <!-- v-if="number >= 1" -->

              <!-- Enter -->
              <div cols="6" class="d-flex justify-end mt-4">
                <div class="mt-1 mr-2 text-h5">Finished at :</div>

                <Datepicker
                  class="text-h6 w-50 mr-2"
                  v-model="timestamp"
                  placeholder="Select Date"
                  utc
                  auto-apply
                  :format="format"
                />
                <v-btn
                  v-if="type !== 'P'"
                  @click="dialogcheck = true"
                  :disabled="checkFS"
                >
                  Enter
                </v-btn>
                <v-btn
                  v-if="type == 'P'"
                  @click="dialogcheck = true"
                  :disabled="checkP"
                >
                  Enter
                </v-btn>
              </div>

              <!-- dialog check -->
              <v-dialog v-model="dialogcheck" persistent width="auto">
                <v-card
                  color="white"
                  width="600"
                  min-height="300"
                  class="d-flex justify-center px-4"
                >
                  <div align="center" class="text-h4 my-4">
                    Check for Completeness
                    <v-divider thickness="2" class="mt-2"></v-divider>
                  </div>
                  <div align="center" class="text-h5 my-4">
                    <table>
                      <tr v-if="type !== 'P'">
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
                        <td>Defect At :</td>
                        <td colspan="2">
                          {{ this.timestampShow }}
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
                      v-if="type !== 'P'"
                      color="green-darken-1"
                      variant="text"
                      @click="submitFS()"
                    >
                      Agree
                    </v-btn>
                    <v-btn
                      v-if="type == 'P'"
                      color="green-darken-1"
                      variant="text"
                      @click="submitP()"
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
import moment from "moment";
import axiosInstance from "../utils/axios.instance";
import SetModel from "../components/SetModel.vue";
import SetPinStampNumber from "../components/SetPinStampNumber.vue";
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
// import { title } from "../assets/constant_F";
export default {
  components: { Datepicker, SetModel, SetPinStampNumber },
  name: "FG_F_Frame",
  computed: {
    type() {
      return this.$route.params.type;
    },
    checkFS() {
      if (
        this.selectedValueModel !== "" &&
        this.dataPin.pinNumber !== null &&
        this.dataPin.machine !== null
      ) {
        return false;
      }
      return true;
    },
    checkP() {
      if (this.dataPin.pinNumber !== null && this.dataPin.machine !== null) {
        return false;
      }
      return true;
    },
  },
  data: () => ({
    selectedValueModel: "",
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
    dataPin: { pinNumber: null, machine: null },

    dialogcheck: false,
    snackbar: false,
    error: "",
    modelCheck: "",
    serialNumberSent: "",
    timestamp: new Date(),
    timestampShow: null,
    format: (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
  }),
  methods: {
    async submitFS() {
      console.log("modelId", this.selectedValueModel);
      console.log(
        "serialNumber",
        `${this.dataPin.date}-${this.dataPin.time}-${this.dataPin.pinNumber}`
      );
      console.log(
        "timestamp",
        moment(this.dataPin.date + this.dataPin.time, "DDMMYYHH:mm").toDate()
      );
      const numToStr = this.dataPin.pinNumber.toString();
      if (numToStr == this.dataPin.pinNumber.toString()) {
        this.serialNumberSent = `${this.dataPin.date}-${this.dataPin.time}-${numToStr}`;
      } else {
        this.serialNumberSent = "";
      }
      console.log("serialNumberSent", this.serialNumberSent);
      try {
        const b = await axiosInstance.post("/product", {
          modelId: this.selectedValueModel,
          serialNumber: this.serialNumberSent,
          machineNumber: this.dataPin.machine,
          timestamp: this.timestamp,
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
    async submitP() {
      const numToStr = this.dataPin.pinNumber.toString();
      if (numToStr == this.dataPin.pinNumber.toString()) {
        this.serialNumberSent = `${this.dataPin.date}-${this.dataPin.time}-${numToStr}`;
      } else {
        this.serialNumberSent = "";
      }
      try {
        const b = await axiosInstance.post("/product/paint", {
          serialNumber: this.serialNumberSent,
          paintAt: this.timestamp,
          lineId: 3,
        });
        this.error = "success";
        this.dialogcheck = false;
      } catch (error) {
        console.log("error :", error.response);
        this.error = `${error.response.data.statusCode} ${error.response.data.message}`;
      } finally {
        this.snackbar = true;
      }
    },
    updateValue(event) {
      this[event.key] = event.value;
      // console.log("modelId", this.selectedValueModel);
      this.timestampShow = moment(this.timestamp).format(
        " DD MMMM YYYY, h:mm:ss a"
      );
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
