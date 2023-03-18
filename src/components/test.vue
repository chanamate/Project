<template>
  <v-btn @click="printFunction()">Print</v-btn>
  <div id="DIV_ID">
    <table>
      <tr>
        <th colspan="4">DAILY REPORT</th>
        <th width="10px">DATE : {{ this.startAt }}</th>
      </tr>
      <tr>
        <th colspan="3">LINE : FABRICATION OF F FRAME</th>
        <th>SHIFT:{{ shift }}</th>
        <th>GROUP : {{ this.group }}</th>
      </tr>
      <tr>
        <td></td>
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

      <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

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
      <tr v-for="(item, index) in this.repairDefects" :key="index">
        <td class="text-center">Repair</td>
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
      <tr v-for="(item, index) in this.reworkDefects" :key="index">
        <td class="text-center">Rework</td>
        <td>{{ item.details }}</td>
        <td>{{ item.station }}</td>
        <td class="text-center">{{ item.sum }}</td>
      </tr>
      <tr v-if="this.countReworkDefects !== 1">
        <td colspan="2"></td>
        <td>TOTAL :</td>
        <th>{{ this.sumReworkDefects }}</th>
      </tr>
    </table>

    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

    <table class="my-2">
      <tr>
        <td rowspan="2">TARGET</td>
        <td class="text-center">{{ this.target }}</td>
        <td rowspan="2">ACTUAL</td>
        <td class="text-center">{{ this.actual }}</td>
      </tr>
    </table>

    <!-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ -->

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
  </div>
</template>

<script>
import moment from "moment";
import axiosInstance from "../utils/axios.instance";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "jspdf-invoice-template";

export default {
  name: "test",
  async mounted() {
    const b = await axiosInstance.post("/dashboard/date", {
      lineId: 1,
      targetDate: "2023-03-16T12:18:57.800Z",
      shift: "DAY",
    });
    this.startAt = moment(b.startAt).format("DD/MM/YY");
    this.shift = b.workingTime.time;
    this.group = b.group;
    console.log("🚀 ~ file: test.vue:234 ~ mounted ~ b:", b);
    this.downtimeDefect = b.downtimeDefect;
    this.scrapDefects = b.failureDefect.filter(
      (defect) => defect.type === "SCRAP"
    );
    this.repairDefects = b.failureDefect.filter(
      (defect) => defect.type === "REPAIR"
    );
    this.reworkDefects = b.failureDefect.filter(
      (defect) => defect.type === "REWORK"
    );
    this.actual = b.actual;
    this.target = b.target;
    this.oee = b.oee + "%";
    this.availability = b.availability + "%";
    this.performance = b.performance + "%";
    this.quality = b.quality + "%";

    for (let i = 0; i < b.failureTotal; i++) {
      if (this.scrapDefects[i] && this.scrapDefects[i].sum) {
        this.sumScrapDefects = this.sumScrapDefects + this.scrapDefects[i].sum;
        this.countScrapDefects = this.countScrapDefects + 1;
      }
    }
    for (let i = 0; i < b.downtimeDefect.length; i++) {
      this.sumdowntimeDefect =
        this.sumdowntimeDefect + this.downtimeDefect[i].downtime;
      this.countDowntimeDefect = this.countDowntimeDefect + 1;
    }
    // if ((defect[i].type = "SCRAP")) {
    //   Scrap[i] = defect[i];
    //   console.log(Scrap[i]);
    // }
    // // console.log(Scrap);
  },
  methods: {
    printFunction() {
      // const doc = new jsPDF({
      //   orientation: "portrait",
      //   unit: "mm",
      //   format: "a4",
      // });
      // doc.autoPrint();
      // doc.output("dataurlnewwindow");

      // window.print();

      // var divContents = document.getElementById("DIV_ID").innerHTML;
      // var prnt = window.open("", "", "height=790px, width=1000px");
      // prnt.document.write(divContents);
      // prnt.document.close();
      // prnt.print();

      var prtContent = document.getElementById("DIV_ID");
      var WinPrint = window.open(
        "",
        "",
        "left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0"
      );
      WinPrint.document.write(prtContent.innerHTML);
      WinPrint.document.write(style);
      WinPrint.document.close();
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    },
  },
  data: () => ({
    startAt: "",
    shift: "",
    group: "",
    downtimeDefect: [],
    scrapDefects: [],
    repairDefects: [],
    reworkDefects: [],
    sumdowntimeDefect: null,
    sumScrapDefects: null,
    sumRepairDefects: null,
    sumReworkDefects: null,
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
  }),
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
