<template>
  <v-card elevation="3" color="#CFCFCF" class="pa-4 mt-4" height="195px">
    <div class="text-h6 mb-1">Pin Stamp Number :</div>
    <v-row class="mt-3 ml-0 w-100">
      <Datepicker
        class="text-h6 w-50"
        v-model="date"
        :enableTimePicker="false"
        locale="th"
        utc
      />

      <Datepicker
        class="text-h6 w-50"
        v-model="time"
        placeholder="Select Time"
        timePicker
        utc
      />
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-responsive class="mr-0">
          <v-text-field
            clearable
            label="Pin Stamp Number"
            hide-details="auto"
            bg-color="#FFFFFF"
            class="mt-2"
            v-model="pinNumber"
            :rules="[rules.required, rules.counter, rules.number]"
          ></v-text-field>
        </v-responsive>
      </v-col>

      <v-col cols="6" class="d-flex justify-space-around mt-2">
        <v-item-group mandatory class="" :model-value="machine">
          <v-row>
            <v-col
              cols="4"
              class="pl-0 pr-2"
              v-for="(item, index) in listmachine"
              :key="index"
            >
              <v-item v-slot="{ isSelected, toggle }" :value="item.name">
                <v-card
                  :color="isSelected ? 'primary' : ''"
                  class="d-flex justify-center text-h6 pa-3 w-auto mr-1"
                  dark
                  @click="
                    toggle();
                    machine = item.name;
                  "
                >
                  {{ item.name }}
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-item-group>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { ref, watch } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import moment from "moment";
import "@vuepic/vue-datepicker/dist/main.css";
const date = ref();

import { machine_F } from "../assets/constant_F";
import { machine_S } from "../assets/constant_S";

export default {
  name: "SetPinStampNumber",
  props: ["type"],

  components: { Datepicker },
  emits: ["updateValue"],
  setup(props, { emit }) {
    const date = ref(new Date().toISOString());
    const time = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });
    const pinNumber = ref("");
    const machine = ref("");
    watch(
      [date, time, pinNumber, machine],
      (
        [newdate, newtime, newPin, newMachine],
        [date, time, pinNumber, machine]
      ) => {
        const update = (key, value) => {
          emit("updateValue", {
            key: key, // VALUE NAME ที่ จะอัพเดท ใน parent()
            value: value, // ค่าที่จะ UPDATE
          });
        };

        let pindata = {
          date: moment(newdate).format("DDMMYY"),
          time: moment(newtime).format("HH:mm"),
          pinNumber: newPin,
          machine: newMachine,
        };
        update("dataPin", pindata);
      }
    );
    return {
      date,
      time,
      pinNumber,
      machine,
    };
  },

  created() {
    switch (this.type) {
      case "F":
        this.listmachine = machine_F;
        break;
      case "S":
        this.listmachine = machine_S;
        break;
    }
  },

  data: () => ({
    listmachine: machine_F,
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length <= 3 || "Max 3 characters",
      number: (value) =>
        (!isNaN(parseFloat(value)) && isFinite(value)) || "Number only",
    },
  }),
};
</script>
