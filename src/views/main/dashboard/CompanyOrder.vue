<!-- =========================================================================================
    File Name: ChartBarChart.vue
    Description: Create bar chart
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card title="Rate of Each Company's Income" class="mb-base"  v-if="currentIncome_Company">
    <vue-apex-charts type="radialBar" height="410" :options="analyticsData.companyOrder.chartOptions" :series="[(currentIncome_Company.currentIncome_514*100/currentIncome_Company.planIncome_514),(currentIncome_Company.currentIncome_329*100/currentIncome_Company.planIncome_329),(currentIncome_Company.currentIncome_812*100/currentIncome_Company.planIncome_812),(currentIncome_Company.currentIncome_AI*100/currentIncome_Company.planIncome_AI),(currentIncome_Company.currentIncome_CT*100/currentIncome_Company.planIncome_CT)]"></vue-apex-charts>
  </vx-card>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import ApexChart from 'apexcharts'
import analyticsData from './analyticsData.js'

export default {
  data(){
    return{
      analyticsData,
      currentIncome_Company:{},


      
    }
  },
  components: {
    VueApexCharts,
    ApexChart
  },
  created(){
    this.$http.get('/api/card/card-dashboard/company-order')
		.then((response) => {			
			this.currentIncome_Company  = response.data 			
		})
  }
}
</script>
