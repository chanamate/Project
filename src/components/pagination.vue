<template>
  <v-card-title align="center" class="text-h3 my-4">
    Product Details
  </v-card-title>
  <vue-good-table
    :columns="columns"
    :rows="rows"
    :search-options="{ enabled: true }"
    :pagination-options="{
      enabled: true,
    }"
  />
</template>

<script>
import axiosInstance from "../utils/axios.instance";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

import "vue-good-table-next/dist/vue-good-table-next.css";
import { VueGoodTable } from "vue-good-table-next";

export default {
  name: "Pagination",
  components: { Datepicker, VueGoodTable },
  data: () => ({
    columns: [
      {
        label: "Pin Stamp Number",
        field: "PinStampNumber",
        filterOptions: {
          enabled: true, // enable filter for this column
        },
      },
      {
        label: "model",
        field: "model",
        filterOptions: {
          enabled: true, // enable filter for this column
        },
      },
      {
        label: "status",
        field: "status",
        filterOptions: {
          enabled: true, // enable filter for this column
          filterDropdownItems: ["Good", "Not Good"],
        },
      },
      {
        label: "Defect Type",
        field: "defectType",
        filterOptions: {
          enabled: true, // enable filter for this column
        },
      },
      {
        label: "Failure Detail",
        field: "defectType",
        filterOptions: {
          enabled: true, // enable filter for this column
        },
      },
    ],
    rows: [
      {
        id: 1,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 2,
        PinStampNumber: "Jane",
        model: 24,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 3,
        PinStampNumber: "Susan",
        model: 16,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 4,
        PinStampNumber: "Chris",
        model: 55,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 5,
        PinStampNumber: "Dan",
        model: 40,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 6,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 1,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 2,
        PinStampNumber: "Jane",
        model: 24,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 3,
        PinStampNumber: "Susan",
        model: 16,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 4,
        PinStampNumber: "Chris",
        model: 55,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 5,
        PinStampNumber: "Dan",
        model: 40,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 6,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 1,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 2,
        PinStampNumber: "Jane",
        model: 24,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 3,
        PinStampNumber: "Susan",
        model: 16,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 4,
        PinStampNumber: "Chris",
        model: 55,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 5,
        PinStampNumber: "Dan",
        model: 40,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 6,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 1,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 2,
        PinStampNumber: "Jane",
        model: 24,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 3,
        PinStampNumber: "Susan",
        model: 16,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 4,
        PinStampNumber: "Chris",
        model: 55,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 5,
        PinStampNumber: "Dan",
        model: 40,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 6,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 1,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 2,
        PinStampNumber: "Jane",
        model: 24,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 3,
        PinStampNumber: "Susan",
        model: 16,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 4,
        PinStampNumber: "Chris",
        model: 55,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 5,
        PinStampNumber: "Dan",
        model: 40,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 6,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 1,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 2,
        PinStampNumber: "Jane",
        model: 24,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 3,
        PinStampNumber: "Susan",
        model: 16,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 4,
        PinStampNumber: "Chris",
        model: 55,
        status: "Good",
        defectType: 0.03343,
      },
      {
        id: 5,
        PinStampNumber: "Dan",
        model: 40,
        status: "Not Good",
        defectType: 0.03343,
      },
      {
        id: 6,
        PinStampNumber: "John",
        model: 20,
        status: "Good",
        defectType: 0.03343,
      },
    ],
  }),

  methods: {},
};
</script>
