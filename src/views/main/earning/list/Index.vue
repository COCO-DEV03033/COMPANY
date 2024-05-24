<template>
  <div id="ag-grid-demo">
    <vx-card ref="filterCard" title="Filters" class="user-list-filters mb-8">
      <div class="vx-row">
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Organization</label>
          <v-select
            :options="organOptions"
            :clearable="false"
            :dir="$vs.rtl ? 'rtl' : 'ltr'"
            v-model="organFilter"
            class="mb-4 md:mb-0"
          />
        </div>
        <div class="vx-col md:w-1/6 sm:w-1/2 w-full">
          <label class="text-sm opacity-75">Year & Month</label>
          <datepicker
            :minimumView="'month'"
            :maximumView="'year'"
            :format="format"
            v-model="yearmonth"
          ></datepicker>
        </div>
        <div class="demo-alignment">
          <vs-button color="primary" type="filled" @click="confirmSearch"
            >Search</vs-button
          >
        </div>
      </div>
    </vx-card>

    <vx-card>
      <!-- TABLE ACTION ROW -->

      <div class="flex flex-wrap justify-between items-center">
        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <div
          class="flex flex-wrap items-center justify-between ag-grid-table-actions-right"
        >
          <vs-input
            class="mb-4 md:mb-0 mr-4"
            v-model="searchQuery"
            @input="updateSearchQuery"
            placeholder="Search..."
          />
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()"
            >Export as CSV</vs-button
          >
          <vs-button color="success" class="ml-4 mb-4 md:mb-0" @click="save"
            >Save</vs-button
          >
        </div>
      </div>
      <ag-grid-vue
        ref="agGrid"
        :gridOptions="gridOptions"
        :rowClassRules="rowClassRules"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :style="{ width, height }"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="groupearnings"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="false"
        :suppressPaginationPanel="true"
        @grid-ready="onGridReady"
        @cell-value-changed="onCellValueChanged"
        :enableRtl="$vs.rtl"
      >
      </ag-grid-vue>
    </vx-card>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import { ROW_DATA_EVENTS } from "ag-grid-community";
import vSelect from "vue-select";
import Datepicker from "vuejs-datepicker";
import header from "./header.json";
import incomes from "./data.json";
import "./styles.css";

import { rearrangeData } from '@/utils/utils';

// Store Module
import moduleEarningManagement from "@/store/earning-management/moduleEarningManagement.js";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";

