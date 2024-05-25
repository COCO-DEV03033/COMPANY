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
        <div id = "Card_first" class="vx-row">
          <div class="vx-col w-full md:w-1/2 mb-base rounded-10 ">
            <vx-card class="rounded-10" >
              <div>
                <p class="text-warning  mb-6  text-3xl font-bold text-center font-sans ">
                   5*4 company
                </p>
              </div>
              <div
                class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row"
              >
                <!-- LEFT COL -->
                <div
                  class="plan_title vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between bg-cyan"
                  v-if="salesBarSession.analyticsData"
                >
                  <div align="center">
                    <h2 class="mb-1 font-bold">
                      {{ salesBarSession.analyticsData.session | k_formatter }}
                    </h2>
                    <p class="mt-2 text-xl font-medium">
                      <span
                        :class="
                          salesBarSession.analyticsData.comparison.result >= 0
                            ? 'text-success'
                            : 'text-danger'
                        "
                      >
                        <span v-if="salesBarSession.analyticsData.comparison.result > 0"
                          >+</span
                        >
                        <span>{{ salesBarSession.analyticsData.comparison.result }}</span>
                      </span>
                      <span> % vs </span>
                      <span>{{ salesBarSession.analyticsData.comparison.str }}</span>
                    </p>
                  </div>
                  <RouterLink to="/create-plan"><vs-button
                    icon-pack="feather"
                    icon="icon-chevrons-right"
                    icon-after
                    class="shadow-md w-full lg:mt-0 mt-4 p-2"
                    >More</vs-button
                  ></RouterLink>
                </div>

                <!-- RIGHT COL -->
                <div
                  class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base"
                >
                  <vue-apex-charts
                    type="bar"
                    height="150"
                    :options="analyticsData.salesBar.chartOptions"
                    :series="salesBarSession.series"
                    v-if="salesBarSession.series"
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
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <vx-card class="rounded-4">
              <div class="">
                <p class="text-warning  mb-6  text-3xl font-bold text-center font-sans ">
                  AI Company
                </p>
              </div>
                
              <div
                class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row"
              >
                <!-- LEFT COL -->
                <div
                  class="plan_title vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between"
                  v-if="salesBarSession.analyticsData"
                >
                  <div align="center">
                    <h2 class="mb-1 font-bold">
                      {{ salesBarSession.analyticsData.session | k_formatter }}
                    </h2>
                    <p class="mt-2 text-xl font-medium">
                      <span
                        :class="
                          salesBarSession.analyticsData.comparison.result >= 0
                            ? 'text-success'
                            : 'text-danger'
                        "
                      >
                        <span v-if="salesBarSession.analyticsData.comparison.result > 0"
                          >+</span
                        >
                        <span>{{ salesBarSession.analyticsData.comparison.result }}</span>
                      </span>
                      <span> % vs </span>
                      <span>{{ salesBarSession.analyticsData.comparison.str }}</span>
                    </p>
                  </div>
                  <RouterLink to="/create-plan"><vs-button
                    icon-pack="feather"
                    icon="icon-chevrons-right"
                    icon-after
                    class="shadow-md w-full lg:mt-0 mt-4 p-2"
                    >More</vs-button
                  ></RouterLink>
                </div>

                <!-- RIGHT COL -->
                <div
                  class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base"
                >
                  <vue-apex-charts
                    type="bar"
                    height="150"
                    :options="analyticsData.salesBar.chartOptions"
                    :series="salesBarSession.series"
                    v-if="salesBarSession.series"
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
          </div>
        </div>
        <div id = "Card_two" class="vx-row" >
          <div class="vx-col w-full md:w-1/2 mb-base">
        <vx-card class="rounded-4">
          <div class="">
            <p class="text-warning  mb-6  text-3xl font-bold text-center font-sans ">
              3*9 Company
            </p>
          </div>
            
          <div
            class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row"
          >
            <!-- LEFT COL -->
            <div
              class="plan_title vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between"
              v-if="salesBarSession.analyticsData"
            >
              <div align="center">
                <h2 class="mb-1 font-bold">
                  {{ salesBarSession.analyticsData.session | k_formatter }}
                </h2>
                <p class="mt-2 text-xl font-medium">
                  <span
                    :class="
                      salesBarSession.analyticsData.comparison.result >= 0
                        ? 'text-success'
                        : 'text-danger'
                    "
                  >
                    <span v-if="salesBarSession.analyticsData.comparison.result > 0"
                      >+</span
                    >
                    <span>{{ salesBarSession.analyticsData.comparison.result }}</span>
                  </span>
                  <span> % vs </span>
                  <span>{{ salesBarSession.analyticsData.comparison.str }}</span>
                </p>
              </div>
              <RouterLink to="/create-plan"><vs-button
                    icon-pack="feather"
                    icon="icon-chevrons-right"
                    icon-after
                    class="shadow-md w-full lg:mt-0 mt-4 p-2"
                    >More</vs-button
              ></RouterLink>
            </div>

            <!-- RIGHT COL -->
            <div
              class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base"
            >
              <vue-apex-charts
                type="bar"
                height="150"
                :options="analyticsData.salesBar.chartOptions"
                :series="salesBarSession.series"
                v-if="salesBarSession.series"
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
          </div>
          <div class="vx-col w-full md:w-1/2 mb-base">
            <vx-card class="rounded-4 ">
              <div class="">
                <p class="text-warning  mb-6  text-3xl font-bold text-center font-sans ">
                  8*2 Company
                </p>
              </div>
                
              <div
                class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-row lg:flex-row"
              >
                <!-- LEFT COL -->
                <div
                  class="plan_title vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col justify-between"
                  v-if="salesBarSession.analyticsData"
                >
                  <div align="center">
                    <h2 class="mb-1 font-bold">
                      {{ salesBarSession.analyticsData.session | k_formatter }}
                    </h2>
                    <p class="mt-2 text-xl font-medium">
                      <span
                        :class="
                          salesBarSession.analyticsData.comparison.result >= 0
                            ? 'text-success'
                            : 'text-danger'
                        "
                      >
                        <span v-if="salesBarSession.analyticsData.comparison.result > 0"
                          >+</span
                        >
                        <span>{{ salesBarSession.analyticsData.comparison.result }}</span>
                      </span>
                      <span> % vs </span>
                      <span>{{ salesBarSession.analyticsData.comparison.str }}</span>
                    </p>
                  </div>
                  <RouterLink to="/create-plan"><vs-button
                    icon-pack="feather"
                    icon="icon-chevrons-right"
                    icon-after
                    class="shadow-md w-full lg:mt-0 mt-4 p-2"
                    >More</vs-button
                  ></RouterLink>
                </div>

                <!-- RIGHT COL -->
                <div
                  class="vx-col w-full md:w-full sm:w-1/2 lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 md:mb-base sm:mb-0 mb-base"
                >
                  <vue-apex-charts
                    type="bar"
                    height="150"
                    :options="analyticsData.salesBar.chartOptions"
                    :series="salesBarSession.series"
                    v-if="salesBarSession.series"
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
    VxTimeline
  },
  beforeCreate () {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    //  User Reward Card
  },
  created () {
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
    this.$http
      .get('/api/card/card-analytics/sales/bar')
      .then((response) => {
        this.salesBarSession = response.data
      })
      .catch((error) => {
        console.log(error)
      })

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
