<template>
  <ul>
    <!-- <li><router-link to="/">Home</router-link></li> -->
    <li class="dropdown">
      <router-link to="/home" class="dropbtn">Home</router-link>
      <!-- <div class="dropdown-content">
            <router-link to="/FG_F/F">Fabrication of F Frame</router-link>
            <router-link to="/FG_F/S">Fabrication of S Frame</router-link>
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
    <li><router-link to="/reportMonth">Report Month</router-link></li>

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
      <Datepicker v-model="month" month-picker auto-apply />
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

  <v-row v-if="!this.reload">
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
          <th colspan="3">LINE : {{ this.selectedLineShow }}</th>
          <th>SHIFT:{{ this.shiftSelect }}</th>
          <th>
            {{ this.monthShow }}
            {{ this.month.year }}
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
          <td v-if="item.sum !== 0" class="text-center">
            {{ item.availabilityId }}
          </td>
          <td colspan="2" v-if="item.sum !== 0">
            {{ item.details }}
          </td>
          <td class="text-center" v-if="item.sum !== 0">
            {{ item.sum }}
          </td>
        </tr>

        <tr>
          <td colspan="2"></td>
          <td class="text-right">TOTAL :</td>
          <th>{{ this.downtimeTotal }}</th>
        </tr>

        <tr v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
          <td></td>
          <td class="text-center">TYPE</td>
          <td colspan="2">FAILURE DETAILS</td>
          <td>Total Parts</td>
        </tr>

        <tr v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
          <td rowspan="1000" class="text-center">DEFECT TYPE</td>
        </tr>
        <!-- RTDefects -->
        <tr v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
          <td :rowspan="this.countRTDefects" class="text-center">RT</td>
        </tr>
        <tr v-for="(item, index) in this.RTCause" :key="index">
          <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
          <th class="text-center" v-if="item.sum !== 0">{{ item.sum }}</th>
        </tr>

        <!-- RPDefects -->
        <tr v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
          <td :rowspan="this.countRPDefects" class="text-center">RP</td>
        </tr>
        <tr v-for="(item, index) in this.RPCause" :key="index">
          <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
          <th class="text-center" v-if="item.sum !== 0">{{ item.sum }}</th>
        </tr>

        <!-- RWDefects -->
        <tr v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
          <td :rowspan="this.countRWDefects" class="text-center">RW</td>
        </tr>
        <tr v-for="(item, index) in this.RWCause" :key="index">
          <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
          <th class="text-center" v-if="item.sum !== 0">{{ item.sum }}</th>
        </tr>

        <!-- PSDefects -->
        <tr v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
          <td :rowspan="this.countPSDefects" class="text-center">PS</td>
        </tr>
        <tr v-for="(item, index) in this.PSCause" :key="index">
          <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
          <th class="text-center" v-if="item.sum !== 0">{{ item.sum }}</th>
        </tr>
      </table>

      <v-card
        width="725px"
        color="rgb(212, 212, 212)"
        class="mt-3 ml-2"
        v-if="parseInt(this.selectedLine.split(' ')[0]) !== 3"
      >
        <Bar v-if="loaded" :data="chartDataDT" />
      </v-card>

      <table class="my-2" v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
        <tr>
          <td rowspan="2">TARGET</td>
          <td class="text-center">{{ this.target }}</td>
          <td rowspan="2">ACTUAL</td>
          <td class="text-center">{{ this.actual }}</td>
        </tr>
      </table>

      <table v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
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

      <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->
      <div
        class="html2pdf__page-break"
        v-if="
          parseInt(this.selectedLine.split(' ')[0]) == 1 ||
          parseInt(this.selectedLine.split(' ')[0]) == 2
        "
      ></div>
      <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

      <table
        class="my-2"
        v-if="
          parseInt(this.selectedLine.split(' ')[0]) == 1 ||
          parseInt(this.selectedLine.split(' ')[0]) == 2
        "
      >
        <tr>
          <th colspan="5">MONTHLY REPORT</th>
        </tr>
        <tr>
          <th colspan="3">LINE : {{ this.selectedLineShow }}</th>
          <th>SHIFT:{{ this.shiftSelect }}</th>
          <th>
            {{ this.monthShow }}
            {{ this.month.year }}
          </th>
        </tr>
        <tr>
          <td></td>
          <td class="text-center">TYPE</td>
          <td colspan="2">FAILURE DETAILS</td>
          <td>Total Parts</td>
        </tr>

        <tr>
          <td rowspan="1000" class="text-center">DEFECT TYPE</td>
        </tr>

        <!-- scrapDefects -->
        <tr>
          <td :rowspan="this.countScrapDefects" class="text-center">Scrap</td>
        </tr>
        <tr v-for="(item, index) in this.scrapCause" :key="index">
          <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
          <td class="text-center" v-if="item.sum !== 0">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countScrapDefects !== 1">
          <td colspan="2"></td>
          <td class="text-right">TOTAL :</td>
          <th>{{ this.sumScrapDefects }}</th>
        </tr>

        <!-- repairDefects -->
        <tr>
          <td :rowspan="this.countRepairDefects" class="text-center">Repair</td>
        </tr>
        <tr v-for="(item, index) in this.repairCause" :key="index">
          <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
          <td class="text-center" v-if="item.sum !== 0">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countRepairDefects !== 1">
          <td colspan="2"></td>
          <td class="text-right">TOTAL :</td>
          <th>{{ this.sumRepairDefects }}</th>
        </tr>
        <!-- -------------------------------------------------------------------------- -->

        <!-- reworkDefects -->
        <!-- <tr>
          <td :rowspan="this.countReworkDefects" class="text-center">Rework</td>
        </tr>
        <tr v-for="(item, index) in this.reworkCause" :key="index">
          <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
          <td class="text-center" v-if="item.sum !== 0">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countReworkDefects !== 1">
          <td colspan="2"></td>
          <td class="text-right">TOTAL :</td>
          <th>{{ this.sumReworkDefects }}</th>
        </tr> -->
      </table>

      <table
        class="my-2"
        v-if="parseInt(this.selectedLine.split(' ')[0]) !== 3"
      >
        <tr>
          <td rowspan="2">TARGET</td>
          <td class="text-center">{{ this.target }}</td>
          <td rowspan="2">ACTUAL</td>
          <td class="text-center">{{ this.actual }}</td>
        </tr>
      </table>

      <table
        v-if="
          parseInt(this.selectedLine.split(' ')[0]) == 1 ||
          parseInt(this.selectedLine.split(' ')[0]) == 2
        "
      >
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
      <!-- -------------------------------------------------------------------------- -->

      <div
        class="html2pdf__page-break"
        v-if="parseInt(this.selectedLine.split(' ')[0]) == 3"
      ></div>

      <div v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
        <table class="mt-3">
          <tr>
            <td></td>
            <td colspan="2" class="text-center">details</td>
            <td class="text-center">sum</td>
          </tr>

          <tr>
            <td :rowspan="this.countExtendedRTNotZ" class="text-center">RT</td>
          </tr>
          <tr v-for="(item, index) in this.extendedRTNotZ" :key="index">
            <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
            <td class="text-center" v-if="item.sum !== 0">{{ item.sum }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">TOTAL :</td>
            <th>{{ this.sumRTDefects }}</th>
          </tr>

          <tr>
            <td :rowspan="this.countExtendedRPNotZ" class="text-center">RP</td>
          </tr>
          <tr v-for="(item, index) in this.extendedRPNotZ" :key="index">
            <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
            <td class="text-center" v-if="item.sum !== 0">{{ item.sum }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">TOTAL :</td>
            <th>{{ this.sumRPDefects }}</th>
          </tr>

          <tr>
            <td :rowspan="this.countExtendedRWNotZ" class="text-center">RW</td>
          </tr>
          <tr v-for="(item, index) in this.extendedRWNotZ" :key="index">
            <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
            <td class="text-center" v-if="item.sum !== 0">{{ item.sum }}</td>
          </tr>
          <tr>
            <td colspan="3" class="text-right">TOTAL :</td>
            <th>{{ this.sumRWDefects }}</th>
          </tr>

          <tr>
            <td :rowspan="this.countExtendedPSNotZ" class="text-center">PS</td>
          </tr>
          <tr v-for="(item, index) in this.extendedPSNotZ" :key="index">
            <td colspan="2" v-if="item.sum !== 0">{{ item.details }}</td>
            <td class="text-center" v-if="item.sum !== 0">{{ item.sum }}</td>
          </tr>
          <tr>
            <td colspan="3" v>TOTAL :</td>
            <th>{{ this.sumPSDefects }}</th>
          </tr>
        </table>
      </div>
      <!-- -------------------------------------------------------------------------- -->

      <div class="html2pdf__page-break"></div>

      <div
        class="ml-2"
        v-if="
          parseInt(this.selectedLine.split(' ')[0]) == 1 ||
          parseInt(this.selectedLine.split(' ')[0]) == 2
        "
      >
        <!-- <v-card
          width="725px"
          color="rgb(212, 212, 212)"
          class="mt-3 ml-2"
          v-if="parseInt(this.selectedLine.split(' ')[0]) !== 3"
        >
          <Bar v-if="loaded" :data="chartDataDT" />
        </v-card> -->
        <v-card
          width="700px"
          color="#F2F2F2"
          class="mt-3 ml-2"
          v-if="parseInt(this.selectedLine.split(' ')[0]) !== 3"
        >
          <Bar v-if="loaded" :data="chartDataDFScrap" />
        </v-card>
        <v-card
          width="700px"
          color="#F2F2F2"
          class="mt-3 ml-2"
          v-if="parseInt(this.selectedLine.split(' ')[0]) !== 3"
        >
          <Bar v-if="loaded" :data="chartDataDFRepair_1" />
        </v-card>
        <v-card
          width="700px"
          color="#F2F2F2"
          class="mt-3 ml-2"
          v-if="parseInt(this.selectedLine.split(' ')[0]) == 2"
        >
          <Bar v-if="loaded" :data="chartDataDFRepair_2" />
        </v-card>
      </div>

      <div class="ml-2" v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
        <v-card
          width="725px"
          color="#F2F2F2"
          class="mt-3 ml-2"
          v-if="parseInt(this.selectedLine.split(' ')[0]) == 3"
        >
          <Bar v-if="loaded" :data="chartDataDT_P" />
        </v-card>
        <v-card
          width="725px"
          color="#F2F2F2"
          class="mt-3 ml-2"
          v-if="parseInt(this.selectedLine.split(' ')[0]) == 3"
        >
          <Bar v-if="loaded" :data="chartDataDFPaint" />
        </v-card>
      </div>
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

  // async mounted() {
  //   this.loaded = false;
  //   try {
  //     const b = await axiosInstance.post("/dashboard/month", {
  //       lineId: 1,
  //       month: new Date().getMonth(),
  //       year: new Date().getFullYear(),
  //       shift: "DAY",
  //     });
  //     console.log("🚀 ~ file: test.vue:234 ~ mounted ~ b:", b);
  //     // const b = await axiosInstance.post("/dashboard/date", {
  //     //   lineId: this.selectedLine,
  //     //   targetDate: this.date,
  //     //   shift: this.shift,
  //     // });
  //     this.actual = b.actual;
  //     this.target = b.target;
  //     this.oee = b.oee + "%";
  //     this.availability = b.availability + "%";
  //     this.performance = b.performance + "%";
  //     this.quality = b.quality + "%";
  //     this.startAt = moment(b.startAt).format("MMMM");
  //     this.shiftSelect = b.workingTime.time;

  //     // const s = await axiosInstance.get(
  //     //   `/station/line/${parseInt(this.selectedLine.split(" ")[0])}`
  //     // );
  //     // if (parseInt(this.selectedLine.split(" ")[0]) == 3) {
  //     //   this.station = s.filter(
  //     //     (item) => !item.stationName.includes("Inspection")
  //     //   );
  //     // }
  //     // if (
  //     //   parseInt(this.selectedLine.split(" ")[0]) == 1 ||
  //     //   parseInt(this.selectedLine.split(" ")[0]) == 2
  //     // ) {
  //     //   this.station = s;
  //     // }
  //     // DOWNTIME---------------------------------------------------------------------------------------
  //     const dtCause = await axiosInstance.get(
  //       `/availability-lose/${parseInt(this.selectedLine.split(" ")[0])}`
  //     );
  //     // console.log("🚀 ~ dtCause:", dtCause);
  //     const dtCauseData = Array(dtCause.length).fill(0);
  //     // console.log("🚀 ~ dtCauseData:", dtCauseData);

  //     this.downtimeTotal = b.downtimeTotal;
  //     this.countDowntimeDefect = dtCause.length + 2;
  //     for (let i = 0; i < b.downtimeDefect.length; i++) {
  //       // console.log(b.downtimeDefect[i]);
  //       for (let j = 0; j < dtCause.length; j++) {
  //         if (dtCause[j].availabilityId == b.downtimeDefect[i].id) {
  //           dtCauseData[j] = dtCauseData[j] + b.downtimeDefect[i].downtime;
  //           // console.log(dtCauseData);
  //         }
  //       }
  //     }
  //     const newA = dtCause.map((elem, index) => ({
  //       ...elem,
  //       ...{ sum: dtCauseData[index] },
  //     }));
  //     this.dtCause = newA;
  //     console.log("🚀 ~  this.dtCause:", this.dtCause);

  //     //Scrap---------------------------------------------------------------------------------------
  //     const scrapCause = await axiosInstance.post(
  //       `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
  //       {
  //         type: "SCRAP",
  //       }
  //     );
  //     // console.log("🚀", scrapCause);
  //     const scrapData = Array(scrapCause.length).fill(0);
  //     this.scrapTotal = b.failureDefect.filter(
  //       (defect) => defect.type === "SCRAP"
  //     );
  //     this.countScrapDefects = scrapCause.length + 1;
  //     for (let i = 0; i < this.scrapTotal.length; i++) {
  //       this.sumScrapDefects = this.sumScrapDefects + this.scrapTotal[i].sum;
  //       for (let j = 0; j < scrapCause.length; j++) {
  //         if (scrapCause[j].details == this.scrapTotal[i].details) {
  //           scrapData[j] = scrapData[j] + this.scrapTotal[i].sum;
  //           // console.log(scrapData);
  //         }
  //       }
  //     }
  //     const newB = scrapCause.map((elem, index) => ({
  //       ...elem,
  //       ...{ sum: scrapData[index] },
  //     }));
  //     this.scrapCause = newB;
  //     this.scrapCauseNotZ = this.scrapCause.filter((n) => n.sum !== 0);

  //     //Repair---------------------------------------------------------------------------------------
  //     const repairCause = await axiosInstance.post(
  //       `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
  //       {
  //         type: "REPAIR",
  //       }
  //     );
  //     // console.log("🚀", repairCause);
  //     const repairData = Array(repairCause.length).fill(0);
  //     this.repairTotal = b.failureDefect.filter(
  //       (defect) => defect.type === "REPAIR"
  //     );
  //     this.countRepairDefects = repairCause.length + 1;
  //     for (let i = 0; i < this.repairTotal.length; i++) {
  //       this.sumRepairDefects = this.sumRepairDefects + this.repairTotal[i].sum;
  //       for (let j = 0; j < repairCause.length; j++) {
  //         if (repairCause[j].details == this.repairTotal[i].details) {
  //           repairData[j] = repairData[j] + this.repairTotal[i].sum;
  //           // console.log(repairData);
  //         }
  //       }
  //     }
  //     const newC = repairCause.map((elem, index) => ({
  //       ...elem,
  //       ...{ sum: repairData[index] },
  //     }));
  //     this.repairCause = newC;
  //     this.repairCauseNotZ = this.repairCause.filter((n) => n.sum !== 0);

  //     //Rework---------------------------------------------------------------------------------------
  //     const reworkCause = await axiosInstance.post(
  //       `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
  //       {
  //         type: "REWORK",
  //       }
  //     );
  //     // console.log("🚀", reworkCause);
  //     const reworkData = Array(reworkCause.length).fill(0);
  //     this.reworkTotal = b.failureDefect.filter(
  //       (defect) => defect.type === "REWORK"
  //     );
  //     this.countReworkDefects = reworkCause.length + 1;
  //     for (let i = 0; i < this.reworkTotal.length; i++) {
  //       this.sumReworkDefects = this.sumReworkDefects + this.reworkTotal[i].sum;
  //       for (let j = 0; j < reworkCause.length; j++) {
  //         if (reworkCause[j].details == this.reworkTotal[i].details) {
  //           reworkData[j] = reworkData[j] + this.reworkTotal[i].sum;
  //           // console.log(reworkData);
  //         }
  //       }
  //     }
  //     const newD = reworkCause.map((elem, index) => ({
  //       ...elem,
  //       ...{ sum: reworkData[index] },
  //     }));
  //     this.reworkCause = newD;
  //     this.reworkCauseNotZ = this.reworkCause.filter((n) => n.sum !== 0);

  //     // ------------------------------------------------------------------------------------------

  //     this.loaded = true;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },

  computed: {
    chartDataDT() {
      return {
        labels: this.dtCause.map((n) => `${n.details}`),
        datasets: [
          {
            label: "Downtime (min)",
            backgroundColor: "#00148E",
            data: this.dtCause.map((n) => `${n.sum}`),
          },
        ],
      };
    },
    chartDataDT_P() {
      return {
        labels: this.dtCause.map((n) => `${n.availabilityId}`),
        datasets: [
          {
            label: "Downtime (min)",
            backgroundColor: "#00148E",
            data: this.dtCause.map((n) => `${n.sum}`),
          },
        ],
      };
    },
    chartDataDFScrap() {
      return {
        labels: this.scrapCauseNotZ.map((n) => `${n.details}`),
        datasets: [
          {
            label: "SCRAP",
            backgroundColor: "#FF0000",
            data: this.scrapCauseNotZ.map((n) => `${n.sum}`),
          },
        ],
      };
    },
    chartDataDFRepair_1() {
      return {
        labels: this.repairCauseNotZ
          .slice(0, 10)
          .map((n) => `${n.details.split(":")[0]}`),
        datasets: [
          {
            label: "REPAIR",
            backgroundColor: "#FF7F00",
            data: this.repairCauseNotZ.slice(0, 10).map((n) => `${n.sum}`),
          },
        ],
      };
    },
    chartDataDFRepair_2() {
      return {
        labels: this.repairCauseNotZ
          .slice(11, 20)
          .map((n) => `${n.details.split(":")[0]}`),
        datasets: [
          {
            label: "REPAIR",
            backgroundColor: "#FF7F00",
            data: this.repairCauseNotZ.slice(11, 20).map((n) => `${n.sum}`),
          },
        ],
      };
    },
    chartDataDFPaint() {
      return {
        labels: ["ACTION"],
        datasets: [
          {
            label: "RT",
            backgroundColor: "#FF0000",
            data: [this.sumRTDefects],
          },
          {
            label: "RP",
            backgroundColor: "#FF7F00",
            data: [this.sumRPDefects],
          },
          {
            label: "RW",
            backgroundColor: "#FFDF00",
            data: [this.sumRWDefects],
          },
          {
            label: "PS",
            backgroundColor: "#FF69B4",
            data: [this.sumPSDefects],
          },
        ],
      };
    },
  },

  methods: {
    async genTableF() {
      this.reload = false;
      this.loaded = false;
      console.log("🚀 ~  this.month:", this.month);
      try {
        this.selectedLineShow = this.selectedLine.slice(2);
        const b = await axiosInstance.post("/dashboard/month", {
          lineId: parseInt(this.selectedLine.split(" ")[0]),
          month: this.month.month + 1,
          year: this.month.year,
          shift: this.shiftInput,
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

        // const s = await axiosInstance.get(
        //   `/station/line/${parseInt(this.selectedLine.split(" ")[0])}`
        // );
        // if (parseInt(this.selectedLine.split(" ")[0]) == 3) {
        //   this.station = s.filter(
        //     (item) => !item.stationName.includes("Inspection")
        //   );
        // }
        // if (
        //   parseInt(this.selectedLine.split(" ")[0]) == 1 ||
        //   parseInt(this.selectedLine.split(" ")[0]) == 2
        // ) {
        //   this.station = s;
        // }
        // DOWNTIME---------------------------------------------------------------------------------------
        const dtCause = await axiosInstance.get(
          `/availability-lose/${parseInt(this.selectedLine.split(" ")[0])}`
        );
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
        // console.log("🚀 ~  this.dtCause:", this.dtCause);

        //Scrap---------------------------------------------------------------------------------------
        const scrapCause = await axiosInstance.post(
          `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
          {
            type: "SCRAP",
          }
        );
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
        this.scrapCauseNotZ = this.scrapCause.filter((n) => n.sum !== 0);

        //Repair---------------------------------------------------------------------------------------
        const repairCause = await axiosInstance.post(
          `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
          {
            type: "REPAIR",
          }
        );
        // console.log("🚀", repairCause);
        const repairData = Array(repairCause.length).fill(0);
        this.repairTotal = b.failureDefect.filter(
          (defect) => defect.type === "REPAIR"
        );
        this.countRepairDefects = repairCause.length + 1;
        for (let i = 0; i < this.repairTotal.length; i++) {
          this.sumRepairDefects =
            this.sumRepairDefects + this.repairTotal[i].sum;
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
        this.repairCauseNotZ = this.repairCause.filter((n) => n.sum !== 0);

        //Rework---------------------------------------------------------------------------------------
        const reworkCause = await axiosInstance.post(
          `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
          {
            type: "REWORK",
          }
        );
        // console.log("🚀", reworkCause);
        const reworkData = Array(reworkCause.length).fill(0);
        this.reworkTotal = b.failureDefect.filter(
          (defect) => defect.type === "REWORK"
        );
        this.countReworkDefects = reworkCause.length + 1;
        for (let i = 0; i < this.reworkTotal.length; i++) {
          this.sumReworkDefects =
            this.sumReworkDefects + this.reworkTotal[i].sum;
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
        this.reworkCauseNotZ = this.reworkCause.filter((n) => n.sum !== 0);

        //RT---------------------------------------------------------------------------------------
        const RTCause = await axiosInstance.post(
          `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
          {
            type: "RT",
          }
        );
        console.log("🚀", RTCause);
        const RTData = Array(RTCause.length).fill(0);
        this.RTTotal = b.failureDefect.filter((defect) => defect.type === "RT");
        this.countRTDefects = RTCause.length + 1;
        for (let i = 0; i < this.RTTotal.length; i++) {
          this.sumRTDefects = this.sumRTDefects + this.RTTotal[i].sum;
          for (let j = 0; j < RTCause.length; j++) {
            if (RTCause[j].details == this.RTTotal[i].details) {
              RTData[j] = RTData[j] + this.RTTotal[i].sum;
              // console.log(RTData);
            }
          }
        }
        const newRT = RTCause.map((elem, index) => ({
          ...elem,
          ...{ sum: RTData[index] },
        }));
        this.RTCause = newRT;
        this.RTCauseNotZ = this.RTCause.filter((n) => n.sum !== 0);

        //RP---------------------------------------------------------------------------------------
        const RPCause = await axiosInstance.post(
          `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
          {
            type: "RP",
          }
        );
        // console.log("🚀", RPCause);
        const RPData = Array(RPCause.length).fill(0);
        this.RPTotal = b.failureDefect.filter((defect) => defect.type === "RP");
        this.countRPDefects = RPCause.length + 1;
        for (let i = 0; i < this.RPTotal.length; i++) {
          this.sumRPDefects = this.sumRPDefects + this.RPTotal[i].sum;
          for (let j = 0; j < RPCause.length; j++) {
            if (RPCause[j].details == this.RPTotal[i].details) {
              RPData[j] = RPData[j] + this.RPTotal[i].sum;
              // console.log(RPData);
            }
          }
        }
        const newRP = RPCause.map((elem, index) => ({
          ...elem,
          ...{ sum: RPData[index] },
        }));
        this.RPCause = newRP;
        this.RPCauseNotZ = this.RPCause.filter((n) => n.sum !== 0);

        //RW---------------------------------------------------------------------------------------
        const RWCause = await axiosInstance.post(
          `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
          {
            type: "RW",
          }
        );
        // console.log("🚀", RWCause);
        const RWData = Array(RWCause.length).fill(0);
        this.RWTotal = b.failureDefect.filter((defect) => defect.type === "RW");
        this.countRWDefects = RWCause.length + 1;
        for (let i = 0; i < this.RWTotal.length; i++) {
          this.sumRWDefects = this.sumRWDefects + this.RWTotal[i].sum;
          for (let j = 0; j < RWCause.length; j++) {
            if (RWCause[j].details == this.RWTotal[i].details) {
              RWData[j] = RWData[j] + this.RWTotal[i].sum;
              // console.log(RWData);
            }
          }
        }
        const newRW = RWCause.map((elem, index) => ({
          ...elem,
          ...{ sum: RWData[index] },
        }));
        this.RWCause = newRW;
        this.RWCauseNotZ = this.RWCause.filter((n) => n.sum !== 0);

        //PS---------------------------------------------------------------------------------------
        const PSCause = await axiosInstance.post(
          `/failure-detail/${parseInt(this.selectedLine.split(" ")[0])}`,
          {
            type: "PS",
          }
        );
        // console.log("🚀", PSCause);
        const PSData = Array(PSCause.length).fill(0);
        this.PSTotal = b.failureDefect.filter((defect) => defect.type === "PS");
        this.countPSDefects = PSCause.length + 1;
        for (let i = 0; i < this.PSTotal.length; i++) {
          this.sumPSDefects = this.sumPSDefects + this.PSTotal[i].sum;
          for (let j = 0; j < PSCause.length; j++) {
            if (PSCause[j].details == this.PSTotal[i].details) {
              PSData[j] = PSData[j] + this.PSTotal[i].sum;
              // console.log(PSData);
            }
          }
        }
        const newPS = PSCause.map((elem, index) => ({
          ...elem,
          ...{ sum: PSData[index] },
        }));
        this.PSCause = newPS;
        this.PSCauseNotZ = this.PSCause.filter((n) => n.sum !== 0);

        // ------------------------------------------------------------------------------------------
        const extended = await axiosInstance.get(
          `/failure-detail/extended/${parseInt(
            this.selectedLine.split(" ")[0]
          )}`
        );
        console.log("🚀 ~ extended:", extended);
        this.extendedRT = Array(extended.length).fill(0);
        this.extendedRP = Array(extended.length).fill(0);
        this.extendedRW = Array(extended.length).fill(0);
        this.extendedPS = Array(extended.length).fill(0);
        for (let i = 0; i < b.failureDefect.length; i++) {
          for (let j = 0; j < extended.length; j++) {
            if ("RT" == b.failureDefect[i].type) {
              if (
                extended[j].extendedFailureId ==
                b.failureDefect[i].extendedDetailId
              ) {
                this.extendedRT[j] =
                  this.extendedRT[j] + b.failureDefect[i].sum;
              }
            }
            if ("RP" == b.failureDefect[i].type) {
              if (
                extended[j].extendedFailureId ==
                b.failureDefect[i].extendedDetailId
              ) {
                this.extendedRP[j] =
                  this.extendedRP[j] + b.failureDefect[i].sum;
              }
            }
            if ("RW" == b.failureDefect[i].type) {
              if (
                extended[j].extendedFailureId ==
                b.failureDefect[i].extendedDetailId
              ) {
                this.extendedRW[j] =
                  this.extendedRW[j] + b.failureDefect[i].sum;
              }
            }
            if ("PS" == b.failureDefect[i].type) {
              if (
                extended[j].extendedFailureId ==
                b.failureDefect[i].extendedDetailId
              ) {
                this.extendedPS[j] =
                  this.extendedPS[j] + b.failureDefect[i].sum;
              }
            }
          }
        }
        const newRT_1 = extended.map((elem, index) => ({
          ...elem,
          ...{ sum: this.extendedRT[index] },
        }));
        this.extendedRT = newRT_1;
        this.extendedRTNotZ = this.extendedRT.filter((n) => n.sum !== 0);

        const newRP_1 = extended.map((elem, index) => ({
          ...elem,
          ...{ sum: this.extendedRP[index] },
        }));
        this.extendedRP = newRP_1;
        this.extendedRPNotZ = this.extendedRP.filter((n) => n.sum !== 0);

        const newRW_1 = extended.map((elem, index) => ({
          ...elem,
          ...{ sum: this.extendedRW[index] },
        }));
        this.extendedRW = newRW_1;
        this.extendedRWNotZ = this.extendedRW.filter((n) => n.sum !== 0);

        const newPS_1 = extended.map((elem, index) => ({
          ...elem,
          ...{ sum: this.extendedPS[index] },
        }));
        this.extendedPS = newPS_1;
        this.extendedPSNotZ = this.extendedPS.filter((n) => n.sum !== 0);

        this.countExtendedRTNotZ = this.extendedRTNotZ.length + 1;
        this.countExtendedRPNotZ = this.extendedRPNotZ.length + 1;
        this.countExtendedRWNotZ = this.extendedRWNotZ.length + 1;
        this.countExtendedPSNotZ = this.extendedPSNotZ.length + 1;

        console.log("🚀 ~ this.extendedRT:", this.extendedRTNotZ);
        console.log("🚀 ~ this.extendedRP:", this.extendedRPNotZ);
        console.log("🚀 ~ this.extendedRW:", this.extendedRWNotZ);
        console.log("🚀 ~ this.extendedPS:", this.extendedPSNotZ);

        // ------------------------------------------------------------------------------------------
        switch (this.month.month) {
          case 0:
            this.monthShow = "January";
            break;
          case 1:
            this.monthShow = "February";
            break;
          case 2:
            this.monthShow = "March";
            break;
          case 3:
            this.monthShow = "April";
            break;
          case 4:
            this.monthShow = "May";
            break;
          case 5:
            this.monthShow = "June";
            break;
          case 6:
            this.monthShow = "July";
            break;
          case 7:
            this.monthShow = "August";
            break;
          case 8:
            this.monthShow = "September";
            break;
          case 9:
            this.monthShow = "October";
            break;
          case 10:
            this.monthShow = "November";
            break;
          case 11:
            this.monthShow = "December";
            break;
        }
        this.loaded = true;
      } catch (e) {
        console.error(e);
      }
    },
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
    selectedLineShow: "",
    shiftInput: "",
    shiftSelect: "",
    startAt: "",
    month: new Date(),
    monthShow: "",

    lineId: null,
    genTable: true,
    // genTable: false,
    shift: "",

    dtCause: null,
    scrapCause: null,
    repairCause: null,
    reworkCause: null,
    RTCause: null,
    RPCause: null,
    RWCause: null,
    PSCause: null,

    dtCauseData: null,
    downtimeTotal: null,
    scrapTotal: null,
    repairTotal: null,
    reworkTotal: null,
    RTTotal: null,
    RPTotal: null,
    RWTotal: null,
    PSTotal: null,

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

    sumRTDefects: null,
    sumRTIns1: null,
    sumRTIns2: null,
    sumRTIns3: null,

    sumRPDefects: null,
    sumRPIns1: null,
    sumRPIns2: null,
    sumRPIns3: null,

    sumRWDefects: null,
    sumRWIns1: null,
    sumRWIns2: null,
    sumRWIns3: null,

    sumPSDefects: null,
    sumPSIns1: null,
    sumPSIns2: null,
    sumPSIns3: null,

    // นับ row ในตาราง
    countDowntimeDefect: 0,
    countScrapDefects: 1,
    countRepairDefects: 1,
    countReworkDefects: 1,
    countRTDefects: 1,
    countRPDefects: 1,
    countRWDefects: 1,
    countPSDefects: 1,

    scrapCauseNotZ: [],
    repairCauseNotZ: [],
    reworkCauseNotZ: [],
    RTCauseNotZ: [],
    RPCauseNotZ: [],
    RWCauseNotZ: [],
    PSCauseNotZ: [],

    extendedRT: [],
    extendedRP: [],
    extendedRW: [],
    extendedPS: [],

    countExtendedRTNotZ: 0,
    countExtendedRPNotZ: 0,
    countExtendedRWNotZ: 0,
    countExtendedPSNotZ: 0,

    extendedRTNotZ: [],
    extendedRPNotZ: [],
    extendedRWNotZ: [],
    extendedPSNotZ: [],

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