export default {
  components: {
    AgGridVue,
    vSelect,
    Datepicker,
  },
  data() {
    return {
      organFilter: { label: "All", value: "all" },
      organOptions: [
        { label: "All", value: "all" },
        { label: "7*9", value: "7*9" },
        { label: "3*9", value: "3*9" },
        { label: "8*2", value: "8*2" },
        { label: "5*4", value: "5*4" },
        { label: "A*", value: "A*" },
        { label: "Net*", value: "net*" },
      ],
      yearmonth: "2024-05",
      format: "yyyy-MM",
      height: "600px",
      width: "100%",
      searchQuery: "",
      gridOptions: {},
      gridApi: null,
      defaultColDef: {
        sortable: false,
        editable: true,
        resizable: true,
        lockPinned: true,
      },
      columnDefs: [
        {
          headerName: "ID",
          field: "id",
          hide: "true",
        },
        {
          headerName: "Company",
          field: "company",
          width: 100,
          editable: false,
          pinned: "left",
        },
        {
          headerName: "Team",
          field: "teamshow",
          width: 100,
          editable: false,
          pinned: "left",
        },
        {
          headerName: "Name",
          field: "name",
          width: 100,
          editable: false,
          pinned: "left",
        },
        {
          headerName: "Plan",
          field: "plan",
          width: 100,
          editable: false,
          pinned: "left",
        },
        {
          headerName: "Earning",
          field: "earning",
          width: 100,
          editable: false,
          pinned: "left",
        },
        {
          headerName: header[0],
          field: "day1",
          width: 100,
        },
        {
          headerName: header[1],
          field: "day2",
          width: 100,
        },
        {
          headerName: header[2],
          field: "day3",
          width: 100,
        },
        {
          headerName: header[3],
          field: "day4",
          width: 100,
        },
        {
          headerName: header[4],
          field: "day5",
          width: 100,
        },
        {
          headerName: header[5],
          field: "day6",
          width: 100,
        },
        {
          headerName: header[6],
          field: "day7",
          width: 100,
        },
        {
          headerName: header[7],
          field: "day8",
          width: 100,
        },
        {
          headerName: header[8],
          field: "day9",
          width: 100,
        },
        {
          headerName: header[9],
          field: "day10",
          width: 100,
        },
        {
          headerName: header[10],
          field: "day11",
          width: 100,
        },
        {
          headerName: header[11],
          field: "day12",
          width: 100,
        },
        {
          headerName: header[12],
          field: "day13",
          width: 100,
        },
        {
          headerName: header[13],
          field: "day14",
          width: 100,
        },
        {
          headerName: header[14],
          field: "day15",
          width: 100,
        },
        {
          headerName: header[15],
          field: "day16",
          width: 100,
        },
        {
          headerName: header[16],
          field: "day17",
          width: 100,
        },
        {
          headerName: header[17],
          field: "day18",
          width: 100,
        },
        {
          headerName: header[18],
          field: "day19",
          width: 100,
        },
        {
          headerName: header[19],
          field: "day20",
          width: 100,
        },
        {
          headerName: header[20],
          field: "day21",
          width: 100,
        },
        {
          headerName: header[21],
          field: "day22",
          width: 100,
        },
        {
          headerName: header[22],
          field: "day23",
          width: 100,
        },
        {
          headerName: header[23],
          field: "day24",
          width: 100,
        },
        {
          headerName: header[24],
          field: "day25",
          width: 100,
        },
        {
          headerName: header[25],
          field: "day26",
          width: 100,
        },
        {
          headerName: header[26],
          field: "day27",
          width: 100,
        },
        {
          headerName: header[27],
          field: "day28",
          width: 100,
        },
        {
          headerName: header[28],
          field: "day29",
          width: 100,
        },
        {
          headerName: header[29],
          field: "day30",
          width: 100,
        },
        {
          headerName: header[30],
          field: "day31",
          width: 100,
        },
        {
          headerName: header[31],
          field: "day32",
          width: 100,
        },
        {
          headerName: header[32],
          field: "day33",
          width: 100,
        },
        {
          headerName: header[33],
          field: "day34",
          width: 100,
        },
        {
          headerName: header[34],
          field: "day35",
          width: 100,
        },
      ],
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
        "display-team":
          "data.teamshow == '1'||data.teamshow == '2'||data.teamshow == '3'||data.teamshow == '4'||data.teamshow == '5'||data.teamshow == '6'||data.teamshow == '7'||data.teamshow == '8'||data.teamshow == '9'",
        // "display-member": (params) => {
        //     return (
        //       params.node.rowIndex % 2 === 0
        //     );
        // },
      },
    };
  },
  watch: {},
  computed: {
    groupearnings() {
      return this.$store.state.earningManagement.groupearnings;
    },
    earnings() {
      return this.$store.state.earningManagement.earnings;
    },
    dates() {
      return this.$store.state.earningManagement.dates;
    },
  },
  created () {

},  
  methods: {
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    },
    
    onGridReady(params) {
      // this.$_agGrid.addEventListener('cell-value-changed', this.onCellValueChanged);
    },
    onCellValueChanged(event) {
      const item = this.earnings.find(
        (item) => item._id === event.data._id
      );
      this.$store.dispatch("earningManagement/changeEaring", event.data)
    },
    async save() {
      this.$store.dispatch("earningManagement/updateEarings", this.groupearnings);
    },
    async confirmSearch() {
      const payload = {
        yearmonth: new Date(this.yearmonth),
        organization: this.organFilter,
        notify: this.$vs.notify,
      };
      await this.$store.dispatch("earningManagement/fetchEarings", payload);

    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
  },
  beforeCreate() {
    if (!moduleEarningManagement.isRegistered) {
      this.$store.registerModule("earningManagement", moduleEarningManagement);
      moduleEarningManagement.isRegistered = true;
    }
    const payload = {
      yearmonth: new Date(),
      organization: "all",
      notify: this.$vs.notify,
    };
    this.$store
      .dispatch("earningManagement/fetchEarings", payload)
      .then((res) => {})
      .catch((err) => {
        this.user_not_found = true;
        return;
        console.error(err);
      });
  },
  beforeUnmount() {
    // Remember to remove the event listener when the component is destroyed
    // this.$_agGrid.removeEventListener('cell-value-changed', this.onCellValueChanged);
  },
};
</script>

<style scoped>
.display-company {
  background-color: #cc222244 !important;
}

.display-team {
  background-color: #2244cc44;
}

.display-member {
  background-color: #99999944;
  border-left: 1px solid var(--ag-foreground-color) !important;
  border-right: 1px solid var(--ag-foreground-color) !important;
  border-bottom: 1px solid var(--ag-foreground-color) !important;
}

.ag-cell {
  line-height: 46px;
  font-family: "monica-ext-font_YIBBBFG";
  font-weight: 500;
  border-left-width: 1px !important;
  /* border-color: black !important; */
  border-left-color: #9b9b9b !important;
  overflow: visible !important;
  display: flex !important;
  justify-content: center !important;
}

.ag-header-cell-text {
  overflow: visible !important;
}

.ag-header-cell-label {
  display: flex;
  justify-content: center !important;
}

.ag-header-cell {
  font-family: "monica-ext-font_YIBBBFG";
  font-weight: 500;
  padding-left: 0px !important;
  padding-right: 0px !important;
  /* display: flex !important;
    justify-content: center !important; */
}

.ag-pinned-left-header {
  background-color: antiquewhite;
}

.ag-header-viewport {
  background-color: beige;
}
</style>
