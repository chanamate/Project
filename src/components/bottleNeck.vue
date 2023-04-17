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

  <v-card elevation="0">
    <v-row>
      <!-- หัวข้อบนสุด -->
      <v-col cols="12">
        <v-card-title align="center" class="text-h4 my-4" v-if="type !== 'P'">
          Output of Bottleneck : Fabrication {{ type }} Frame
        </v-card-title>
        <v-card-title align="center" class="text-h4 my-4" v-if="type == 'P'">
          Powder Coat Painting Don't have Bottle Neck
        </v-card-title>
        <v-divider thickness="2" class="mt-2"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <!-- ตัวเลือกทางด้านซ้าย -->
        <v-item-group mandatory model-value="4" v-if="type !== 'P'">
          <v-card elevation="0" class="ml-4 mt-n6">
            <v-col v-for="(item, index) in title" :key="index">
              <v-item v-slot="{ isSelected, toggle }" :value="item.id">
                <v-card
                  :color="isSelected ? 'primary' : '#D9D9D9'"
                  class="d-flex justify-center pa-6 text-h6"
                  dark
                  @click="toggle"
                  :to="item.url + gettype()"
                >
                  {{ item.name }}
                </v-card>
              </v-item>
            </v-col>
          </v-card>
        </v-item-group>

        <v-item-group mandatory model-value="4" v-if="type == 'P'">
          <v-card elevation="0" class="ml-4 mt-n6">
            <v-col v-for="(item, index) in title" :key="index">
              <v-item v-slot="{ isSelected, toggle }" :value="item.id">
                <v-card
                  :color="isSelected ? 'primary' : '#D9D9D9'"
                  class="d-flex justify-center pa-6 text-h6"
                  dark
                  @click="toggle"
                  :to="item.url + gettype()"
                  v-if="item.name !== 'Bottle Neck'"
                >
                  {{ item.name }}
                </v-card>
              </v-item>
            </v-col>
          </v-card>
        </v-item-group>
      </v-col>

      <v-col v-if="type !== 'P'">
        <v-card height="820" color="#AAAAAA" class="pa-4 mr-4 mt-n3">
          <v-row>
            <v-col cols="4">
              <v-card>
                <div class="ml-4 mt-4 text-h5">
                  Add quantity that come out of :
                </div>
                <div class="d-flex justify-center pa-4 text-h4">
                  <v-icon class="mx-2 pb-3" color="red" @click="removeAmount()">
                    mdi-minus
                  </v-icon>
                  {{ amount }}
                  <v-icon class="mx-2 pb-3" color="green" @click="addAmount()">
                    mdi-plus
                  </v-icon>
                </div>
                <div class="ml-5 text-h6 font-weight-regular">
                  + increasing the amount of data <br />
                  - decreasing the amount of data
                </div>
              </v-card>
              <div cols="6" class="d-flex justify-end mt-4">
                <v-btn @click="submit()"> Enter </v-btn>
              </div>
            </v-col>

            <v-col cols="3">
              <v-card class="text-h5">
                <div class="d-flex justify-center">
                  The current system has <br />
                </div>
                <div class="d-flex justify-center text-h3">
                  {{ this.amountNow.amount }}<br />
                </div>
                <div class="d-flex justify-center">frame of data.</div>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import moment from "moment";
import axiosInstance from "../utils/axios.instance";

export default {
  name: "bottleNeck",
  computed: {
    type() {
      return this.$route.params.type;
    },
  },

  data: () => ({
    amount: 1,
    amountNow: 0,
    lineId: null,
    title: [
      {
        name: "Finished Goods",
        id: "1",
        url: "/FG_F/",
      },
      {
        name: "Defect Type",
        id: "2",
        url: "/NG_F/",
      },
      {
        name: "Failure Mode",
        id: "3",
        url: "/DT_F/",
      },
      {
        name: "Bottle Neck",
        id: "4",
        url: "/bottleNeck/",
      },
    ],
    stationId: "",
  }),
  async mounted() {
    switch (this.type) {
      case "F":
        this.lineId = 1;
        this.stationId = "OPF06";
        break;
      case "S":
        this.lineId = 2;
        this.stationId = "OPS04";
        break;
    }
    const m = await axiosInstance.post(
      `/product/get/input-amount/${this.lineId}`,
      {
        date: new Date(),
        position: "BOTTLE_NECK",
      }
    );
    console.log("🚀 ~ file: bottleNeck.vue:148 ~ mounted ~ m:", m);
    this.amountNow = m;
  },
  methods: {
    addAmount() {
      this.amount = this.amount + 1;
    },
    removeAmount() {
      this.amount = this.amount - 1;
      if (this.amount < 0) {
        this.amount = 0;
      }
    },
    gettype() {
      return this.type;
    },
    async submit() {
      const b = await axiosInstance.post("/product/input-amount", {
        stationId: this.stationId,
        date: new Date(),
        increment: this.amount,
        position: "BOTTLE_NECK",
      });

      window.location.reload();
    },
  },
};
</script>
