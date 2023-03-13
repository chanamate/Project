<template>
  <v-card elevation="0">
    <v-row>
      <!-- หัวข้อบนสุด -->
      <v-col cols="12">
        <v-card-title
          align="center"
          class="text-h4 my-4"
          v-if="type == 'F' || type == 'S'"
        >
          Quantity Input for Bottle Neck : Fabrication {{ type }} Frame
        </v-card-title>
        <v-card-title align="center" class="text-h4 my-4" v-if="type == 'P'">
          Quantity Input for Bottle Neck : Paint
        </v-card-title>
        <v-divider thickness="2" class="mt-2"></v-divider>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <!-- ตัวเลือกทางด้านซ้าย -->
        <v-item-group mandatory model-value="5">
          <v-card elevation="0" class="ml-4">
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
      </v-col>

      <v-col>
        <v-card height="840" color="#AAAAAA" class="pa-4 mr-4">
          <v-row> </v-row>
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
    selectedValueModel: "",
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
        name: "First Station",
        id: "4",
        url: "/first_OP/",
      },
      {
        name: "Bottle Neck",
        id: "5",
        url: "/bottleNeck/",
      },
    ],
  }),
  methods: {
    gettype() {
      return this.type;
    },
  },
};
</script>
