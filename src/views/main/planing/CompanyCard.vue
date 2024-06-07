<template >
  <vx-card class="rounded-10" >
    <div>
      <p class="text-warning  mb-6  text-3xl font-bold text-center font-sans ">
          5*4 company
      </p>
    </div>
    <div
      class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row"
    >
      <div
        class="plan_title vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between bg-cyan"
        v-if="planData.salesBarSession.analyticsData" >
        <div align="center">
          <h2 class="mb-1 font-bold">
            {{ planData.salesBarSession.analyticsData.session[0] }}
          </h2>
          <p class="mt-2 text-xl font-medium">
            <span
              :class="
                planData.salesBarSession.analyticsData.comparison.result >= 0
                  ? 'text-success'
                  : 'text-danger'
              "
            >
              <span v-if="planData.salesBarSession.analyticsData.comparison.result > 0">+</span
              >
              <span>+{{ planData.salesBarSession.analyticsData.comparison.result[0] }}</span>
            </span>
            <span> % vs </span>
            <span>{{ planData.salesBarSession.analyticsData.comparison.str }}</span>
          </p>
        </div>
    
        
      </div>
      <!-- <div v-for="(listItem, index) in companies" :key="index" :id="listItem.id">
          <RouterLink :to="`/create-plan/${listItem.id}`">
            <vs-button
              icon-pack="feather"
              icon="icon-chevrons-right"
              icon-after
              class="shadow-md w-full lg:mt-0 mt-4 p-2"
            >More</vs-button>
          </RouterLink>
      </div> -->
      
      <div
        class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base"
      >
        <vue-apex-charts
          type="bar"
          height="150"
          :options="analyticsData.salesBar.chartOptions"
          :series="planData.salesBarSession.series"
          v-if="planData.salesBarSession.series"
        />
      </div>
    </div>
    <vs-divider class="my-6"></vs-divider>
    <div class="vx-row">
      <div class="vx-col w-1/2 mb-3">
        <p>Goal: $100000</p>
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
export default {
  props: {
    salesBarSession: {
      type: Object,
      required: true
    },
    analyticsData: {
      type: Object,
      required: true
    },
    planData : {
      type: Object,
      required: true
    }
  },
  components: {
    VueApexCharts
  }
}
</script>
<style>
  .firm{
    color: #2645ff;
    font-weight: 900;
    font-size: 45px;
    font-family: Sans-Serif;
    letter-spacing: 3px;
    transform: scale(0.8, 1.0);
  }
  @media only screen and (max-width: 660px) {
    .chartstyle {
      display: block;
      align-items: center;
      
    }
    .subchartstyle{
      width: max-content;
      margin: auto;
    }
  }
  .plan_title {
    span{
      font-size: 12px;
    }
  }
</style>