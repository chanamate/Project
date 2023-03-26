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

  <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <v-row>
    <!-- หัวข้อบนสุด -->
    <v-col cols="12">
      <v-card-title align="center" class="text-h1 my-4">
        Home Page <i class="fa fa-home"></i>
      </v-card-title>
      <v-divider thickness="3" class="mt-2 color-black"></v-divider>
    </v-col>
  </v-row>

  <v-item-group mandatory class="d-flex justify-center">
    <v-card elevation="0" class="mx-4">
      <v-row class="mt-2">
        <v-col v-for="(item, index) in title" :key="index">
          <v-item v-slot="{ isSelected, toggle }" :value="item.id">
            <v-card
              :color="item.color"
              class="d-flex justify-center align-center pa-6 text-h4 rounded-xl text-white"
              dark
              height="700px"
              width="400px"
              @click="toggle"
              :to="item.url"
            >
              {{ item.name }}
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-card>
  </v-item-group>
</template>

<script>
export default {
  name: "FirstPage",
  data: () => ({
    title: [
      {
        name: "Fabrication F Frame",
        id: "1",
        url: "/FG_F/F",
        color: "#0288D1",
      },
      {
        name: "Fabrication S Frame",
        id: "2",
        url: "/FG_F/S",
        color: "#3949AB",
      },
      {
        name: "Paint",
        id: "3",
        url: "/FG_F/P",
        color: "primary",
      },
    ],
  }),
};
</script>
