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
        <v-card height="850" color="#AAAAAA" class="pa-4 mr-4">
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
                <v-btn @click="submit" :disabled="check"> Enter </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
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
  }),

  methods: {
    async submit() {
      console.log("modelId", this.selectedValueModel);
      console.log("serialNumber", this.dataPin.pinNumber);
      console.log(
        "timestamp",
        moment(this.dataPin.date + this.dataPin.time, "DDMMYYHH:mm:00").toDate()
      );

      const b = await axiosInstance.post("/product", {
        modelId: this.selectedValueModel,
        serialNumber: this.dataPin.pinNumber,
        timestamp: moment(
          this.dataPin.date + this.dataPin.time,
          "DDMMYYHH:mm:00"
        ).toDate(),
      });
    },

    updateValue(event) {
      this[event.key] = event.value;
    },

    gettype() {
      return this.type;
    },
  },
};
</script>
