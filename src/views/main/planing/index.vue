<template>
  <div id="planing">
    <div class="vx-row"> 
      <div class="vx-col w-full lg:w-full mb-base ">
        <vx-card slot="no-body" class="text-center">  
          <div class="vx-row title">
              <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
                <h1 class="mb-1 firm">7*9 Firm</h1>
              </div>
              <div class="vx-col md:w-1/3 sm:w-1/2 w-full">
                <div class="datepicker-container md:w-1/3 sm:w-1/2 w-full">
                  <datepicker
                    class="custom_datepicker"
                    :minimumView="'month'"
                    :maximumView="'year'"
                    :format="format"
                    v-model="yearmonth"
                  ></datepicker>
                </div>
              </div>
          </div>
          <div class="vx-row mainchart">
            <div class="vx-col subchart xs:w-full lg:w-1/3 xl:w-1/3">
              <vue-apex-charts 
                type="donut"
                height="350" 
                :options="apexChatData.donutChart.chartOptions" 
                :series="apexChatData.donutChart.series">
              </vue-apex-charts>
            </div>
            <div class="vx-col  xs:w-full lg:w-2/3 xl:w-2/3">
              <vue-apex-charts 
                type="line" 
                height="350" 
                :options="apexChatData.lineChartSimple.chartOptions" 
                :series="apexChatData.lineChartSimple.series" >
              </vue-apex-charts>
            </div>
          </div> 
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-full mb-base">
        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2 mb-base rounded-10 ">
            <CompanyCard  
              :companyName = "'5*4'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "plan_514"
              :growthrate = "companyPlan.analyticsData.growthrate[0]"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[0]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[0]"
              :bardata = "companyPlan.bardata.bar_first"
              :color = "'text-success'"
            />
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard 
              :companyName = "'AI'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "plan_AI"
              :growthrate = "companyPlan.analyticsData.growthrate[1]"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[1]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[1]"
              :bardata = "companyPlan.bardata.bar_second"
              :color = "'text-warning'"
            />
          </div>
        </div>
        <div id="Card_two" class="vx-row" >
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard  
              :companyName = "'3*9'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "plan_329"
              :growthrate = "companyPlan.analyticsData.growthrate[2]"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[2]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[2]"
              :bardata = "companyPlan.bardata.bar_third"
              :color = "'text-primary'"
            />
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard 
              :companyName = "'8*2'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "plan_812"
              :growthrate = "companyPlan.analyticsData.growthrate[3]"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[3]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[3]"
              :bardata = "companyPlan.bardata.bar_fourth"
              :color = "'text-danger'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import apexChatData from './component/chart/apexChartData.js'
import CompanyCard from './component/CompanyCard.vue'
import companyPlan from './component/data/companyPlan.js'
import Datepicker from 'vuejs-datepicker'
export default {
  data () {
    return {
      apexChatData,
      companyPlan,
      yearmonth: '2024-05',
      format: 'yyyy-MM'
    }
  },
  components: {
    VueApexCharts,
    CompanyCard,
    Datepicker
  },
  beforeCreate () {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
  },
  computed : {
    plan_514 () {
      return this.companyPlan.analyticsData.plan[0]
    },
    plan_AI () {
      return this.companyPlan.analyticsData.plan[1]
    },
    plan_329 () {
      return this.companyPlan.analyticsData.plan[2]
    },
    plan_812 () {
      return this.companyPlan.analyticsData.plan[3]
    }
  }
}
</script>
<style scoped>
  .title {
    display: flex;
    align-items: center; 
    justify-content: center;
  }
  .firm{
    font-weight: bold;
    font-size: 45px;
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    letter-spacing: 3px;
    padding-right: 0 !important;
    transform: scale(0.8, 1.0);
  }
  @media only screen and (min-width: 660px) {
    .firm {
      float: right
    }
  }
  @media only screen and (max-width: 660px) {
    .mainchart {
      display: block;
      align-items: center;
    }
    .subchart{
      width: max-content;
      margin: auto;
    }
  }
  .custom_datepicker{
    width: 100%;
  }
  @media (max-width: 660px) {
    .custom_datepicker{
      width: 100%;
    }
  }
  .datepicker-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
