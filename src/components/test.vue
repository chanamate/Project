<template>
  <div class="container">
    <div class="manu">
      <header>
        <h1>OEE : Fabrication of F Frame</h1>
      </header>
      <div class="BACK-item">
        <ul class="BACK">
          <li>
            <router-link to="/homepage">
              <h2>BACK</h2>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="WT-item">
        <table>
          <tr>
            <th>
              <h3>WORKING</h3>
            </th>
            <th>
              <h3>TIME</h3>
            </th>
          </tr>
          <tr>
            <td><b>TIME</b></td>
            <td><b>MIN</b></td>
          </tr>
          <tr>
            <td>
              <b> {{ time }} </b>
            </td>
            <td>
              <b> {{ min }} </b>
            </td>
          </tr>
        </table>
      </div>
      <div class="DATA-item">
        <ul class="data-item">
          <h2>DATE</h2>
          <h3>
            <Datepicker v-model="date" :format="format" />
          </h3>
          <br />
          <li>
            <router-link to="/">
              <h2>WEEK</h2>
            </router-link>
          </li>
          <br />
          <li>
            <router-link to="/">
              <h2>MONTH</h2>
            </router-link>
          </li>
          <br />
        </ul>
      </div>
      <div class="Logout-item">
        <ul class="Logout">
          <li>
            <router-link to="/Login">
              <h2>Logout</h2>
            </router-link>
          </li>
        </ul>
      </div>
      <h1>
        <div class="datetime"></div>
      </h1>
      <div>
        <h3>
          <v-select
            label=" SHIFT "
            :items="['DAY', 'NIGHT']"
            @update:modelValue="update"
          ></v-select>
        </h3>
      </div>
    </div>

    <div class="services-grid1">
      <div class="content-OEE-item">
        <h2>OEE</h2>
        <div class="text-center">
          <v-progress-circular
            :rotate="360"
            :size="320"
            :width="60"
            :model-value="OEE"
            color="#F9370C"
          >
            <strong>{{ Math.ceil(OEE) }}%</strong>
          </v-progress-circular>
        </div>
      </div>

      <ul class="content-APQ-item">
        <br />
        <div>
          <v-hover v-slot="{ isHovering, props }" close-delay="200">
            <v-card class="mx-auto" v-bind="props">
              <li>
                <router-link to="/">
                  <h2>Availability :</h2>
                </router-link>
              </li>
            </v-card>
            <v-progress-linear
              v-model="availability"
              color="#F9370C"
              height="55"
            >
              <strong>{{ Math.ceil(availability) }}%</strong>
            </v-progress-linear>
            <v-expand-transiton>
              <div
                v-if="isHovering"
                class="d-flex transition-fast-in-fast-out bg-black-draken2 v-card--reveal text-h2"
              >
                <h4>Availability</h4>
              </div>
            </v-expand-transiton>
          </v-hover>
        </div>
        <br />
        <v-hover v-slot="{ isHovering, props }" close-delay="200">
          <v-card class="mx-auto" v-bind="props">
            <li>
              <router-link to="/">
                <h2>Performance :</h2>
              </router-link>
            </li>
          </v-card>
          <v-progress-linear v-model="performance" color="#F9370C" height="55">
            <strong>{{ Math.ceil(performance) }}%</strong>
          </v-progress-linear>
          <v-expand-transiton>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out v-card--reveal text-h2"
            >
              <h4>Performance</h4>
            </div>
          </v-expand-transiton>
        </v-hover>
        <br />
        <v-hover v-slot="{ isHovering, props }" close-delay="200">
          <v-card class="mx-auto" v-bind="props">
            <li>
              <router-link to="/">
                <h2>Quality Rate :</h2>
              </router-link>
            </li>
          </v-card>
          <v-progress-linear v-model="quality" color="#63CA32" height="55">
            <strong>{{ Math.ceil(quality) }}%</strong>
          </v-progress-linear>
          <v-expand-transiton>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out v-card--reveal text-h2"
            >
              <h4>Quality Rate</h4>
            </div>
          </v-expand-transiton>
        </v-hover>
      </ul>

      <div class="content-COUNT-item">
        <br />
        <h2>TARGET</h2>
        <a>
          <h3>{{ target }}</h3>
        </a>
        <br />
        <h2>PLAN</h2>
        <a>
          <h3>{{ plan }}</h3>
        </a>
        <br />
        <h2>ACTUAL</h2>
        <a>
          <h3>{{ actual }}</h3>
        </a>
      </div>
      <div class="content-BT-item">
        <h2>BOTTLE NECK</h2>
        <a>
          <h3>{{ bottleNeck }}</h3>
        </a>
      </div>
      <div class="content-group-item">
        <h2>GROUP</h2>
        <a>
          <h3></h3>
        </a>
      </div>

      <div class="services-grid2">
        <div class="content-DG-item">
          <h1>My Chart</h1>
          <Chart :chart-data="chartData" :chart-options="chartOptions" />
        </div>
        <div class="content-SG-item"></div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../assets/logo.svg";
