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
          Input data for Finished Goods : Fabrication {{ type }} Frame
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
        <v-item-group mandatory model-value="1">
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
        <v-card height="840" color="#AAAAAA" class="pa-4 mr-4">
          <v-row>
            <v-col cols="6">
              <!-- Model -->
              <SetModel
                :selectedValueModel="selectedValueModel"
                @updateValue="updateValue"
              />

              <!-- Pin Stamp Number -->
              <SetPinStampNumber @updateValue="updateValue" />
              <!-- v-if="number >= 1" -->

              <!-- Enter -->
              <div cols="6" class="d-flex justify-end mt-4">
                <v-btn @click="dialogcheck = true" :disabled="check">
                  Enter
                </v-btn>
              </div>

              <!-- dialog check -->
              <v-dialog v-model="dialogcheck" persistent width="auto">
                <v-card
                  color="white"
                  width="600"
                  height="270"
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
import moment from "moment";
import axiosInstance from "../utils/axios.instance";

import SetModel from "../components/SetModel.vue";
import SetPinStampNumber from "../components/SetPinStampNumber.vue";

// import { title } from "../assets/constant_F";

export default {
  components: { SetModel, SetPinStampNumber },
  name: "FG_F_Frame",

  computed: {
    type() {
      return this.$route.params.type;
    },
    check() {
      if (
        this.selectedValueModel !== "" &&
        this.dataPin.pinNumber !== null &&
        this.dataPin.machine !== null
      ) {
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
    ],
    dataPin: { pinNumber: null, machine: null },
    dialogcheck: false,
    snackbar: false,
    error: "",
    modelCheck: "",
  }),

  methods: {
    async submit() {
      console.log("modelId", this.selectedValueModel);
      console.log(
        "serialNumber",
        `${this.dataPin.date}-${this.dataPin.time}-${this.dataPin.pinNumber}`
      );
      console.log(
        "timestamp",
        moment(this.dataPin.date + this.dataPin.time, "DDMMYYHH:mm").toDate()
      );

      try {
        const b = await axiosInstance.post("/product", {
          modelId: this.selectedValueModel,
          serialNumber: `${this.dataPin.date}-${this.dataPin.time}-${this.dataPin.pinNumber}`,
          timestamp: moment(
            this.dataPin.date + this.dataPin.time,
            "DDMMYYHH:mm"
          ).toDate(),
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
      // console.log("modelId", this.selectedValueModel);

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
