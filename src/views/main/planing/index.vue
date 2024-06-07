<template>
  <div id="planing">
    <div class="vx-row"> 
      <div id="Card_main" class="vx-col w-full lg:w-full mb-base ">
        <vx-card slot="no-body" class="text-center">  
          <h1 class="mb-1 firm">
            7*9 Firm
          </h1>
          <div class="vx-row chartstyle">
            <div class="vx-col subchartstyle xs:w-full lg:w-1/3 xl:w-1/3">
              <vue-apex-charts type="donut" height="350" :options="apexChatData.donutChart.chartOptions" :series="apexChatData.donutChart.series"></vue-apex-charts>
              <template slot="codeContainer">
                {{ apexChatData.donutChartCode }}
              </template>
            </div>
            <div class="vx-col  xs:w-full lg:w-2/3 xl:w-2/3">
              <vue-apex-charts type="line" height="350" :options="apexChatData.lineChartSimple.chartOptions" :series="apexChatData.lineChartSimple.series"></vue-apex-charts>
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
            <CompanyCard  :analyticsData = "analyticsData" :planData = "planData" />
            
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            
          </div>
        </div>
        <div id="Card_two" class="vx-row" >
          <div class="vx-col w-full md:w-1/2 mb-base">
        
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import analyticsData from '../../ui-elements/card/analyticsData.js'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'
import VxTimeline from '@/components/timeline/VxTimeline'
import apexChatData from '../../charts-and-maps/charts/apex-charts/apexChartData.js'
import { companies } from './companies.js'
import CompanyCard from './CompanyCard.vue'
import planData from './planData.js'


export default {
  data () {
    return {

      apexChatData,
      checkpointReward: {},
      subscribersGained: {},
      ordersRecevied: {},
      salesBarSession: {},
      supportTracker: {},
      productsOrder: {},
      salesRadar: {},
      companies,
      planData,

      timelineData: [
        {
          color: 'primary',
          icon: 'PlusIcon',
          title: 'Client Meeting',
          desc: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time: '25 mins Ago'
        },
        {
          color: 'warning',
          icon: 'MailIcon',
          title: 'Email Newsletter',
          desc: 'Cupcake gummi bears soufflé caramels candy',
          time: '15 Days Ago'
        },
        {
          color: 'danger',
          icon: 'UsersIcon',
          title: 'Plan Webinar',
          desc: 'Candy ice cream cake. Halvah gummi bears',
          time: '20 days ago'
        },
        {
          color: 'success',
          icon: 'LayoutIcon',
          title: 'Launch Website',
          desc:
            'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.',
          time: '25 days ago'
        },
        {
          color: 'primary',
          icon: 'TvIcon',
          title: 'Marketing',
          desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.',
          time: '28 days ago'
        }
      ],
      pieChart: {
        series: [44, 55, 13, 43],
        chartOptions: {
          labels: ['Team A', 'Team B', 'Team C', 'Team D'],
          colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
          responsive: {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        }
      },

      analyticsData,
      dispatchedOrders: []
    }
  },
  components: {
    VueApexCharts,
    StatisticsCardLine,
    ChangeTimeDurationDropdown,
    VxTimeline,
    CompanyCard
  },
  beforeCreate () {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    //  User Reward Card
  },
  created () {
    console.log('salesBarSession.analyticsData', planData.salesBarSession.analyticsData)
    // if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push({ path: '/login' })
    //  User Reward Card
    this.$http
      .get('/api/user/checkpoint-reward')
      .then((response) => {
        this.checkpointReward = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Subscribers gained - Statistics
    this.$http
      .get('/api/card/card-statistics/subscribers')
      .then((response) => {
        this.subscribersGained = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Orders - Statistics
    this.$http
      .get('/api/card/card-statistics/orders')
      .then((response) => {
        this.ordersRecevied = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Sales bar - Analytics
    // this.$http
    //   .get('/api/plan/bar')
    //   .then((response) => {
    //     this.salesBarSession = response.data
    //     console.log('success', response.data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // Support Tracker
    this.$http
      .get('/api/card/card-analytics/support-tracker')
      .then((response) => {
        this.supportTracker = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Products Order
    this.$http
      .get('/api/card/card-analytics/products-orders')
      .then((response) => {
        this.productsOrder = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Sales Radar
    this.$http
      .get('/api/card/card-analytics/sales/radar')
      .then((response) => {
        this.salesRadar = response.data
      })
      .catch((error) => {
        console.log(error)
      })

    // Dispatched Orders
    this.$http
      .get('/api/table/dispatched-orders')
      .then((response) => {
        this.dispatchedOrders = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#planing {
  .greet-user {
    position: relative;

    .decore-left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .decore-right {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  @media (max-width: 576px) {
    .decore-left,
    .decore-right {
      width: 140px;
    }
  }
}
/*! rtl:end:ignore */
</style>
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