import axiosInstance from "../utils/axios.instance";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref } from "vue";

export default {
  name: "FF",
  components: { Datepicker },
  setup() {
    const date = ref(new Date());
    // In case of a range picker, you'll receive [Date, Date]
    const format = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    return {
      date,
      format,
    };
  },

  data: () => ({
    interval: {},
    availability: 0,
    performance: 0,
    quality: 0,
    OEE: 0,
    target: 0,
    plan: 0,
    actual: 0,
    bottleNeck: "",
    lineId: 1,
    shift: "DAY",
    workingTime: [
      {
        time: " ",
        min: 0,
      },
    ],
    shift: "DAY",
    downtimeDefect: [
      {
        ID: " ",
        Failure: " ",
        Operation: " ",
        Downtime: 0,
      },
      {
        ID: " ",
        Failure: " ",
        Operation: " ",
        Downtime: 0,
      },
      {
        ID: " ",
        Failure: " ",
        Operation: " ",
        Downtime: 0,
      },
      {
        ID: " ",
        Failure: " ",
        Operation: " ",
        Downtime: 0,
      },
    ],
    chartData: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  methods: {
    async update(e) {
      console.log("selectName", e);

      const dashboard = await axiosInstance.post("/dashboard/date", {
        lineId: this.lineId,
        targetDate: new Date(),
        shift: this.shift,
      });
    },
  },

  async mounted() {
    const dashboard = await axiosInstance.post("/dashboard/date", {
      lineId: this.lineId,
      targetDate: new Date(),
      shift: this.shift,
    });
    this.target = dashboard.target;
    this.plan = dashboard.plan;
    this.actual = dashboard.actual;
    this.bottleNeck = dashboard.bottleNeck;
    this.downtimeDefect = dashboard.downtimeDefect;
    this.OEE = dashboard.oee;
    this.availability = dashboard.availability;
    this.performance = dashboard.performance;
    this.quality = dashboard.quality;
    this.time = dashboard.workingTime.time;
    this.min = dashboard.workingTime.min;
    this.bottleNeck = dashboard.bottleNeck;
    console.log("dashboard", dashboard);
    console.log("dashboard", dashboard.actual);
    console.log("dashboard", dashboard.OEE);
    console.log("availability", dashboard.availability);
    console.log("dashboaperformancerd", dashboard.performance);
    console.log("quality", dashboard.quality);
    // console.log("dashboard", dashboardbar.bar);
    // console.log("dashboard", dashboardbar.min);
    // console.log("dashboard", dashboardbar.time);
    console.log("workingTime", dashboard.workingTime);
    console.log("workingTime.min", dashboard.workingTime.min);
    console.log("bottleNeck", dashboard.bottleNeck);
  },
};
</script>

<style scoped>
.container {
  width: 1900px;
  height: 1024px;
  margin: 0 auto;
  background: white;
}

header {
  width: 600px;
  padding: 2px;
  height: 0 auto;
  justify-content: center;
  text-align: center;
  background: #ff971e;
  margin: 0 auto;
  margin-top: 10px;
  transform: translatex(720px);
  font-family: "Sarabun", sans-serif;
  font-size: 20px;
}

/* #MANU */

.manu {
  width: 300px;
  height: 100%;
  background: #d9d9d9;
  display: inline-block;
  margin: 0 auto;
}

ul.BACK {
  font-family: "Sarabun", sans-serif;
  text-align: center;
  margin-left: -3px;
  transform: translatex(-20px);
}

ul.BACK li {
  list-style-type: none;
  font-size: 16px;
}

ul.BACK li a h2 {
  text-decoration: none;
  background: #282724;
  color: white;
  padding: 15px;
  border-radius: 25px;
  display: inline-block;
  transform: translatey(-60px);
  transition: 0.3s ease-in-out;
  margin-left: -60px;
}

ul.BACK li a h2:hover {
  text-decoration: none;
  background: #7d7d7d;
  color: white;
  padding: 15px;
  border-radius: 25px;
  display: inline-block;
  transform: translatey(-60px);
  margin-left: -60px;
}

.WT-item table tr th h3 {
  font-family: "Sarabun", sans-serif;
  font-size: 25px;
  padding: 15px 20px;
  text-align: center;
}

.WT-item table tr td {
  font-family: "Sarabun", sans-serif;
  font-size: 20px;
  text-align: center;
  background: white;
  color: black;
  padding: 10px 28px;
}

.WT-item {
  background-color: #292929;
  color: white;
  width: 270px;
  height: 197px;
  border-radius: 15px;
  justify-items: center;
  margin-top: 123%;
  transform: translatex(589%);
  font-family: "Sarabun", sans-serif;
  font-size: 20;
}

.DATA-item {
  transform: translatey(-205%);
  font-size: 28px;
  font-family: "Sarabun", sans-serif;
}

.DATA-item h2 {
  margin-left: 20%;
}

ul.data-item li a h2 {
  font-family: "Sarabun", sans-serif;
  font-size: 20px;
  color: black;
  margin-left: 20%;
  list-style-type: none;
  text-decoration: none;
  transition: 0.3s ease-in-out;
}

ul.data-item li a h2 :hover {
  text-decoration: none;
  font-family: "Sarabun", sans-serif;
  font-size: 20px;
  list-style-type: none;
  color: blue;
}

ul.data-item h2 {
  margin-left: 20%;
  font-size: 24px;
  color: blue;
}

ul.Logout {
  font-family: "Sarabun", sans-serif;
  text-align: center;
  margin-left: -110px;
  transform: translatey(-190%);
}

ul.Logout li {
  list-style-type: none;
  font-size: 16px;
}

ul.Logout li a h2 {
  text-decoration: none;
  background: #282724;
  color: white;
  padding: 15px;
  border-radius: 25px;
  display: inline-block;
  transform: translatey(40px);
  transition: 0.3s ease-in-out;
  margin-left: 40px;
}

ul.Logout li a h2:hover {
  text-decoration: none;
  background: #7d7d7d;
  color: white;
  padding: 15px;
  border-radius: 25px;
  display: inline-block;
  transform: translatey(40px);
  margin-left: 40px;
}

/* #CONTENT */

.services-grid1 {
  display: grid;
  grid-template-columns: repeat(3, 620px);
  width: 500px;
  height: 400px;
  margin-left: 350px;
  margin-top: -49%;
}

.content-OEE-item h2 {
  background: #d9d9d9;
  width: 570px;
  height: 400px;
  padding: 10px;
  border-radius: 20px;
  display: inline-block;
}

.content-OEE-item h2 {
  font-size: 32px;
  text-align: center;
  font-family: "Sarabun", sans-serif;
}

.v-progress-circular {
  margin-top: -63%;
  transform: translatex(-20px);
  font-size: 40px;
  text-align: center;
  font-family: "Sarabun", sans-serif;
  color: black;
}

.v-progress-linear {
  font-size: 28px;
  font-family: "Sarabun", sans-serif;
}

.v-select {
  font-size: 28px;
  font-family: "Sarabun", sans-serif;
  margin-top: -1045px;
  color: black;
  transform: translatex(1575px);
}

.content-APQ-item {
  background: #f2f2f2;
  width: 570px;
  height: 400px;
  padding: 10px;
  border-radius: 20px;
  font-family: "Sarabun", sans-serif;
  list-style-type: none;
  display: inline-block;
}

ul.content-APQ-item li a {
  color: black;
  transition: 0.3s ease-in-out;
}

ul.content-APQ-item li a :hover {
  color: blue;
}

.content-COUNT-item h2 {
  font-size: 25px;
  font-family: "Sarabun", sans-serif;
  text-align: center;
}

.content-COUNT-item {
  background: #ff7a00;
  width: 270px;
  height: 400px;
  padding: 10px;
  border-radius: 20px;
}

.content-COUNT-item a h3 {
  background: white;
  color: black;
  width: 193px;
  height: 55px;
  justify-items: center;
  text-align: center;
  transform: translatex(35px);
  font-size: 35px;
}

.services-grid2 {
  display: grid;
  grid-template-columns: repeat(3, 620px);
  width: 500px;
  height: 400px;
  margin-left: -1240px;
  margin-top: -1%;
}

.content-DG-item {
  background: #f2f2f2;
  width: 570px;
  height: 510px;
  border-radius: 20px;
}

.content-SG-item {
  background: #f2f2f2;
  width: 570px;
  height: 510px;
  border-radius: 20px;
}

.content-group-item {
  background: #d9d9d9;
  width: 270px;
  height: 130px;
  padding: 10px;
  border-radius: 20px;
  text-align: center;
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
  margin-top: 33%;
  transform: translatex(230%);
}

a h3 {
  background: white;
  color: white;
  width: 193px;
  height: 50px;
  justify-items: center;
  text-align: center;
  transform: translatex(25px);
}

.content-BT-item {
  background: #d9d9d9;
  width: 270px;
  height: 130px;
  padding: 10px;
  border-radius: 20px;
  text-align: center;
  font-family: "Sarabun", sans-serif;
  font-size: 16px;
  margin-top: 58%;
  transform: translatex(460%);
}

a h3 {
  background: white;
  color: black;
  width: 193px;
  height: 50px;
  justify-items: center;
  text-align: center;
  transform: translatex(25px);
  font-family: "Sarabun", sans-serif;
  font-size: 28px;
  padding-top: 5px;
}

.content-downtime-item {
  font-size: 20px;
  font-family: "Sarabun", sans-serif;
  text-align: center;
  transform: translatex(1230px);
  color: black;
}

.v-card--reveal {
  z-index: 1;
  padding-top: 2%;
  height: 450px;
  justify-content: center;
  top: 250px;
  left: 250px;
  width: 550px;
  background-color: #282724;
  color: #d9d9d9;
  flood-opacity: 100%;
  transform: translateX(400px);
  position: fixed;
  border-radius: 10%;
  box-shadow: 0 0 8px orangered;
}
</style>
