<template >
  <vx-card class="rounded-10" >
    <div>
      <p :class="['mb-6', 'text-3xl', 'font-bold', 'text-center', 'font-sans', color]">
          {{companyName}} company
      </p>
    </div>
    <div class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row" >
      <div
        class="companyplan vx-col w-full md:w-full sm:w-2/5 lg:w-2/5 xl:w-2/5 flex flex-col justify-around bg-cyan"
        v-if="companyPlan.analyticsData" >
        <div align="center">
          <h2 :class="['mb-1','font-bold', color]">${{plan}}</h2>
          <p class="mt-2 text-xl font-medium">
            <span v-if="growthrate>0" class="text-success font-bold">+</span>
            <span class="text-success font-bold">{{growthrate}}</span>
            <span>{{companyPlan.str}}</span>
          </p>
        </div>
        <div align="center">
          <RouterLink :to="`/create-plan/${companyName}`">
            <vs-button
              icon-pack="feather"
              icon="icon-chevrons-right"
              icon-after
              class="shadow-md w-full lg:mt-0 mt-4 p-2"
            >More</vs-button>
          </RouterLink>
        </div>
      </div>
      <div class="vx-col w-full md:w-full sm:w-3/5 lg:w-3/5 xl:w-3/5 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base" >
        <ChartjsBarChart :realdata="bardata"/>
      </div>
    </div>
    <vs-divider class="my-6"></vs-divider>
    <div id="foo" class="vx-row">
      <div class="vx-col w-1/2 mb-3">
        <p>Average:  ${{parseFloat(plan / RealUserByCompany).toFixed(1)}}</p>
        <vs-progress 
          class="block mt-1" 
          :percent="parseFloat(plan / RealUserByCompany).toFixed(1) / 3000 * 100" 
          color="primary">
        </vs-progress>
      </div>
      <div class="vx-col w-1/2 mb-3">
        <p>Users : {{RealUserByCompany}} / {{TotalUserByCompany}} </p>
        <vs-progress 
          class="block mt-1" 
          :percent="parseFloat(RealUserByCompany/ TotalUserByCompany).toFixed(1) * 100" 
          color="warning">
        </vs-progress>
      </div>
    </div>
  </vx-card>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import companyPlan from './data/companyPlan.js'
import ChartjsBarChart from './chart/ChartjsBarChart.vue'
export default {
  data () {
    return {
    }
  },
  props: {
    analyticsData: Object,
    bardata: Array,
    companyPlan: Object,
    companyName: String,
    plan: String,
    growthrate: Number,
    TotalUserByCompany: Array,
    RealUserByCompany: Array,
    color: String
  },
  components: {
    VueApexCharts,
    companyPlan,
    ChartjsBarChart
  },
  created () {
    // console.log('bardata', companyPlan.bardata)
  }
}
</script>
<style lang="scss">
  .companyplan {
    h2 {
      margin-top: -25px;
    }
  }
</style>
<style scoped>
  .companyplan {
    span{
      font-size: 12px;
    }
  }
</style>