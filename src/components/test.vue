<template>
  <v-responsive class="d-flex align-center text-center fill-height">
    <div class="mx-10" height="100vh" style="background: grey">
      <h1>Production Plan</h1>
      <v-divider class="py-4" :thickness="4" color="#000000"></v-divider>
      <v-row class="mx-4">
        <v-col>
          <v-card class="mx-auto">
            <v-card-text>
              <p class="text-left">Select production line:</p>
              <v-autocomplete
                v-model="selectedProductionLine"
                label="Productionline"
                :items="productionLines"
              ></v-autocomplete>
            </v-card-text>
          </v-card>
          <div>
            <DatePicker
              v-model="date"
              range
              auto-apply
              :enableTimePicker="false"
              :disabled-week-days="[0]"
              inline
              @change="logDateChange"
            />
            <v-btn @click="logDateValue()">Log Date Value</v-btn>
          </div>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-card-title> Production Targets </v-card-title>
            <v-card-text>
              <div v-for="(date, index) in dateRange" :key="index">
                <v-card>
                  <v-card-title>{{ formatDate(date) }}</v-card-title>
                  <v-card-text>
                    <v-row>
                      <v-col cols="6">
                        <v-row>
                          <v-col>
                            <v-checkbox
                              v-model="dayShiftIsChecked[index]"
                              label="Day Shift"
                            />
                          </v-col>
                          <v-checkbox
                            v-model="DayproductionA[index]"
                            label="A"
                            :disabled="DayproductionB[index]"
                          />
                          <v-checkbox
                            v-model="DayproductionB[index]"
                            label="B"
                            :disabled="DayproductionA[index]"
                          />
                        </v-row>
                        <v-text-field
                          v-model="dayShiftTarget[index]"
                          label="Target"
                        />
                      </v-col>
                      <v-col cols="6">
                        <v-row>
                          <v-col>
                            <v-checkbox
                              v-model="nightShiftIsChecked[index]"
                              label="Night Shift"
                            />
                          </v-col>
                          <v-checkbox
                            v-model="NightproductionA[index]"
                            label="A"
                            :disabled="NightproductionB[index]"
                          />
                          <v-checkbox
                            v-model="NightproductionB[index]"
                            label="B"
                            :disabled="NightproductionA[index]"
                          />
                        </v-row>
                        <v-text-field
                          v-model="nightShiftTarget[index]"
                          label="Target"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-card-text>
          </v-card>
          <v-btn @click="submitData">Submit</v-btn>
        </v-col>
      </v-row>
    </div>
  </v-responsive>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { format } from "date-fns";
import axiosInstance from "../utils/axios.instance";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref([]);

const selectedProductionLine = ref("");
const dayShiftIsChecked = ref([]);
const dayShiftTarget = ref([]);

const nightShiftIsChecked = ref([]);
const nightShiftTarget = ref([]);

const DayproductionA = ref([]);
const DayproductionB = ref([]);
const NightproductionA = ref([]);
const NightproductionB = ref([]);

let productionLines = [];

onMounted(async () => {
  const line = await axiosInstance.get("/line");
  productionLines = line.map((n) => `${n.lineName}`);
  console.log("productionLines", productionLines);
  console.log("line.data", line);
  // console.log(this.lineId);
});

const dateRange = computed(() => {
  if (Array.isArray(date.value) && date.value.length === 2) {
    const start = date.value[0];
    const end = date.value[1];
    const range = [];
    let current = start;
    while (current <= end) {
      range.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return range;
  } else {
    return [];
  }
});

async function submitData() {
  const formData = {};

  // Add the selected production line to the form data
  formData.productionLine = selectedProductionLine.value;

  // Loop over the date range and add the data for each date to the form data
  for (const date of dateRange.value) {
    const formattedDate = format(date, "yyyy-MM-dd");
    formData[formattedDate] = {};

    // Add the data for the day shift
    formData[formattedDate].dayShift = {};
    formData[formattedDate].dayShift.overtime = dayShiftIsChecked.value[
      dateRange.value.indexOf(date)
    ]
      ? "OVERTIME"
      : "NOT_OVERTIME";
    formData[formattedDate].dayShift.target =
      dayShiftTarget.value[dateRange.value.indexOf(date)];
    formData[formattedDate].dayShift.productionA = DayproductionA.value[
      dateRange.value.indexOf(date)
    ]
      ? "A"
      : "null";
    formData[formattedDate].dayShift.productionB = DayproductionB.value[
      dateRange.value.indexOf(date)
    ]
      ? "B"
      : "null";

    // Add the data for the night shift
    formData[formattedDate].nightShift = {};
    formData[formattedDate].nightShift.overtime = nightShiftIsChecked.value[
      dateRange.value.indexOf(date)
    ]
      ? "OVERTIME"
      : "NOT_OVERTIME";
    formData[formattedDate].nightShift.target =
      nightShiftTarget.value[dateRange.value.indexOf(date)];
    formData[formattedDate].nightShift.productionA = NightproductionA.value[
      dateRange.value.indexOf(date)
    ]
      ? "A"
      : "null";
    formData[formattedDate].nightShift.productionB = NightproductionB.value[
      dateRange.value.indexOf(date)
    ]
      ? "B"
      : "null";
  }
  const response = await axiosInstance.post("/production-plan", formData);
  console.log(formData);
}

function logDateChange(newValue) {
  console.log("New date value:", newValue);
}

function logDateValue() {
  if (Array.isArray(date.value) && date.value.length === 2) {
    const startDate = date.value[0];
    const endDate = date.value[1];
    console.log("Start date:", startDate);
    console.log("End date:", endDate);
  } else {
    console.log("Invalid date range.");
  }
}

function formatDate(date) {
  return format(date, "EEE, MMM d");
}

function logCardValue(cardDate) {
  console.log("Card value:", cardDate);
}
</script>
