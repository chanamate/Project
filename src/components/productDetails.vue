<template>
  <v-card-title align="center" class="text-h3 my-4">
    Product Details
  </v-card-title>
  <v-row>
    <v-col cols="1" class="d-flex align-center ml-6"> Select date </v-col>
    <v-col cols="2">
      <Datepicker v-model="date" auto-apply range :enableTimePicker="false" />
    </v-col>
    <v-col class="d-flex align-end">
      <v-btn @click="find()">search</v-btn>
    </v-col>
  </v-row>
  <v-card-title>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
  </v-card-title>
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="products"
    item-value="name"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:item.status="{ item }">
      <v-chip :color="getColor(item.raw.status)">
        {{ item.raw.status }}
      </v-chip>
    </template>
  </v-data-table>
</template>

<script>
import axiosInstance from "../utils/axios.instance";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";
import moment from "moment";

export default {
  name: "productDetails",
  components: {
    Datepicker,
  },
  data: () => ({
    date: new Date(),
    itemsPerPage: 10,
    headers: [
      {
        title: "Pin stamp Number",
        align: "start",
        key: "pinStampNumber",
        align: "start",
        width: 230,
      },
      {
        title: "model",
        align: "end",
        key: "model",
        align: "start",
        width: 230,
      },
      {
        title: "status",
        align: "end",
        key: "status",
        align: "start",
        width: 230,
      },
      {
        title: "defectType",
        align: "end",
        key: "defectType",
        align: "start",
        width: 230,
      },
      {
        title: "operation",
        align: "end",
        key: "operation",
        align: "start",
      },
      {
        title: "failureDetail",
        align: "end",
        key: "failureDetail",
        align: "start",
        width: 400,
      },
      {
        title: "employee",
        align: "end",
        key: "employee",
        align: "start",
        width: 400,
      },
    ],
    products: [],
    search: "",
  }),
  async mounted() {
    const endDate = new Date();
    const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
    this.date = [startDate, endDate];

    const b = await axiosInstance.post("/product/all/filter", {
      lineId: 1,
      startAt: startDate,
      endAt: endDate,
      pagination: {
        page: 1,
        take: 200,
      },
    });
    this.products = b.products.map((item) => {
      return {
        ...item,
        status: item.status == false ? "Not good" : "Good",
      };
    });
    console.log("🚀 ~ file: pagination.vue:124 ~ mounted ~ b:", b);
  },
  methods: {
    async find() {
      const b = await axiosInstance.post("/product/all/filter", {
        lineId: 1,
        startAt: this.date[0],
        endAt: this.date[1],
        pagination: {
          page: 1,
          take: 200,
        },
      });
      this.products = b.products.map((item) => {
        return {
          ...item,
          status: item.status == false ? "Not good" : "Good",
        };
      });
    },
    getColor(status) {
      if (status == "Not good") return "red";
      else if (status == "Good") return "green";
    },
  },
};
</script>
