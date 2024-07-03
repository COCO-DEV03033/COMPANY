<template>
  <div id="dashboard-analytics">
    <vx-card ref="filterCard" title="Incomes By Company" class="mb-8">
      <div class="vx-row">
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Year</label>
          <v-select
            :options="yearForCardOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="yearForCardFilter"
            class="mb-4 md:mb-0"
          />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Month</label>
          <v-select
            :options="monthForCardOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="monthForCardFilter"
            class="mb-4 md:mb-0"
            :disabled="isDisableMonth"
          />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Organization</label>
          <v-select
            :options="organizationForCardOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="organizationForCardFilter"
            class="mb-4 md:mb-0"
            :disabled="isDisableOrganization"
          />
        </div>
      </div>
      <div class="vx-row mt-3" v-if="overViewForCard">
        <div class="vx-col w-full xl:w-1/5 md:w-full mb-base">
          <vx-card title="Income till now">
            <div class="vx-card_body">
              <vue-apex-charts
                type="radialBar"
                height="287"
                :options="analyticsData.semiRadialChart.chartOptions"
                :series="[((30 * 100) / 100).toFixed(2)]"
              />
            </div>
            <div class="flex justify-between text-center mt-6" slot="no-body-bottom">
              <div
                class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0"
              >
                <p class="mt-4 font-lignt">Income</p>
                <p class="mb-4 text-xl font-light">$&nbsp;{{ 30000 }}</p>
              </div>
              <div
                class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0"
              >
                <p class="mt-4 font-lignt">Plan</p>
                <p class="mb-4 text-xl font-light">$&nbsp;{{ 20000 }}</p>
              </div>
            </div>
          </vx-card>
        </div>
        <div class="vx-col w-full xl:w-4/5 md:w-full mb-base" style="height: 200px">
          <vs-row vs-type="flex" vs-w="12">
            <vs-col
              :key="index"
              v-for="(data, index) in overViewForCard.datas"
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="2"
              class="mr-6"
            >
              <vx-card :title="data.name" style="height: 328px">
                <div class="vx-row">
                  <div class="vx-col xl:w-full mb-base">
                    <div class="vx-row">
                      <div class="vx-col w-full">
                        <p>
                          Income: &nbsp;
                          <span class="float-right font-bold text-success">
                            ${{ data.income }}
                          </span>
                        </p>
                        <span class="float-right font-bold text-success">
                          {{ ((data.income * 100) / data.plan).toFixed(2) }}%
                        </span>
                        <vs-progress
                          :height="10"
                          class="block mt-1"
                          :percent="((data.income * 100) / data.plan).toFixed(2)"
                          color="primary"
                        ></vs-progress>
                      </div>
                    </div>
                    <vs-divider class="my-4"></vs-divider>
                    <div
                      class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-col-reverse lg:flex-row"
                    >
                      <div
                        class="vx-col w-full md:w-full sm:w-full lg:w-full xl:w-full flex flex-col justify-between"
                      >
                        <div>
                          <!-- Previous Data Comparison -->
                          <!-- <p class="text-4xl font-bold">$&nbsp;{{ 2000 }}</p> -->
                          <!-- <p class="mt-5 font-medium" >
                            <span class="text-success">
                              <span>{{ 1000 }}USD</span>
                            </span>
                            <feather-icon class="ml-2 mr-2 text-success" icon="TrendingUpIcon"  svgClasses="h-5 w-5"></feather-icon>
                          </p> -->

                          <p class="mt-2 font-medium">
                            <span> Plans: </span>
                            <span class="text-success">
                              <span></span>
                              <span>{{ data.plan }}$</span>
                            </span>
                          </p>
                          <p class="mt-2 font-medium">
                            <span> Pending: </span>
                            <span class="text-danger">
                              <span></span>
                              <span>{{ 1000 }}$</span>
                            </span>
                          </p>
                          <p class="mt-2 font-medium">
                            <span> Average: </span>
                            <span class="text-success">
                              <span></span>
                              <span>{{ data.average }}$</span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </vx-card>
            </vs-col>
          </vs-row>

          <vs-row vs-align="center" vs-type="flex" vs-justify="center" vs-w="12">
            <vs-col
              :key="index"
              v-for="(col, index) in 4"
              vs-type="flex"
              vs-justify="center"
              vs-align="center"
              vs-w="2"
            >
            </vs-col>
          </vs-row>
        </div>
      </div>
    </vx-card>
    <vx-card ref="filterCard" title="Incomes By Company" class="user-list-filters mb-8">
      <div class="vx-row">
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Organization</label>
          <v-select
            :options="organizationOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="organizationFilter"
            class="mb-4 md:mb-0"
          />
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
          <v-select
            :options="dateOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="dateFilter"
          />
        </div>
      </div>
      <div class="vx-row mt-5">
        <div id="chart" class="vx-col w-full mb-base">
          <vue-apex-charts
            height="350"
            :options="overView.chartOptions"
            :series="overView.series"
          ></vue-apex-charts>
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
import FeatherIcon from "./FeatherIcon.vue";
import analyticsData from "./analyticsData.js";

