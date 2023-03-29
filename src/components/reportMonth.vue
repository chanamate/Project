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

  <v-row class="my-2" v-if="this.reload">
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
        :enableTimePicker="false"
        :format="format"
      />
    </v-col>
    <v-col cols="2" class="ml-2">
      <v-autocomplete
        bg-color="white"
        variant="solo"
        label="Select a production line"
        :items="['DAY', 'NIGHT']"
        v-model="shiftInput"
      >
      </v-autocomplete>
    </v-col>
    <v-col cols="2" class="mt-2">
      <v-btn class="ml-6" @click="genTableF()"> Generate Table </v-btn>
    </v-col>
  </v-row>

  <v-row v-if="this.reload">
    <div class="d-flex justify-end ma-6">
      <v-btn @click="reloadWindow()"> Reset </v-btn>
    </div>
    <div class="d-flex justify-end ma-6">
      <v-btn @click="generatePdf"> Generate PDF and Print </v-btn>
    </div>
  </v-row>

  <div v-if="genTable">
    <div ref="html2Pdf" class="mx-2">
      <table>
        <tr>
          <th colspan="5">MONTHLY REPORT</th>
        </tr>
        <tr>
          <th colspan="3">LINE : FABRICATION OF F FRAME</th>
          <th>SHIFT:{{ this.shiftSelect }}</th>
          <th>
            MONTH : <br />
            {{ this.startAt }}
          </th>
        </tr>
        <tr>
          <td class="text-center">Type</td>
          <td class="text-center">ID</td>
          <td colspan="2">FAILURE</td>
          <td class="text-center">TIME (MINS)</td>
        </tr>

        <tr></tr>

        <tr>
          <td
            :rowspan="this.countDowntimeDefect"
            width="80px"
            class="text-center"
          >
            DOWNTIME
          </td>
        </tr>
        <tr v-for="(item, index) in this.dtCause" :key="index">
          <td>
            {{ item.availabilityId }}
          </td>
          <td colspan="2">
            {{ item.details }}
          </td>
          <td class="text-center">
            {{ item.sum }}
          </td>
        </tr>

        <tr>
          <td colspan="2"></td>
          <td>TOTAL :</td>
          <th>{{ this.downtimeTotal }}</th>
        </tr>
      </table>

      <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
      <div class="html2pdf__page-break"></div>
      <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

      <table class="my-2">
        <tr>
          <th colspan="5">MONTHLY REPORT</th>
        </tr>
        <tr>
          <th colspan="3">LINE : FABRICATION OF F FRAME</th>
          <th>SHIFT:{{ this.shiftSelect }}</th>
          <th>
            MONTH : <br />
            {{ this.startAt }}
          </th>
        </tr>
        <tr>
          <td></td>
          <td class="text-center">TYPE</td>
          <td colspan="2">FAILURE DETAILS</td>
          <td>Total Parts</td>
        </tr>

        <tr>
          <td rowspan="100" class="text-center">DEFECT TYPE</td>
        </tr>

        <!-- scrapDefects -->
        <tr>
          <td :rowspan="this.countScrapDefects" class="text-center">Scrap</td>
        </tr>
        <tr v-for="(item, index) in this.scrapCause" :key="index">
          <td colspan="2">{{ item.details }}</td>
          <td class="text-center">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countScrapDefects !== 1">
          <td colspan="2"></td>
          <td>TOTAL :</td>
          <th>{{ this.sumScrapDefects }}</th>
        </tr>

        <!-- repairDefects -->
        <tr>
          <td :rowspan="this.countRepairDefects" class="text-center">Repair</td>
        </tr>
        <tr v-for="(item, index) in this.repairCause" :key="index">
          <td colspan="2">{{ item.details }}</td>
          <td class="text-center">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countRepairDefects !== 1">
          <td colspan="2"></td>
          <td>TOTAL :</td>
          <th>{{ this.sumRepairDefects }}</th>
        </tr>

        <!-- reworkDefects -->
        <tr>
          <td :rowspan="this.countReworkDefects" class="text-center">Rework</td>
        </tr>
        <tr v-for="(item, index) in this.reworkCause" :key="index">
          <td colspan="2">{{ item.details }}</td>
          <td class="text-center">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countReworkDefects !== 1">
          <td colspan="2"></td>
          <td>TOTAL :</td>
          <th>{{ this.sumReworkDefects }}</th>
        </tr>
      </table>

      <table class="my-2">
        <tr>
          <td rowspan="2">TARGET</td>
          <td class="text-center">{{ this.target }}</td>
          <td rowspan="2">ACTUAL</td>
          <td class="text-center">{{ this.actual }}</td>
        </tr>
      </table>

      <table>
        <tr>
          <th rowspan="3">OEE : {{ this.oee }}</th>
          <th>AVAILABILITY : {{ this.availability }}</th>
        </tr>
        <tr>
          <th>PERFORMANCE : {{ this.performance }}</th>
        </tr>
        <tr>
          <th>QUALITY RATE : {{ this.quality }}</th>
        </tr>
      </table>

      <div class="html2pdf__page-break"></div>

      <v-col cols="5">
        <Bar v-if="loaded" :data="chartDataDT" />
      </v-col>
      <v-col cols="5">
        <Bar v-if="loaded" :data="chartDataDF" />
        <Bar v-if="loaded" :data="chartDataDFPaint" />
      </v-col>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axiosInstance from "../utils/axios.instance";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import "jspdf-invoice-template";
