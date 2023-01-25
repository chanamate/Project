<template>
  <v-row>
    <!-- หัวข้อบนสุด -->
    <v-col cols="12">
      <v-card-title align="center" class="text-h4 my-4">
        Home Page
      </v-card-title>
      <v-divider thickness="2" class="mt-2"></v-divider>
    </v-col>
  </v-row>

  <v-item-group mandatory>
    <v-card elevation="0" class="ml-4">
      <v-row class="mt-2">
        <v-col v-for="(item, index) in title" :key="index">
          <v-item v-slot="{ isSelected, toggle }" :value="item.id">
            <v-card
              :color="item.color"
              class="d-flex justify-center align-center pa-6 text-h6"
              dark
              height="800px"
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
        color: "#D9D9D9",
      },
      {
        name: "Fabrication S Frame",
        id: "2",
        url: "/FG_F/S",
        color: "#A9A9A9",
      },
      {
        name: "Paint",
        id: "3",
        url: "/FG_F/P",
        color: "#B9B9B9",
      },
    ],
  }),
};
</script>