import VxTimeline from "@/components/timeline/VxTimeline";
import VueApexCharts from "vue-apexcharts";
import vSelect from "vue-select";
import moduleIncomeManagement from "@/store/income-management/moduleIncomeManagement.js";
const themeColors = ["#7367F0", "#28C76F", "#EA5455", "#FF9F43", "#1E1E1E"];

import { AgGridVue } from "ag-grid-vue";
import "../register/styles.css";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";
export default {
  data() {
    return {
      isDisableOrganization: true,
      isDisableMonth: true,

      yearForCard: "all",
      monthForCard: "all",
      organizationForCard: "all",

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
        suppressCellSelection: true,
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

      yearForCardFilter: { label: "All", value: "all" },
      yearForCardOptions: [
        { label: "All", value: "all" },
        { label: "2022", value: "2022" },
        { label: "2023", value: "2023" },
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
      ],

      monthForCardFilter: { label: "All", value: "all" },
      monthForCardOptions: [
        { label: "All", value: "all" },
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" },
        { label: "7", value: "7" },
        { label: "8", value: "8" },
        { label: "9", value: "9" },
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" },
      ],

      organizationForCardFilter: { label: "All", value: "all" },
      organizationForCardOptions: [
        { label: "All", value: "all" },
        { label: "7*9", value: "7*9" },
        { label: "3*9", value: "3*9" },
        { label: "8*2", value: "8*2" },
        { label: "5*4", value: "5*4" },
        { label: "A*", value: "A*" },
        { label: "Net*", value: "net*" },
      ],

      organizationFilter: { label: "All", value: "all" },
      organizationOptions: [
        { label: "All", value: "all" },
        { label: "7*9", value: "7*9" },
        { label: "3*9", value: "3*9" },
        { label: "8*2", value: "8*2" },
        { label: "5*4", value: "5*4" },
        { label: "A*", value: "A*" },
        { label: "Net*", value: "net*" },
      ],

      roleFilter: { label: "All", value: "all" },
      roleOptions: [
        { label: "All", value: "all" },
        { label: "Researcher", value: "researcher" },
        { label: "Engineer", value: "engineer" },
      ],

      projectTypeFilter: { label: "All", value: "all" },
      projectTypeOptions: [
        { label: "All", value: "all" },
        { label: "Web", value: "Web" },
        { label: "Mobile", value: "Mobile" },
        { label: "Civil", value: "Civil" },
        { label: "Remote", value: "Remote" },
      ],

      countryFilter: { label: "All", value: "all" },
      countryOptions: [
        { label: "All", value: "all" },
        { label: "USA", value: "USA" },
        { label: "UK", value: "UK" },
        { label: "Spain", value: "Spain" },
      ],

      jobSiteFilter: { label: "All", value: "all" },
      jobSiteOptions: [
        { label: "All", value: "all" },
        { label: "Freelancer.com", value: "Freelancer.com" },
        { label: "upwork.com", value: "upwork.com" },
        { label: "LinkedIn", value: "LinkedIn" },
      ],

      universtyFilter: { label: "All", value: "all" },
      universtyOptions: [
        { label: "All", value: "all" },
        { label: "University 1", value: "University 1" },
        { label: "University 2", value: "University 2" },
        { label: "University 3", value: "University 3" },
      ],

      dateFilter: { label: "day", value: "day" },
      dateOptions: [
        { label: "day", value: "day" },
        { label: "week", value: "week" },
        { label: "month", value: "month" },
        { label: "year", value: "year" },
      ],
      currentExpectedIncome: {},
      analyticsData,
      dispatchedOrders: [],
    };
  },
  components: {
    VueApexCharts,
    VxTimeline,
    vSelect,
    AgGridVue,
  },
  beforeCreate() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push("/login");
    //  User Reward Card
  },

  computed: {
    overView() {
      return this.$store.state.incomeManagement.overView;
    },
    overViewForCard() {
      return this.$store.state.incomeManagement.overViewForCard;
    },
    totalSums() {
      return this.$store.state.incomeManagement.totalSums;
    },
    months() {
      return this.$store.state.incomeManagement.months;
    },
  },
  methods: {
    fetchOverView() {
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

      this.$store.dispatch("incomeManagement/fetchOverView", payload);
    },

    fetchOverViewForCard() {
      if (this.yearForCard == "all") {
        this.isDisableMonth = true;
      } else {
        this.isDisableMonth = false;
      }

      if (this.yearForCard !== "all" && this.monthForCard !== "all") {
        this.isDisableOrganization = false;
      } else {
        this.isDisableOrganization = true;
      }
      const payload = {
        year: this.yearForCard,
        month: this.monthForCard,
        organization: this.organizationForCard,
      };

      this.$store.dispatch("incomeManagement/fetchOverViewForCard", payload);
    },

    fetchTotalSums() {
      const payload = {
        year: this.year,
        organization: this.organization,
      };

      this.$store.dispatch("incomeManagement/fetchTotalSums", payload);
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
          width: 150,
          editable: false,
          pinned: "left",
        },
        {
          headerName: "Team",
          field: "teamshow",
          width: 120,
          editable: false,
          pinned: "left",
        },
        {
          headerName: "Name",
          field: "name",
          width: 200,
          editable: false,
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
          headerName: this.months[i - 1],
          field: `month${i}`,
          width: 100,
        });
      }
    },
  },
  watch: {
    yearForCardFilter(obj) {
      this.yearForCard = obj.value;
      // this.isShowOrganization = true
      this.fetchOverViewForCard();
    },
    monthForCardFilter(obj) {
      this.monthForCard = obj.value;
      this.fetchOverViewForCard();
    },
    organizationForCardFilter(obj) {
      this.organizationForCard = obj.value;
      this.fetchOverViewForCard();
    },

    organizationFilter(obj) {
      this.organization = obj.value;
      this.fetchOverView();
    },
    projectTypeFilter(obj) {
      this.fetchOverView();
    },
    countryFilter(obj) {
      this.fetchOverView();
    },
    universtyFilter(obj) {
      this.fetchOverView();
    },
    jobSiteFilter(obj) {
      this.fetchOverView();
    },
    statusFilter(obj) {
      const val =
        obj.value === "all" ? "all" : obj.value === "approved" ? "true" : "false";
      this.fetchOverView("status", val);
    },
    roleFilter(obj) {
      this.fetchOverView();
    },
    dateFilter(obj) {
      this.dateformat = obj.value;
      this.fetchOverView();
    },
  },
  created() {
    if (!moduleIncomeManagement.isRegistered) {
      this.$store.registerModule("incomeManagement", moduleIncomeManagement);
      moduleIncomeManagement.isRegistered = true;
    }
    this.fetchOverView();
    this.fetchOverViewForCard();
    this.fetchTotalSums();

    this.$http.get("/api/card/card-dashboard/last-twelvemonths").then((response) => {
      this.monthlyIncomeTrends = response.data;
    });

    // Today's income data: row 1,1
    this.$http.get("/api/card/card-dashboard/week-income").then((response) => {
      this.weekIncomeData = response.data;
    });
  },
  mounted() {
    console.log("mounted", this.overViewForCard);
  },
};
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
