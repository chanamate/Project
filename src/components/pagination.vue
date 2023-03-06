<template>
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
      },
      {
        label: "model",
        field: "model",
        type: "number",
      },
      {
        label: "Staus",
        field: "Staus",
      },
      {
        label: "Defect Type",
        field: "defectType",
      },
      {
        label: "Failur Detial",
        field: "defectType",
      },
    ],
    rows: [
      {
        id: 1,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 2,
        PinStampNumber: "Jane",
        model: 24,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 3,
        PinStampNumber: "Susan",
        model: 16,
        Staus: "2011-10-30",
        defectType: 0.03343,
      },
      {
        id: 4,
        PinStampNumber: "Chris",
        model: 55,
        Staus: "2011-10-11",
        defectType: 0.03343,
      },
      {
        id: 5,
        PinStampNumber: "Dan",
        model: 40,
        Staus: "2011-10-21",
        defectType: 0.03343,
      },
      {
        id: 6,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
      {
        id: 7,
        PinStampNumber: "John",
        model: 20,
        Staus: "2011-10-31",
        defectType: 0.03343,
      },
    ],
  }),

  methods: {},
};
</script>
