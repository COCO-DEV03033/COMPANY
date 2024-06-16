<template>
  <div id="dashboard-analytics">
    <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8">
      <div class="vx-row">
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Organization</label>
          <v-select :options="organizationOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="organizationFilter" class="mb-4 md:mb-0" />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">User Type</label>
          <v-select :options="roleOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="roleFilter" />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">projectType*</label>
          <v-select :options="projectTypeOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="projectTypeFilter" class="mb-4 md:mb-0" />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">country</label>
          <v-select :options="countryOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="countryFilter" class="mb-4 sm:mb-0" />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Job Site</label>
          <v-select :options="jobSiteOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="jobSiteFilter" />
        </div>
        <!-- <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Universty</label>
          <v-select :options="universtyOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="universtyFilter" />
        </div> -->
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Date</label>
          <v-select :options="dateOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="dateFilter" />
        </div>
      </div>
      <div class="vx-row mt-5">
        <div id="chart" class="vx-col w-full mb-base">
          <vue-apex-charts height="350" :options="overView.chartOptions" :series="overView.series"></vue-apex-charts>
      </div>
    </div>
    </vx-card>
    <div class="vx-row">
      <!-- CARD 4: SESSION -->
    </div>
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="OverView Details">
          <div slot="no-body" class="mt-4">
            <vs-table :data="overView.details" class="table-dark-inverted">
              <template slot="thead">
                <vs-th>Organization</vs-th>
                <vs-th>Avarage</vs-th>
                <vs-th>Total</vs-th>
                <!-- <vs-th>LOCATION</vs-th>
                <vs-th>DISTANCE</vs-th>
                <vs-th>START DATE</vs-th>
                <vs-th>EST DELIVERY DATE</vs-th> -->
              </template>

              <template slot-scope="{ data }">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].group }}</span>
                  </vs-td>
                  <!-- <vs-td :data="data[indextr].status">
                    <span class="flex items-center px-2 py-1 rounded"
                      ><div
                        class="h-3 w-3 rounded-full mr-2"
                        :class="'bg-' + data[indextr].statusColor"
                      ></div>
                      {{ data[indextr].status }}</span
                    >
                  </vs-td> -->
                  <!-- <vs-td :data="data[indextr].orderNo">
                    <ul class="users-liked user-list">
                      <li
                        v-for="(user, userIndex) in data[indextr].usersLiked"
                        :key="userIndex"
                      >
                        <vx-tooltip :text="user.name" position="bottom">
                          <vs-avatar
                            :src="user.img"
                            size="30px"
                            class="border-2 border-white border-solid -m-1"
                          ></vs-avatar>
                        </vx-tooltip>
                      </li>
                    </ul>
                  </vs-td> -->
                  <vs-td :data="data[indextr].average">
                    <span>{{ data[indextr].average }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].total">
                    <span>{{ data[indextr].total }}</span>
                    <vs-progress
                      :percent="data[indextr].distPercent"
                    ></vs-progress>
                      <!-- :color="data[indextr].statusColor" -->
                  </vs-td>
                  <!-- <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].startDate }}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].orderNo">
                    <span>{{ data[indextr].estDelDate }}</span>
                  </vs-td> -->
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import VxTimeline from '@/components/timeline/VxTimeline'
import VueApexCharts from 'vue-apexcharts'
import vSelect from 'vue-select'
import moduleIncomeManagement from "@/store/income-management/moduleIncomeManagement.js";
const themeColors = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']
export default {
  
  data () {
    return {

      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      organization: "all",
      projectType: "all",
      country: "all",
      universty: "all",
      jobSite: "all",
      role: "all",
      dateformat: "day",

      organizationFilter: { label: 'All', value: 'all' },
      organizationOptions: [
        { label: 'All', value: 'all' },
        { label: '7*9', value: '7*9' },
        { label: '3*9', value: '3*9' },
        { label: '8*2', value: '8*2' },
        { label: '5*4', value: '5*4' },
        { label: 'A*', value: 'A*' },
        { label: 'Net*', value: 'net*' }
      ],

      roleFilter: { label: 'All', value: 'all' },
      roleOptions: [
        { label: 'All', value: 'all' },
        { label: 'Researcher', value: 'researcher' },
        { label: 'Engineer', value: 'engineer' }
      ],

      projectTypeFilter: { label: 'All', value: 'all' },
      projectTypeOptions: [
        { label: 'All', value: 'all' },
        { label: 'Web', value: 'Web' },
        { label: 'Mobile', value: 'Mobile' },
        { label: 'Civil', value: 'Civil' },
        { label: 'Remote', value: 'Remote' },
      ],

      countryFilter: { label: 'All', value: 'all' },
      countryOptions: [
        { label: 'All', value: 'all' },
        { label: 'USA', value: 'USA' },
        { label: 'UK', value: 'UK' },
        { label: 'Spain', value: 'Spain' }
      ],

      jobSiteFilter: { label: 'All', value: 'all' },
      jobSiteOptions: [
        { label: 'All', value: 'all' },
        { label: 'Freelancer.com', value: 'Freelancer.com' },
        { label: 'upwork.com', value: 'upwork.com' },
        { label: 'LinkedIn', value: 'LinkedIn' }
      ],
      
      universtyFilter: { label: 'All', value: 'all' },
      universtyOptions: [
        { label: 'All', value: 'all' },
        { label: 'University 1', value: 'University 1' },
        { label: 'University 2', value: 'University 2' },
        { label: 'University 3', value: 'University 3' }
      ],

      dateFilter: { label: 'day', value: 'day'},
      dateOptions: [
        { label: 'day', value: 'day' },
        { label: 'week', value: 'week' },
        { label: 'month', value: 'month' },
        { label: 'year', value: 'year' }
      ],
      dispatchedOrders: []
    }
  },
  components: {
    VueApexCharts,
    VxTimeline,
    vSelect,
  },
  beforeCreate() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    //  User Reward Card
  },

  computed: {
    overView() {
      return this.$store.state.incomeManagement.overView;
    },
  },
  methods: {
    fetchOverView () {
      const payload = {
      year: this.year,
      month: this.month,
      organization: this.organization,
      projectType: this.projectType,
      country: this.country,
      universty: this.universty,
      jobSite: this.jobSite,
      role: this.role,
      dateformat: this.dateformat,
    };

    this.$store
      .dispatch("incomeManagement/fetchOverView", payload)
      .then((res) => {})
      .catch((err) => {
        return;
        console.error(err);
      });
    },
  },
  watch: {
    organizationFilter (obj) {
      this.organization = obj.value;
      this.fetchOverView()
    },
    projectTypeFilter (obj) {
      this.fetchOverView()
    },
    countryFilter (obj) {
      this.fetchOverView()
    },
    universtyFilter (obj) {
      this.fetchOverView()
    },
    jobSiteFilter (obj) {
      this.fetchOverView()
    },
    statusFilter (obj) {
      const val = obj.value === 'all' ? 'all' : obj.value === 'approved' ? 'true' : 'false'
      this.fetchOverView('status', val)
    },
    roleFilter (obj) {
      this.fetchOverView()
    },
    dateFilter (obj) {
      this.dateformat = obj.value;
      this.fetchOverView()
    }
  },
  created() {

    if (!moduleIncomeManagement.isRegistered) {
      this.$store.registerModule("incomeManagement", moduleIncomeManagement);
      moduleIncomeManagement.isRegistered = true;
    }
    this.fetchOverView();
    // Dispatched Orders
    // this.$http
    //   .get('/api/table/dispatched-orders')
    //   .then((response) => {
    //     this.dispatchedOrders = response.data
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
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
