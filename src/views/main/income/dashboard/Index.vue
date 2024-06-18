<template>
  <div id="dashboard-analytics">
    <vx-card ref="filterCard" title="Incomes By Company" class="user-list-filters mb-8">
      <div class="vx-row">
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Organization</label>
          <v-select :options="organizationOptions" :clearable="false" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="organizationFilter" class="mb-4 md:mb-0" />
        </div>
        <!-- <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
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
        </div> -->
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
    
      <!-- CARD 4: SESSION -->
      <vx-card>
      <!-- TABLE ACTION ROW -->
<div class="vx-row">
      <div class="flex flex-wrap justify-between items-center">
        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div
          class="flex flex-wrap items-center justify-between ag-grid-table-actions-right"
        >
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()"
            >Export as CSV</vs-button
          >
        </div>
      </div>
      <ag-grid-vue
        v-if="totalSums.length"
        ref="agGridTable"
        :gridOptions="gridOptions"
        :rowClassRules="rowClassRules"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :style="{ width, height }"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="totalSums"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="false"
        :suppressPaginationPanel="true"
        @grid-ready="onGridReady"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>
       </div>
    </vx-card>
  </div>
</template>

<script>
import VxTimeline from '@/components/timeline/VxTimeline'
import VueApexCharts from 'vue-apexcharts'
import vSelect from 'vue-select'
import moduleIncomeManagement from "@/store/income-management/moduleIncomeManagement.js";
const themeColors = ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']

import { AgGridVue } from "ag-grid-vue";
import "../register/styles.css";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";
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

      height: "600px",
      width: "100%",
      gridOptions: {
        suppressCellSelection: true
      },
      gridApi: null,
      defaultColDef: {
        sortable: false,
        editable: false,
        resizable: true,
        lockPinned: true,
      },
      columnDefs: [],
      rowClassRules: {
        // row style function
        "display-company": (params) => {
          var company = params.data.company;
          return (
            company == "3*9" ||
            company == "5*4" ||
            company == "8*2" ||
            company == "AI" ||
            company == "Net Manager"
          );
        },
        // row style expression
        "display-company-329": "data.company == '3*9 Company'",
        "display-company-514": "data.company == '5*4 Company'",
        "display-company-812": "data.company == '8*2 Company'",
        "display-company-AI": "data.company == 'AI Company'",
        "display-company-NET": "data.company == 'Net Manager Company'",
        "display-header": "data.company == 'Company'",
        "display-team":
          "data.teamshow == '1 Team'||data.teamshow == '2 Team'||data.teamshow == '3 Team'||data.teamshow == '4 Team'||data.teamshow == '5 Team'||data.teamshow == '6 Team'||data.teamshow == '7 Team'||data.teamshow == '8 Team'||data.teamshow == '9 Team'",
      },

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
    AgGridVue
  },
  beforeCreate() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push('/login')
    //  User Reward Card
  },

  computed: {
    overView() {
      return this.$store.state.incomeManagement.overView;
    },
    totalSums() {
      return this.$store.state.incomeManagement.totalSums;
    },
    months() {
      return this.$store.state.incomeManagement.months;
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

    fetchTotalSums () {
      const payload = {
      year: this.year,
      organization: this.organization,
    };

    this.$store
      .dispatch("incomeManagement/fetchTotalSums", payload)
      .then((res) => {})
      .catch((err) => {
        return;
        console.error(err);
      });
    },

    onGridReady(params) {
      this.columnDefs = [
        {
          headerName: "ID",
          field: "id",
          hide: "true",
        },
        {
          headerName: "Company",
          field: "company",
          width: 100,
          pinned: "left",
        },
        {
          headerName: "Team",
          field: "teamshow",
          width: 100,
          pinned: "left",
        },
        {
          headerName: "Name",
          field: "name",
          width: 100,
          pinned: "left",
        },
        {
          headerName: "Plan",
          field: "plan",
          width: 100,
          pinned: "left",
        },
        {
          headerName: "Income",
          field: "income",
          width: 100,
          pinned: "left",
        },
      ];
      for (let i = 1; i <= this.months.length; i++) {
        this.columnDefs.push({
          headerName: this.months[i-1],
          field: `month${i}`,
          width: 100,
        });
      }
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
    this.fetchTotalSums();
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
