<template >
  <vx-card class="rounded-10" >
    <div>
      <p class="text-warning mb-6 text-3xl font-bold text-center font-sans ">
          {{companyName}} company
      </p>
    </div>
    <div class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row" >
      <div
        class="plan_title vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between bg-cyan"
        v-if="companyPlan.analyticsData" >
        <div align="center">
          <h2 class="mb-1 font-bold">{{plan}}</h2>
          <p class="mt-2 text-xl font-medium">
            <span v-if="growthrate>0" class="text-danger font-bold">+</span>
            <span class="text-danger font-bold">{{growthrate}}</span>
            <span>{{companyPlan.str}}</span>
          </p>
        </div>
        <div align="center">
          <RouterLink :to="`/create-plan/${link}`">
            <vs-button
              icon-pack="feather"
              icon="icon-chevrons-right"
              icon-after
              class="shadow-md w-2/3 lg:mt-0 mt-4 p-2"
            >More</vs-button>
          </RouterLink>
        </div>
      </div>
      <div class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base" >
        <vue-apex-charts
          type="bar"
          height="150"
          :options="companyPlan.BarData.chartOptions"
          :series="companyPlan.BarData.series"
          v-if="companyPlan.BarData.series"
        />
      </div>
    </div>
    <vs-divider class="my-6"></vs-divider>
    <div class="vx-row">
      <div class="vx-col w-1/2 mb-3">
        <p>Goal: ${{plan}}</p>
        <vs-progress class="block mt-1" :percent="50" color="primary"></vs-progress>
      </div>
      <div class="vx-col w-1/2 mb-3">
        <p>Developers : 50/43</p>
        <vs-progress class="block mt-1" :percent="60" color="warning"></vs-progress>
      </div>
    </div>
  </vx-card>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import companyPlan from './data/companyPlan.js'
export default {
  props: {
    analyticsData: {
      type: Object,
      required: true
    },
    companyPlan : {
      type: Object,
      required: true
    },
    link : {
      type: String,
      required: true
    },
    companyName : {
      type: String,
      required: true
    },
    plan : {
      type : String,
      required : true
    },
    growthrate : {
      type : Number,
      required : true
    }
  },
  components: {
    VueApexCharts,
    companyPlan
  }
}
</script>
<style>
  .plan_title {
    span{
      font-size: 12px;
    }
  }
</style>