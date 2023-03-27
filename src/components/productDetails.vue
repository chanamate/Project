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
    <li style="float: right">
      <router-link to="/login">log out</router-link>
    </li>
  </ul>

  <v-card-title align="center" class="text-h3 my-4">
    Product Details
  </v-card-title>
  <v-row>
    <v-col cols="3" class="ml-2">
      <v-autocomplete
        bg-color="white"
        variant="solo"
        label="Select a production line"
        :items="this.line"
        v-model="selectedLine"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="1" class="d-flex justify-end mt-4"> Select date : </v-col>
    <v-col cols="2" class="mt-2">
      <Datepicker
        v-model="date"
        auto-apply
        range
        :enableTimePicker="false"
        :format="formatRange"
      />
    </v-col>
    <v-col cols="2" class="mt-2">
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
    line: [],
    selectedLine: "",
    date: new Date(),
    formatRange: (range) => {
      const start = range[0] ? range[0].toLocaleDateString("en-US") : "-";
      const end = range[1] ? range[1].toLocaleDateString("en-US") : "-";

      const [monthstart, daystart, yearstart] = start.split("/");
      const [monthend, dayend, yearend] = end.split("/");
      return `${daystart}/${monthstart}/${yearstart} - ${dayend}/${monthend}/${yearend}`;
    },
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
  async created() {
    const lineA = await axiosInstance.get(`/line`);
    this.line = lineA.map((n) => `${n.lineId} ${n.lineName}`);
    // console.log("line", this.line);
  },
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
    console.log(
      "🚀 ~ file: productDetails.vue:127 ~ this.products=b.products.map ~ b.products:",
      b.products
    );
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
      console.log(
        "🚀",
        moment(
          moment(this.date[0]).format("MMMM Do YYYY") + "09:00",
          "MMMM Do YYYYHH:mm"
        ).toDate()
      );
      const b = await axiosInstance.post("/product/all/filter", {
        lineId: parseInt(this.selectedLine.split(" ")[0]),
        startAt: moment(
          moment(this.date[0]).format("MMMM Do YYYY") + "09:00",
          "MMMM Do YYYYHH:mm"
        ).toDate(),
        endAt: moment(
          moment(this.date[1]).format("MMMM Do YYYY") + "09:00",
          "MMMM Do YYYYHH:mm"
        ).toDate(),
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