import html2pdf from "html2pdf.js";
import Vue3Html2pdf from "vue3-html2pdf";

import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "reportMonth",
  components: {
    Vue3Html2pdf,
    Datepicker,
    Bar,
  },

  async mounted() {
    this.loaded = false;
    try {
      const b = await axiosInstance.post("/dashboard/month", {
        lineId: 1,
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
        shift: "DAY",
      });
      console.log("🚀 ~ file: test.vue:234 ~ mounted ~ b:", b);
      // const b = await axiosInstance.post("/dashboard/date", {
      //   lineId: this.selectedLine,
      //   targetDate: this.date,
      //   shift: this.shift,
      // });
      this.actual = b.actual;
      this.target = b.target;
      this.oee = b.oee + "%";
      this.availability = b.availability + "%";
      this.performance = b.performance + "%";
      this.quality = b.quality + "%";
      this.startAt = moment(b.startAt).format("MMMM");
      this.shiftSelect = b.workingTime.time;

      // DOWNTIME-------------------------------------------------------------------------------
      const dtCause = await axiosInstance.get(`/availability-lose/${1}`);
      // console.log("🚀 ~ dtCause:", dtCause);
      const dtCauseData = Array(dtCause.length).fill(0);
      // console.log("🚀 ~ dtCauseData:", dtCauseData);

      this.downtimeTotal = b.downtimeTotal;
      this.countDowntimeDefect = dtCause.length + 2;
      for (let i = 0; i < b.downtimeDefect.length; i++) {
        // console.log(b.downtimeDefect[i]);
        for (let j = 0; j < dtCause.length; j++) {
          if (dtCause[j].availabilityId == b.downtimeDefect[i].id) {
            dtCauseData[j] = dtCauseData[j] + b.downtimeDefect[i].downtime;
            // console.log(dtCauseData);
          }
        }
      }
      const newA = dtCause.map((elem, index) => ({
        ...elem,
        ...{ sum: dtCauseData[index] },
      }));
      this.dtCause = newA;

      //Scrap-------------------------------------------------------------------------------
      const scrapCause = await axiosInstance.post(`/failure-detail/${1}`, {
        type: "SCRAP",
      });
      // console.log("🚀", scrapCause);
      const scrapData = Array(scrapCause.length).fill(0);
      this.scrapTotal = b.failureDefect.filter(
        (defect) => defect.type === "SCRAP"
      );
      this.countScrapDefects = scrapCause.length + 1;
      for (let i = 0; i < this.scrapTotal.length; i++) {
        this.sumScrapDefects = this.sumScrapDefects + this.scrapTotal[i].sum;
        for (let j = 0; j < scrapCause.length; j++) {
          if (scrapCause[j].details == this.scrapTotal[i].details) {
            scrapData[j] = scrapData[j] + this.scrapTotal[i].sum;
            // console.log(scrapData);
          }
        }
      }
      const newB = scrapCause.map((elem, index) => ({
        ...elem,
        ...{ sum: scrapData[index] },
      }));
      this.scrapCause = newB;

      //Repair-------------------------------------------------------------------------------
      const repairCause = await axiosInstance.post(`/failure-detail/${1}`, {
        type: "REPAIR",
      });
      // console.log("🚀", repairCause);
      const repairData = Array(repairCause.length).fill(0);
      this.repairTotal = b.failureDefect.filter(
        (defect) => defect.type === "REPAIR"
      );
      this.countRepairDefects = repairCause.length + 1;
      for (let i = 0; i < this.repairTotal.length; i++) {
        this.sumRepairDefects = this.sumRepairDefects + this.repairTotal[i].sum;
        for (let j = 0; j < repairCause.length; j++) {
          if (repairCause[j].details == this.repairTotal[i].details) {
            repairData[j] = repairData[j] + this.repairTotal[i].sum;
            // console.log(repairData);
          }
        }
      }
      const newC = repairCause.map((elem, index) => ({
        ...elem,
        ...{ sum: repairData[index] },
      }));
      this.repairCause = newC;

      //Repair-------------------------------------------------------------------------------
      const reworkCause = await axiosInstance.post(`/failure-detail/${1}`, {
        type: "REWORK",
      });
      // console.log("🚀", reworkCause);
      const reworkData = Array(reworkCause.length).fill(0);
      this.reworkTotal = b.failureDefect.filter(
        (defect) => defect.type === "REWORK"
      );
      this.countReworkDefects = reworkCause.length + 1;
      for (let i = 0; i < this.reworkTotal.length; i++) {
        this.sumReworkDefects = this.sumReworkDefects + this.reworkTotal[i].sum;
        for (let j = 0; j < reworkCause.length; j++) {
          if (reworkCause[j].details == this.reworkTotal[i].details) {
            reworkData[j] = reworkData[j] + this.reworkTotal[i].sum;
            // console.log(reworkData);
          }
        }
      }
      const newD = reworkCause.map((elem, index) => ({
        ...elem,
        ...{ sum: reworkData[index] },
      }));
      this.reworkCause = newD;

      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  },

  computed: {
    chartDataDF() {
      return {
        labels: ["Inspection 1", "Inspection 2", "Q-Gate Inspection 3"],
        datasets: [
          {
            label: "SCRAP",
            backgroundColor: "#FF0000",
            data: [this.sumScrapIns1, this.sumScrapIns2, this.sumScrapIns3],
          },
          {
            label: "REPAIR",
            backgroundColor: "#FF7F00",
            data: [this.sumRepairIns1, this.sumRepairIns2, this.sumRepairIns3],
          },
          {
            label: "REWORK",
            backgroundColor: "#FFFF00",
            data: [this.sumReworkIns1, this.sumReworkIns2, this.sumReworkIns3],
          },
        ],
      };
    },
    chartDataDFPaint() {
      return {
        labels: ["Inspection 1", "Inspection 2", "Q-Gate Inspection 3"],
        datasets: [
          {
            label: "PS",
            backgroundColor: "#FF0000",
            data: [1, 2, 3],
          },
          {
            label: "RP",
            backgroundColor: "#FF7F00",
            data: [1, 2, 3],
          },
          {
            label: "RW",
            backgroundColor: "#FFFF00",
            data: [1, 2, 3],
          },
          {
            label: "RT",
            backgroundColor: "#FF69B4",
            data: [1, 2, 3],
          },
        ],
      };
    },
    chartDataDT() {
      return {
        labels: this.station.map((n) => `${n.stationId}`),
        datasets: [
          {
            label: "Downtime (min)",
            backgroundColor: "#00148E",
            data: this.stationData,
          },
        ],
      };
    },
  },

  methods: {
    reloadWindow() {
      window.location.reload();
    },

    generatePdf() {
      html2pdf()
        .from(this.$refs.html2Pdf)
        .set({
          margin: [0.5, 0.5, 0.5, 0.5],
          filename: "yourfile.pdf",
          enableLinks: false,
          image: { type: "jpeg", quality: 0.95 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "cm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] },
        })
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          window.open(pdf.output("bloburl"), "_blank").print();
        });
    },
  },
  data: () => ({
    reload: true,
    line: [],
    selectedLine: "",
    shiftInput: "",
    shiftSelect: "",
    startAt: "",
    date: new Date(),
    format: (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    },
    lineId: null,
    genTable: true,
    // genTable: false,
    shift: "",

    dtCause: null,
    scrapCause: null,
    repairCause: null,
    reworkCause: null,
    dtCauseData: null,
    downtimeTotal: null,
    scrapTotal: null,
    repairTotal: null,
    reworkTotal: null,

    sumScrapDefects: null,
    sumScrapIns1: null,
    sumScrapIns2: null,
    sumScrapIns3: null,

    sumRepairDefects: null,
    sumRepairIns1: null,
    sumRepairIns2: null,
    sumRepairIns3: null,

    sumReworkDefects: null,
    sumReworkIns1: null,
    sumReworkIns2: null,
    sumReworkIns3: null,

    // นับ row ในตาราง
    countDowntimeDefect: 0,
    countScrapDefects: 1,
    countRepairDefects: 1,
    countReworkDefects: 1,

    availability: "",
    performance: "",
    quality: "",
    actual: "",
    target: "",
    oee: "",
    station: [],
    stationData: [],

    loaded: false,
    chartOptions: {
      responsive: true,
    },
  }),
  async created() {
    const lineA = await axiosInstance.get(`/line`);
    this.line = lineA.map((n) => `${n.lineId} ${n.lineName}`);
    // console.log("line", this.lineId);
  },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  border: 2px solid rgb(0, 0, 0);
  letter-spacing: 1px;
  font-family: sans-serif;
  font-size: 0.8rem;
  width: 100%;
}
td,
th {
  border: 1px solid rgb(122, 122, 122);
  padding: 4px 20px;
}
th {
  background-color: rgb(212, 212, 212);
}
td {
  text-align: left;
}
/* tr:nth-child(even) td {
  background-color: rgb(250, 250, 250);
}
tr:nth-child(odd) td {
  background-color: rgb(240, 240, 240);
} */

/* @media print {
  body {
    width: 21cm;
    height: 29.7cm;
    margin: 30mm 45mm 30mm 45mm;
  }
} */
</style>
