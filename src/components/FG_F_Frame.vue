<template>
  <v-card elevation="0">
    <v-row>
      <!-- หัวข้อบนสุด -->
      <v-col cols="12">
        <v-card-title align="center" class="text-h4 my-4">
          Input data for Finished Goods : Fabrication {{ type }} Frame
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
                :selectedValueModel="selectedValueModel"
                @updateValue="updateValue"
              />

              <!-- Pin Stamp Number -->
              <SetPinStampNumber
                type="F"
                @updateValue="updateValue"
                v-if="number >= 1"
              />

              <!-- Enter -->
              <div cols="6" class="d-flex justify-end mt-4">
                <v-btn @click="submit" v-if="number >= 2"> Enter </v-btn>
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

import { title } from "../assets/constant_F";

export default {
  components: { SetModel, SetPinStampNumber },

  name: "FG_F_Frame",
  computed: {
    type() {
      return this.$route.params.type;
    },
  },
  methods: {
    async submit() {
      console.log(this.selectedValueModel);
      console.log(this.dataPin);
      console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));

      const b = await axiosInstance.post("/product", {
        modelId: this.selectedValueModel,
        serialNumber: this.dataPin.pinNumber,
        timestamp: moment().toDate(),
      });
    },
    updateValue(event) {
      this[event.key] = event.value;

      if (this.selectedValueModel !== "") {
        this.number = 1;
      }
      if (this.dataPin.pinNumber !== null && this.dataPin.machine !== null) {
        this.number = 2;
      }
    },
  },

  data: () => ({
    selectedValueModel: "",
    title: title,
    dataPin: { pinNumber: null, machine: null },

    // อย่าลืมมาแก้ number เป็น 0 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    number: 2,
  }),
};
</script>
