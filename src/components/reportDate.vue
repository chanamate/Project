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
          <th colspan="4">DAILY REPORT</th>
          <th width="10px">DATE : {{ this.startAt }}</th>
        </tr>
        <tr>
          <th colspan="3">LINE : FABRICATION OF F FRAME</th>
          <th>SHIFT:{{ shift }}</th>
          <th>GROUP : <br />{{ this.group }}</th>
        </tr>
        <tr>
          <td class="text-center">Type</td>
          <td class="text-center">ID</td>
          <td>FAILURE</td>
          <td>OPERATION</td>
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
        <tr v-for="(item, index) in this.downtimeDefect" :key="index">
          <td>{{ item.id }}</td>
          <td>{{ item.details }}</td>
          <td>{{ item.station }}</td>
          <td class="text-center">{{ item.downtime }}</td>
        </tr>

        <tr>
          <td colspan="2"></td>
          <td>TOTAL :</td>
          <th>{{ this.sumdowntimeDefect }}</th>
        </tr>

        <tr>
          <td></td>
          <td class="text-center">TYPE</td>
          <td>FAILURE DETAILS</td>
          <td>OPERATION</td>
          <td>Total Parts</td>
        </tr>

        <tr>
          <td rowspan="100" class="text-center">DEFECT TYPE</td>
        </tr>

        <!-- scrapDefects -->
        <tr>
          <td :rowspan="this.countScrapDefects" class="text-center">Scrap</td>
        </tr>
        <tr v-for="(item, index) in this.scrapDefects" :key="index">
          <td>{{ item.details }}</td>
          <td>{{ item.station }}</td>
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
        <tr v-for="(item, index) in this.repairDefects" :key="index">
          <td>{{ item.details }}</td>
          <td>{{ item.station }}</td>
          <td class="text-center">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countRepairDefects !== 1">
          <td colspan="2"></td>
          <td>TOTAL :</td>
          <th>{{ this.sumRepairDefects }}</th>
        </tr>

        <!-- reworkDefects -->
        <!-- <tr>
          <td :rowspan="this.countReworkDefects" class="text-center">Rework</td>
        </tr>
        <tr v-for="(item, index) in this.reworkDefects" :key="index">
          <td>{{ item.details }}</td>
          <td>{{ item.station }}</td>
          <td class="text-center">{{ item.sum }}</td>
        </tr>
        <tr v-if="this.countReworkDefects !== 1">
          <td colspan="2"></td>
          <td>TOTAL :</td>
          <th>{{ this.sumReworkDefects }}</th>
        </tr> -->
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
      <v-col cols="4">
        <Bar v-if="loaded" :data="chartDataDTF" />
      </v-col>
      <v-col
        cols="4"
        v-if="
          parseInt(this.selectedLine.split(' ')[0]) == 1 ||
          parseInt(this.selectedLine.split(' ')[0]) == 2
        "
      >
        <Bar v-if="loaded" :data="chartDataDFSRR" />
      </v-col>
      <v-col cols="4" v-if="parseInt(this.selectedLine.split(' ')[0]) == 3">
        <Bar v-if="loaded" :data="chartDataDFP" />
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
  name: "reportDate",
  components: {
    Vue3Html2pdf,
    Datepicker,
    Bar,
  },

  // async mounted() {
  //   this.loaded = false;
  //   try {
  //     let b = await axiosInstance.post("/dashboard/date", {
  //       lineId: 1,
  //       targetDate: "2023-02-01T12:18:57.800Z",
  //       shift: "DAY",
  //     });
  //     // const b = await axiosInstance.post("/dashboard/date", {
  //     //   lineId: this.selectedLine,
  //     //   targetDate: this.date,
  //     //   shift: this.shift,
  //     // });

  //     this.startAt = moment(b.startAt).format("DD/MM/YY");
  //     this.shift = b.workingTime.time;
  //     this.group = b.group;
  //     console.log("🚀 ~ file: test.vue:234 ~ mounted ~ b:", b);
  //     this.downtimeDefect = b.downtimeDefect;

  //     this.actual = b.actual;
  //     this.target = b.target;
  //     this.oee = b.oee + "%";
  //     this.availability = b.availability + "%";
  //     this.performance = b.performance + "%";
  //     this.quality = b.quality + "%";

  //     // SCRAP
  //     this.scrapDefects = b.failureDefect.filter(
  //       (defect) => defect.type === "SCRAP"
  //     );
  //     for (let i = 0; i < b.failureTotal; i++) {
  //       if (this.scrapDefects[i] && this.scrapDefects[i].sum) {
  //         this.sumScrapDefects =
  //           this.sumScrapDefects + this.scrapDefects[i].sum;
  //         this.countScrapDefects = this.countScrapDefects + 1;
  //         if (this.scrapDefects[i].station == "Inspection 1") {
  //           this.sumScrapIns1 = this.sumScrapIns1 + this.scrapDefects[i].sum;
  //           // console.log("this.sumScrapIns1", this.sumScrapIns1);
  //         }
  //         if (this.scrapDefects[i].station == "Inspection 2") {
  //           this.sumScrapIns2 = this.sumScrapIns2 + this.scrapDefects[i].sum;
  //           // console.log("this.sumScrapIns1", this.sumScrapIns2);
  //         }
  //         if (this.scrapDefects[i].station == "Q-Gate Inspection 3") {
  //           this.sumScrapIns3 = this.sumScrapIns3 + this.scrapDefects[i].sum;
  //           // console.log("this.sumScrapIns1", this.sumScrapIns3);
  //         }
  //       }
  //     }

  //     // REPAIR
  //     this.repairDefects = b.failureDefect.filter(
  //       (defect) => defect.type === "REPAIR"
  //     );
  //     for (let i = 0; i < b.failureTotal; i++) {
  //       if (this.repairDefects[i] && this.repairDefects[i].sum) {
  //         this.sumRepairDefects =
  //           this.sumRepairDefects + this.repairDefects[i].sum;
  //         this.countRepairDefects = this.countRepairDefects + 1;
  //         if (this.repairDefects[i].station == "Inspection 1") {
  //           this.sumRepairIns1 = this.sumRepairIns1 + this.repairDefects[i].sum;
  //           // console.log("this.sumRepairIns1", this.sumRepairIns1);
  //         }
  //         if (this.repairDefects[i].station == "Inspection 2") {
  //           this.sumRepairIns2 = this.sumRepairIns2 + this.repairDefects[i].sum;
  //           // console.log("this.sumRepairIns1", this.sumRepairIns2);
  //         }
  //         if (this.repairDefects[i].station == "Q-Gate Inspection 3") {
  //           this.sumRepairIns3 = this.sumRepairIns3 + this.repairDefects[i].sum;
  //           // console.log("this.sumRepairIns1", this.sumRepairIns3);
  //         }
  //       }
  //     }

  //     // REWORK
  //     this.reworkDefects = b.failureDefect.filter(
  //       (defect) => defect.type === "REWORK"
  //     );
  //     for (let i = 0; i < b.failureTotal; i++) {
  //       if (this.reworkDefects[i] && this.reworkDefects[i].sum) {
  //         this.sumReworkDefects =
  //           this.sumReworkDefects + this.reworkDefects[i].sum;
  //         this.countReworkDefects = this.countReworkDefects + 1;
  //         if (this.reworkDefects[i].station == "Inspection 1") {
  //           this.sumReworkIns1 = this.sumReworkIns1 + this.reworkDefects[i].sum;
  //           // console.log("this.sumReworkIns1", this.sumReworkIns1);
  //         }
  //         if (this.reworkDefects[i].station == "Inspection 2") {
  //           this.sumReworkIns2 = this.sumReworkIns2 + this.reworkDefects[i].sum;
  //           // console.log("this.sumReworkIns1", this.sumReworkIns2);
  //         }
  //         if (this.reworkDefects[i].station == "Q-Gate Inspection 3") {
  //           this.sumReworkIns3 = this.sumReworkIns3 + this.reworkDefects[i].sum;
  //           // console.log("this.sumReworkIns1", this.sumReworkIns3);
  //         }
  //       }
  //     }
  //     // this.lineId = parseInt(this.selectedLine.split(" ")[0]);
  //     // const s = await axiosInstance.get(`/station/line/${this.lineId}`);
  //     const s = await axiosInstance.get(`/station/line/1`);
  //     this.station = s;
  //     console.log(this.station);
  //     this.stationData = Array(this.station.length).fill(0);
  //     console.log(this.stationData);

  //     // DOWNTIME
  //     for (let i = 0; i < b.downtimeDefect.length; i++) {
  //       this.sumdowntimeDefect =
  //         this.sumdowntimeDefect + this.downtimeDefect[i].downtime;
  //       this.countDowntimeDefect = this.countDowntimeDefect + 1;
  //       console.log(b.downtimeDefect[i]);
  //       for (let j = 0; j < this.station.length; j++) {
  //         if (this.station[j].stationId == b.downtimeDefect[i].station) {
  //           this.stationData[j] =
  //             this.stationData[j] + b.downtimeDefect[i].downtime;
  //           console.log(this.stationData);
  //         }
  //       }
  //     }

  //     this.loaded = true;
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   // if ((defect[i].type = "SCRAP")) {
  //   //   Scrap[i] = defect[i];
  //   //   console.log(Scrap[i]);
  //   // }
  //   // // console.log(Scrap);
  // },
  // ="isSelected ? 'primary' : ''"

  computed: {
    chartDataDTF() {
      return {
        labels: this.station.map((n) => `${n.stationId}`),
        datasets: [
          {
            label: "Downtime that affects Performance (min)",
            backgroundColor: this.colorChart,
            data: this.stationData,
          },
          {
            label: "Downtime that affects Availability",
            backgroundColor: "RGBA( 153, 50, 204, 1 )",
            data: [],
          },
        ],
      };
    },
    chartDataDFSRR() {
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
          // {
          //   label: "REWORK",
          //   backgroundColor: "#FFFF00",
          //   data: [this.sumReworkIns1, this.sumReworkIns2, this.sumReworkIns3],
          // },
        ],
      };
    },
    chartDataDFP() {
      return {
        labels: this.station.map((n) => `${n.stationId}`),
        datasets: [
          {
            label: "PS",
            backgroundColor: "#FF0000",
            data: [this.sumScrapIns1, this.sumScrapIns2, this.sumScrapIns3],
          },
          {
            label: "RP",
            backgroundColor: "#FF7F00",
            data: [this.sumrepairIns1, this.sumrepairIns2, this.sumrepairIns3],
          },
          {
            label: "RW",
            backgroundColor: "#FFFF00",
            data: [this.sumScrapIns1, this.sumScrapIns2, this.sumScrapIns3],
          },
          {
            label: "RT",
            backgroundColor: "#FF69B4",
            data: [this.sumreworkIns1, this.sumreworkIns2, this.sumreworkIns3],
          },
        ],
      };
    },
  },

  methods: {
    async genTableF() {
      this.reload = false;
      this.loaded = false;
      try {
        let b = await axiosInstance.post("/dashboard/date", {
          lineId: parseInt(this.selectedLine.split(" ")[0]),
          targetDate: moment(
            moment(this.date).format("MMMM Do YYYY") + "09:00",
            "MMMM Do YYYYHH:mm"
          ).toDate(),
          shift: this.shiftInput,
        });

        if (parseInt(this.selectedLine.split(" ")[0]) == 1) {
          this.colorChart = [
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "RGBA( 153, 50, 204, 1 )",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
          ];
        }
        if (parseInt(this.selectedLine.split(" ")[0]) == 2) {
          this.colorChart = [
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "rgba(0, 0, 139, 1)",
            "RGBA( 153, 50, 204, 1 )",
            "rgba(0, 0, 139, 1)",
          ];
        }
        if (parseInt(this.selectedLine.split(" ")[0]) == 3) {
          this.colorChart = "rgba(0, 0, 139, 1)";
        }
        console.log("🚀 ~ file: test.vue:384 ~ genTableF ~ b:", b);

        // const b = await axiosInstance.post("/dashboard/date", {
        //   lineId: this.selectedLine,
        //   targetDate: this.date,
        //   shift: this.shift,
        // });

        this.startAt = moment(b.startAt).format("DD/MM/YY");
        this.shift = b.workingTime.time;
        this.group = b.group;
        console.log("🚀 ~ file: test.vue:234 ~ mounted ~ b:", b);
        this.downtimeDefect = b.downtimeDefect;

        this.actual = b.actual;
        this.target = b.target;
        this.oee = b.oee + "%";
        this.availability = b.availability + "%";
        this.performance = b.performance + "%";
        this.quality = b.quality + "%";

        // SCRAP
        this.scrapDefects = b.failureDefect.filter(
          (defect) => defect.type === "SCRAP"
        );
        for (let i = 0; i < b.failureTotal; i++) {
          if (this.scrapDefects[i] && this.scrapDefects[i].sum) {
            this.sumScrapDefects =
              this.sumScrapDefects + this.scrapDefects[i].sum;
            this.countScrapDefects = this.countScrapDefects + 1;
            if (this.scrapDefects[i].station == "Inspection 1") {
              this.sumScrapIns1 = this.sumScrapIns1 + this.scrapDefects[i].sum;
              // console.log("this.sumScrapIns1", this.sumScrapIns1);
            }
            if (this.scrapDefects[i].station == "Inspection 2") {
              this.sumScrapIns2 = this.sumScrapIns2 + this.scrapDefects[i].sum;
              // console.log("this.sumScrapIns1", this.sumScrapIns2);
            }
            if (this.scrapDefects[i].station == "Q-Gate Inspection 3") {
              this.sumScrapIns3 = this.sumScrapIns3 + this.scrapDefects[i].sum;
              // console.log("this.sumScrapIns1", this.sumScrapIns3);
            }
          }
        }

        // REPAIR
        this.repairDefects = b.failureDefect.filter(
          (defect) => defect.type === "REPAIR"
        );
        for (let i = 0; i < b.failureTotal; i++) {
          if (this.repairDefects[i] && this.repairDefects[i].sum) {
            this.sumRepairDefects =
              this.sumRepairDefects + this.repairDefects[i].sum;
            this.countRepairDefects = this.countRepairDefects + 1;
            if (this.repairDefects[i].station == "Inspection 1") {
              this.sumRepairIns1 =
                this.sumRepairIns1 + this.repairDefects[i].sum;
              // console.log("this.sumRepairIns1", this.sumRepairIns1);
            }
            if (this.repairDefects[i].station == "Inspection 2") {
              this.sumRepairIns2 =
                this.sumRepairIns2 + this.repairDefects[i].sum;
              // console.log("this.sumRepairIns1", this.sumRepairIns2);
            }
            if (this.repairDefects[i].station == "Q-Gate Inspection 3") {
              this.sumRepairIns3 =
                this.sumRepairIns3 + this.repairDefects[i].sum;
              // console.log("this.sumRepairIns1", this.sumRepairIns3);
            }
          }
        }

        // REWORK
        this.reworkDefects = b.failureDefect.filter(
          (defect) => defect.type === "REWORK"
        );
        for (let i = 0; i < b.failureTotal; i++) {
          if (this.reworkDefects[i] && this.reworkDefects[i].sum) {
            this.sumReworkDefects =
              this.sumReworkDefects + this.reworkDefects[i].sum;
            this.countReworkDefects = this.countReworkDefects + 1;
            if (this.reworkDefects[i].station == "Inspection 1") {
              this.sumReworkIns1 =
                this.sumReworkIns1 + this.reworkDefects[i].sum;
              // console.log("this.sumReworkIns1", this.sumReworkIns1);
            }
            if (this.reworkDefects[i].station == "Inspection 2") {
              this.sumReworkIns2 =
                this.sumReworkIns2 + this.reworkDefects[i].sum;
              // console.log("this.sumReworkIns1", this.sumReworkIns2);
            }
            if (this.reworkDefects[i].station == "Q-Gate Inspection 3") {
              this.sumReworkIns3 =
                this.sumReworkIns3 + this.reworkDefects[i].sum;
              // console.log("this.sumReworkIns1", this.sumReworkIns3);
            }
          }
        }
        // this.lineId = parseInt(this.selectedLine.split(" ")[0]);
        // const s = await axiosInstance.get(`/station/line/${this.lineId}`);
        const s = await axiosInstance.get(
          `/station/line/${parseInt(this.selectedLine.split(" ")[0])}`
        );
        if (parseInt(this.selectedLine.split(" ")[0]) == 3) {
          this.station = s.filter(
            (item) => !item.stationName.includes("Inspection")
          );
        }
        if (
          parseInt(this.selectedLine.split(" ")[0]) == 1 ||
          parseInt(this.selectedLine.split(" ")[0]) == 2
        ) {
          this.station = s;
        }
        console.log(this.station);
        this.stationData = Array(this.station.length).fill(0);
        console.log(this.stationData);

        // DOWNTIME
        for (let i = 0; i < b.downtimeDefect.length; i++) {
          this.sumdowntimeDefect =
            this.sumdowntimeDefect + this.downtimeDefect[i].downtime;
          this.countDowntimeDefect = this.countDowntimeDefect + 1;
          console.log(b.downtimeDefect[i]);
          for (let j = 0; j < this.station.length; j++) {
            if (this.station[j].stationId == b.downtimeDefect[i].station) {
              this.stationData[j] =
                this.stationData[j] + b.downtimeDefect[i].downtime;
              console.log(this.stationData);
            }
          }
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
    shiftInput: "",
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
    startAt: "",
    shift: "",
    group: "",
    downtimeDefect: [],
    scrapDefects: [],
    repairDefects: [],
    reworkDefects: [],
    sumdowntimeDefect: null,

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

    countDowntimeDefect: 2,
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
    colorChart: [],

    loaded: false,
    // chartData: null,
    // chartData: {
    //   labels: ["January", "February", "March"],
    //   datasets: [
    //     {
    //       label: "Data One",
    //       backgroundColor: "#f87979",
    //       data: [40, 20, 12],
    //     },
    //   ],
    // },
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
