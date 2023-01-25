<template>
  <v-item-group mandatory :model-value="selectedStaInspec">
    <v-card elevation="3" color="#CFCFCF" class="">
      <div class="ml-4 mt-4 text-h6">Station Inspection:</div>
      <v-col
        class="pb-4 pt-1"
        v-for="(item, index) in stationInspection"
        :key="index"
      >
        <v-item v-slot="{ isSelected, toggle }" :value="item.name">
          <v-card
            :color="isSelected ? 'primary' : ''"
            class="d-flex justify-center text-h6 pa-6 pb-1 pt-0"
            dark
            @click="
              toggle();
              update(item.name); // ADD THIS SHIT
            "
          >
            {{ item.name }}
          </v-card>
        </v-item>
      </v-col>
    </v-card>
  </v-item-group>
</template>

<script>
import { stationInspection } from "../assets/constant_F";

export default {
  name: "selectedStaInspec",
  props: ["selectedStaInspec"],
  methods: {
    // ADD THIS SHIT
    update(e) {
      this.$emit("updateValue", {
        key: "selectedStaInspec", // VALUE NAME ที่ จะอัพเดท ใน parent()
        value: e, // ค่าที่จะ UPDATE
      });
    },
  },
  data: () => ({
    stationInspection: stationInspection,
  }),
};
</script>
