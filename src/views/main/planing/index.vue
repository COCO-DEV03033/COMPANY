<template>
  <div id="planing">
    <div class="vx-row">
      <div class="vx-col w-full lg:w-full mb-base ">
        <vx-card slot="no-body" class="text-center">
          <div class="vx-row title">
            <p></p>
            <div class="datepicker-container">
              <datepicker class="custom_datepicker" :minimumView="'month'" :maximumView="'year'" :format="format"
                wrapper-class="custom_content" v-model="yearmonth"></datepicker>
            </div>
          </div>
          <div class="vx-row mainchart">
            <div class="vx-col subchart xs:w-full md:w-1/3 lg:w-1/3 xl:w-1/3">
              <vue-apex-charts type="donut" height="350" :options="apexChatData.donutChart.chartOptions"
                :series="apexChatData.donutChart.series">
              </vue-apex-charts>
            </div>
            <div class="vx-col  xs:w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
              <vue-apex-charts type="line" height="350" :options="apexChatData.lineChartSimple.chartOptions"
                :series="apexChatData.lineChartSimple.series">
              </vue-apex-charts>
            </div>
          </div>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-full mb-base">
        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2 mb-base rounded-10 ">
            <CompanyCard :companyName="'5*4'" :analyticsData="analyticsData" :companyPlan="companyPlan"
              :plan="datas['5*4']" :growthrate="companyPlan.analyticsData.growthrate[0]"
              :TotalUserByCompany="companyPlan.TotalUserByCompany[0]"
              :RealUserByCompany="companyPlan.RealUserByCompany[0]" :bardata="companyPlan.bardata.bar_514"
              :color="'text-success'" :isCurrentYearMonth="isCurrentYearMonth" :yearmonth="yearmonth" />
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard :companyName="'AI'" :analyticsData="analyticsData" :companyPlan="companyPlan"
              :plan="datas['AI']" :growthrate="companyPlan.analyticsData.growthrate[1]"
              :TotalUserByCompany="companyPlan.TotalUserByCompany[1]"
              :RealUserByCompany="companyPlan.RealUserByCompany[1]" :bardata="companyPlan.bardata.bar_AI"
              :color="'text-warning'" :isCurrentYearMonth="isCurrentYearMonth" :yearmonth="yearmonth" />
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard :companyName="'3*9'" :analyticsData="analyticsData" :companyPlan="companyPlan"
              :plan="datas['3*9']" :growthrate="companyPlan.analyticsData.growthrate[2]"
              :TotalUserByCompany="companyPlan.TotalUserByCompany[2]"
              :RealUserByCompany="companyPlan.RealUserByCompany[2]" :bardata="companyPlan.bardata.bar_329"
              :color="'text-primary'" :isCurrentYearMonth="isCurrentYearMonth" :yearmonth="yearmonth" />
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard :companyName="'8*2'" :analyticsData="analyticsData" :companyPlan="companyPlan"
              :plan="datas['8*2']" :growthrate="companyPlan.analyticsData.growthrate[3]"
              :TotalUserByCompany="companyPlan.TotalUserByCompany[3]"
              :RealUserByCompany="companyPlan.RealUserByCompany[3]" :bardata="companyPlan.bardata.bar_812"
              :color="'text-danger'" :isCurrentYearMonth="isCurrentYearMonth" :yearmonth="yearmonth" />
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <CompanyCard :companyName="'CT'" :analyticsData="analyticsData" :companyPlan="companyPlan"
              :plan="datas['CT']" :growthrate="companyPlan.analyticsData.growthrate[4]"
              :TotalUserByCompany="companyPlan.TotalUserByCompany[4]"
              :RealUserByCompany="companyPlan.RealUserByCompany[4]" :bardata="companyPlan.bardata.bar_CT"
              :color="'text-danger'" :isCurrentYearMonth="isCurrentYearMonth" :yearmonth="yearmonth" />
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
import CalendarIcon from './component/button/CalendarIcon.vue'
import modulePlanManagement from '@/store/plan-management/modulePlanManagement.js'
export default {
  data() {
    return {
      apexChatData,
      companyPlan,
      yearmonth: '2024-07',
      format: 'yyyy-MM',
      showInput: false
    }
  },
  components: {
    VueApexCharts,
    CompanyCard,
    Datepicker,
    CalendarIcon
  },
  created() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    if (!modulePlanManagement.isRegistered) {
      this.$store.registerModule('planManagement', modulePlanManagement)
      modulePlanManagement.isRegistered = true
    }
    const payload = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    }
    console.log('payload', payload)
    this.$store
      .dispatch('planManagement/fetchCompanyPlans', payload)
      .then((res) => {
        if (this.apexChatData.donutChart.series.length == 0) {
          console.log("companyPlans", res.companyPlans['3*9'])
          // this.apexChatData.donutChart.series.push(res.companyPlans['5*4'], res.companyPlans['AI'], res.companyPlans['3*9'], res.companyPlans['8*2'], res.companyPlans['CT'])
          this.apexChatData.donutChart.series.push(res.companyPlans['5*4'])
          this.apexChatData.donutChart.series.push(res.companyPlans['AI']) //AI
          this.apexChatData.donutChart.series.push(res.companyPlans['3*9'])
          this.apexChatData.donutChart.series.push(res.companyPlans['8*2']) //8*2
          this.apexChatData.donutChart.series.push(res.companyPlans['CT']) //CT
        }
      })
      .catch((err) => {
        console.log(err)
        this.user_not_found = true
      })
  },
  mounted() {
    console.log('companyPlans data-> ', this.datas())

  },
  computed: {
    datas() {
      console.log('temp data', this.$store.state.planManagement.companyPlans)
      return this.$store.state.planManagement.companyPlans
    },
    isCurrentYearMonth() {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed
      const selectedDate = new Date(this.yearmonth);
      const selectedYear = selectedDate.getFullYear();
      const selectedMonth = selectedDate.getMonth() + 1;
      return currentYear === selectedYear && currentMonth === selectedMonth;
    },
    plan_514() {
      return this.companyPlan.analyticsData.plan[0]
    },
    plan_AI() {
      return this.companyPlan.analyticsData.plan[1]
    },
    plan_329() {
      return this.companyPlan.analyticsData.plan[2]
    },
    plan_812() {
      return this.companyPlan.analyticsData.plan[3]
    },
    plan_CT() {
      return this.companyPlan.analyticsData.plan[4]
    }
  },
  watch: {
    yearmonth() {
      this.$forceUpdate();
    }
  }
}
</script>
<style scoped>
.title {
  align-items: center;
  justify-content: flex-end;
}

.header {
  padding: 0 10% 0 0;
}

@media (min-width: 768px) and (max-width: 992px) {
  .header {
    padding: 0 5% 0 0;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .header {
    width: 100%;
    padding: 0;
  }
}

.firm {
  font-weight: bold;
  font-size: 45px;
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  letter-spacing: 3px;
  padding-right: 0 !important;
  transform: scale(0.8, 1.0);
}

@media only screen and (min-width: 768px) {
  .firm {
    float: right
  }
}

.custom_content {
  width: 300px;
}

@media (min-width: 768px) and (max-width : 1060px) {
  .custom_content {
    width: auto;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .custom_content {
    width: 100%;
  }
}

@media only screen and (max-width: 660px) {
  .mainchart {
    display: block;
    align-items: center;
  }

  .subchart {
    width: max-content;
    margin: auto;
  }
}

@media (max-width: 660px) {
  .custom_datepicker {
    width: 100%;
  }
}

.datepicker-container {
  cursor: pointer;
  padding: 10px;
}
</style>
