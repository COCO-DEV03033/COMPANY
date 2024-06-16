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
        v-if="groupincomes.length"
        ref="agGridTable"
        :gridOptions="gridOptions"
        :rowClassRules="rowClassRules"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :style="{ width, height }"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="groupincomes"
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
import "./styles.css";

// Store Module
import moduleIncomeManagement from "@/store/income-management/moduleIncomeManagement.js";
import "@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss";

export default {
  components: {
    AgGridVue,
    vSelect,
    Datepicker,
  },
  data() {
    return {
      isGrid: false,
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
      rowData: [],
      yearmonth: new Date(),
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
    };
  },
  watch: {},
  computed: {
    groupincomes() {
      return this.$store.state.incomeManagement.groupincomes;
    },
    incomes() {
      return this.$store.state.incomeManagement.incomes;
    },
    dates() {
      return this.$store.state.incomeManagement.dates;
    },
  },
  created() {},
  methods: {
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
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
          headerName: "Income",
          field: "income",
          width: 100,
          editable: false,
          pinned: "left",
        },
      ];
      for (let i = 1; i <= this.dates.length; i++) {
        this.columnDefs.push({
          headerName: this.dates[i-1],
          field: `day${i}`,
          width: 100,
          type: ['currency', 'shaded']
        });
      }
    },
    onCellValueChanged(event) {
      this.$store.dispatch("incomeManagement/changeIncome", event.data);
    },
    async save() {
      const payload = {
        incomes : this.incomes,
        year: this.yearmonth.getFullYear(),
        month: this.yearmonth.getMonth() + 1,
      }
      this.$store.dispatch("incomeManagement/updateIncomes", payload);
    },
    async confirmSearch() {
      const payload = {
        year: this.yearmonth.getFullYear(),
        month: this.yearmonth.getMonth() + 1,
        organization: this.organFilter.value,
        notify: this.$vs.notify,
      };
      await this.$store
        .dispatch("incomeManagement/fetchIncomes", payload)
        .then((res) => {
          this.onGridReady();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
  },
  beforeCreate() {
    if (!moduleIncomeManagement.isRegistered) {
      this.$store.registerModule("incomeManagement", moduleIncomeManagement);
      moduleIncomeManagement.isRegistered = true;
    }
    const payload = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      organization: "all",
      notify: this.$vs.notify,
    };

    this.$store
      .dispatch("incomeManagement/fetchIncomes", payload)
      .then((res) => {})
      .catch((err) => {
        this.user_not_found = true;
        return;
        console.error(err);
      });
  },
  beforeUnmount() {
    console.log("before Unmount");
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
