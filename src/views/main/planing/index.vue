<template>
  <div id="planing">
    <div class="vx-row"> 
      <div id="Card_main" class="vx-col w-full lg:w-full mb-base ">
        <vx-card slot="no-body" class="text-center">  
          <h1 class="mb-1 firm"> 7*9 Firm </h1>
          <div class="vx-row chartstyle">
            <div class="vx-col subchartstyle xs:w-full lg:w-1/3 xl:w-1/3">
              <vue-apex-charts 
                type="donut"
                height="350" 
                :options="apexChatData.donutChart.chartOptions" :series="apexChatData.donutChart.series">
              </vue-apex-charts>
              <template slot="codeContainer">
                {{ apexChatData.donutChartCode }}
              </template>
            </div>
            <div class="vx-col  xs:w-full lg:w-2/3 xl:w-2/3">
              <vue-apex-charts 
                type="line" 
                height="350" 
                :options="apexChatData.lineChartSimple.chartOptions" :series="apexChatData.lineChartSimple.series">
              </vue-apex-charts>
              <template slot="codeContainer">
                {{ apexChatData.lineChartSimpleCode }}
              </template>
            </div>
          </div> 
        </vx-card>
      </div>
      <div id="other_cards" class="vx-col w-full lg:w-full mb-base">
        <div id="Card_first" class="vx-row">
          <div class="vx-col w-full md:w-1/2 mb-base rounded-10 ">
            <CompanyCard  
              :companyName = "'5*4'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "companyPlan.analyticsData.plan[0]"
              :growthrate = "companyPlan.analyticsData.growthrate[0]"
              :link = "514"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[0]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[0]"
            />
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard 
              :companyName = "'AI'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "companyPlan.analyticsData.plan[1]"
              :growthrate = "companyPlan.analyticsData.growthrate[1]"
              :link = "'AI'"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[1]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[1]"
            />
          </div>
        </div>
        <div id="Card_two" class="vx-row" >
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard  
              :companyName = "'3*9'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "companyPlan.analyticsData.plan[2]"
              :growthrate = "companyPlan.analyticsData.growthrate[2]"
              :link = "329"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[2]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[2]"
            />
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard 
              :companyName = "'8*2'" 
              :analyticsData = "analyticsData"
              :companyPlan = "companyPlan"
              :plan = "companyPlan.analyticsData.plan[3]"
              :growthrate = "companyPlan.analyticsData.growthrate[3]"
              :link = "812"
              :TotalUserByCompany = "companyPlan.TotalUserByCompany[3]"
              :RealUserByCompany = "companyPlan.RealUserByCompany[3]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import apexChatData from './data/apexChartData.js'
import CompanyCard from './CompanyCard.vue'
import companyPlan from './data/companyPlan.js'
export default {
  data () {
    return {
      apexChatData,
      companyPlan
    }
  },
  components: {
    VueApexCharts,
    CompanyCard
  },
  beforeCreate () {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    //  User Reward Card
  }
}
</script>
<style scoped>
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
