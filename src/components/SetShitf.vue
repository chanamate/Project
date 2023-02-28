<template>
  <v-card
    elevation="8"
    color="#CFCFCF"
    class="pt-3 overflow-y-auto mt-2"
    height="160px"
  >
    <v-item-group mandatory class="mx-3" :model-value="selectedDayNight">
      <div class="text-h6 mb-3">Shift :</div>
      <v-row>
        <v-col class="pb-4 pt-1" v-for="(item, index) in DayNight">
          <v-item v-slot="{ isSelected, toggle }" :value="item.name">
            <v-card
              :color="isSelected ? 'primary' : ''"
              class="d-flex justify-center pa-6 text-h6 pb-2 pt-1"
              dark
              @click="
                toggle();
                update1(item.send); // ADD THIS SHIT
              "
            >
              {{ item.name }}
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>

    <v-item-group mandatory class="mx-3" :model-value="selectedOT">
      <v-row>
        <v-col class="pb-4 pt-1" v-for="(item, index) in OT">
          <v-item v-slot="{ isSelected, toggle }" :value="item.name">
            <v-card
              :color="isSelected ? 'primary' : ''"
              class="d-flex justify-center pa-6 text-h6 pb-2 pt-1"
              dark
              @click="
                toggle();
                update2(item.send); // ADD THIS SHIT
              "
            >
              {{ item.name }}
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-card>
</template>

<script>
import { OT, DayNight } from "../assets/constant_F";

export default {
  name: "SetShitf",
  props: ["selectedDayNight", "selectedOT"],

  methods: {
    // ADD THIS SHIT
    update1(e) {
      this.$emit("updateValue", {
        key: "selectedDayNight", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
    update2(e) {
      this.$emit("updateValue", {
        key: "selectedOT", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
  },
  data: () => ({
    OT: OT,
    DayNight: DayNight,
  }),
};
</script>
