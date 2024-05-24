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
        :rowData="datas"
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
      incomes,
      datas: [],
      updateData:[],
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
    earnings() {
      return this.$store.state.earningManagement.earnings;
    },
    dates() {
      return this.$store.state.earningManagement.dates;
    },
  },
  created () {
    console.log('created function--->',this.$store.state.earningManagement.earnings);
  },  
  methods: {
    updateSearchQuery(val) {
      this.gridApi.setQuickFilter(val);
    },
    rearrangeData(companyname) {
      let filterdData = this.earnings.filter(
        (obj) => obj.organization === companyname
      );
      // Initialize the sums
      let planSum = 0;
      let earningSum = 0;
      let day1Sum = 0;
      let day2Sum = 0;
      let day3Sum = 0;
      let day4Sum = 0;
      let day5Sum = 0;
      let day6Sum = 0;
      let day7Sum = 0;
      let day8Sum = 0;
      let day9Sum = 0;
      let day10Sum = 0;
      let day11Sum = 0;
      let day12Sum = 0;
      let day13Sum = 0;
      let day14Sum = 0;
      let day15Sum = 0;
      let day16Sum = 0;
      let day17Sum = 0;
      let day18Sum = 0;
      let day19Sum = 0;
      let day20Sum = 0;
      let day21Sum = 0;
      let day22Sum = 0;
      let day23Sum = 0;
      let day24Sum = 0;
      let day25Sum = 0;
      let day26Sum = 0;
      let day27Sum = 0;
      let day28Sum = 0;
      let day29Sum = 0;
      let day30Sum = 0;
      let day31Sum = 0;
      let day32Sum = 0;
      let day33Sum = 0;
      let day34Sum = 0;
      let day35Sum = 0;

      // Loop through the filtered items and calculate the sums
      filterdData.forEach((item) => {
        planSum += parseFloat(item["plan"]);

        for (let i = 1; i <= header.length; i++) {
          if (item[`day${i}`]) {
            earningSum += parseFloat(item[`day${i}`]);
          }
        }
        day1Sum += parseFloat(item["day1"]);
        day2Sum += parseFloat(item["day2"]);
        day3Sum += parseFloat(item["day3"]);
        day4Sum += parseFloat(item["day4"]);
        day5Sum += parseFloat(item["day5"]);
        day6Sum += parseFloat(item["day6"]);
        day7Sum += parseFloat(item["day7"]);
        day8Sum += parseFloat(item["day8"]);
        day9Sum += parseFloat(item["day9"]);
        day10Sum += parseFloat(item["day10"]);
        day11Sum += parseFloat(item["day11"]);
        day12Sum += parseFloat(item["day12"]);
        day13Sum += parseFloat(item["day13"]);
        day14Sum += parseFloat(item["day14"]);
        day15Sum += parseFloat(item["day15"]);
        day16Sum += parseFloat(item["day16"]);
        day17Sum += parseFloat(item["day17"]);
        day18Sum += parseFloat(item["day18"]);
        day19Sum += parseFloat(item["day19"]);
        day20Sum += parseFloat(item["day20"]);
        day21Sum += parseFloat(item["day21"]);
        day22Sum += parseFloat(item["day22"]);
        day23Sum += parseFloat(item["day23"]);
        day24Sum += parseFloat(item["day24"]);
        day25Sum += parseFloat(item["day25"]);
        day26Sum += parseFloat(item["day26"]);
        day27Sum += parseFloat(item["day27"]);
        day28Sum += parseFloat(item["day28"]);
        day29Sum += parseFloat(item["day29"]);
        day30Sum += parseFloat(item["day30"]);
        day31Sum += parseFloat(item["day31"]);
        day32Sum += parseFloat(item["day32"]);
        day33Sum += parseFloat(item["day33"]);
        day34Sum += parseFloat(item["day34"]);
        day35Sum += parseFloat(item["day35"]);
      });

      let result = {
        company: companyname,
        plan: planSum,
        earning: earningSum,
        day1: day1Sum,
        day2: day2Sum,
        day3: day3Sum,
        day4: day4Sum,
        day5: day5Sum,
        day6: day6Sum,
        day7: day7Sum,
        day8: day8Sum,
        day9: day9Sum,
        day10: day10Sum,
        day11: day11Sum,
        day12: day12Sum,
        day13: day13Sum,
        day14: day14Sum,
        day15: day15Sum,
        day16: day16Sum,
        day17: day17Sum,
        day18: day18Sum,
        day19: day19Sum,
        day20: day20Sum,
        day21: day21Sum,
        day22: day22Sum,
        day23: day23Sum,
        day24: day24Sum,
        day25: day25Sum,
        day26: day26Sum,
        day27: day27Sum,
        day28: day28Sum,
        day29: day29Sum,
        day30: day30Sum,
        day31: day31Sum,
        day32: day32Sum,
        day33: day33Sum,
        day34: day34Sum,
        day35: day35Sum,
      };
      this.datas.push(result);
      // Group the data by the "team" field
      let groupedByTeam = filterdData.reduce((acc, obj) => {
        if (!acc[obj.team]) {
          acc[obj.team] = {
            plan: 0,
            earning: 0,
            day1: 0,
            day2: 0,
            day3: 0,
            day4: 0,
            day5: 0,
            day6: 0,
            day7: 0,
            day8: 0,
            day9: 0,
            day10: 0,
            day11: 0,
            day12: 0,
            day13: 0,
            day14: 0,
            day15: 0,
            day16: 0,
            day17: 0,
            day18: 0,
            day19: 0,
            day20: 0,
            day21: 0,
            day22: 0,
            day23: 0,
            day24: 0,
            day25: 0,
            day26: 0,
            day27: 0,
            day28: 0,
            day29: 0,
            day30: 0,
            day31: 0,
            day32: 0,
            day33: 0,
            day34: 0,
            day35: 0,
            items: [],
          };
        }
        acc[obj.team].plan += parseFloat(obj.plan);

        for (let i = 1; i <= header.length; i++) {
          if (obj[`day${i}`]) {
            acc[obj.team].earning += parseFloat(obj[`day${i}`]);
          }
        }

        acc[obj.team].day1 += parseFloat(obj.day1);
        acc[obj.team].day2 += parseFloat(obj.day2);
        acc[obj.team].day3 += parseFloat(obj.day3);
        acc[obj.team].day4 += parseFloat(obj.day4);
        acc[obj.team].day5 += parseFloat(obj.day5);
        acc[obj.team].day6 += parseFloat(obj.day6);
        acc[obj.team].day7 += parseFloat(obj.day7);
        acc[obj.team].day8 += parseFloat(obj.day8);
        acc[obj.team].day9 += parseFloat(obj.day9);
        acc[obj.team].day10 += parseFloat(obj.day10);
        acc[obj.team].day11 += parseFloat(obj.day11);
        acc[obj.team].day12 += parseFloat(obj.day12);
        acc[obj.team].day13 += parseFloat(obj.day13);
        acc[obj.team].day14 += parseFloat(obj.day14);
        acc[obj.team].day15 += parseFloat(obj.day15);
        acc[obj.team].day16 += parseFloat(obj.day16);
        acc[obj.team].day17 += parseFloat(obj.day17);
        acc[obj.team].day18 += parseFloat(obj.day18);
        acc[obj.team].day19 += parseFloat(obj.day19);
        acc[obj.team].day20 += parseFloat(obj.day20);
        acc[obj.team].day21 += parseFloat(obj.day21);
        acc[obj.team].day22 += parseFloat(obj.day22);
        acc[obj.team].day23 += parseFloat(obj.day23);
        acc[obj.team].day24 += parseFloat(obj.day24);
        acc[obj.team].day25 += parseFloat(obj.day25);
        acc[obj.team].day26 += parseFloat(obj.day26);
        acc[obj.team].day27 += parseFloat(obj.day27);
        acc[obj.team].day28 += parseFloat(obj.day28);
        acc[obj.team].day29 += parseFloat(obj.day29);
        acc[obj.team].day30 += parseFloat(obj.day30);
        acc[obj.team].day31 += parseFloat(obj.day31);
        acc[obj.team].day32 += parseFloat(obj.day32);
        acc[obj.team].day33 += parseFloat(obj.day33);
        acc[obj.team].day34 += parseFloat(obj.day34);
        acc[obj.team].day35 += parseFloat(obj.day35);
        acc[obj.team].items.push(obj);
        return acc;
      }, {});
      let keyNames = Object.keys(groupedByTeam);
      keyNames.forEach((key) => {
        this.datas.push({
          teamshow: key,
          plan: groupedByTeam[key]["plan"],
          earning: groupedByTeam[key]["earning"],
          day1: groupedByTeam[key]["day1"],
          day2: groupedByTeam[key].day2,
          day3: groupedByTeam[key].day3,
          day4: groupedByTeam[key].day4,
          day5: groupedByTeam[key].day5,
          day6: groupedByTeam[key].day6,
          day7: groupedByTeam[key].day7,
          day8: groupedByTeam[key].day8,
          day9: groupedByTeam[key].day9,
          day10: groupedByTeam[key].day10,
          day11: groupedByTeam[key].day11,
          day12: groupedByTeam[key].day12,
          day13: groupedByTeam[key].day13,
          day14: groupedByTeam[key].day14,
          day15: groupedByTeam[key].day15,
          day16: groupedByTeam[key].day16,
          day17: groupedByTeam[key].day17,
          day18: groupedByTeam[key].day18,
          day19: groupedByTeam[key].day19,
          day20: groupedByTeam[key].day20,
          day21: groupedByTeam[key].day21,
          day22: groupedByTeam[key].day22,
          day23: groupedByTeam[key].day23,
          day24: groupedByTeam[key].day24,
          day25: groupedByTeam[key].day25,
          day26: groupedByTeam[key].day26,
          day27: groupedByTeam[key].day27,
          day28: groupedByTeam[key].day28,
          day29: groupedByTeam[key].day29,
          day30: groupedByTeam[key].day30,
          day31: groupedByTeam[key].day31,
          day32: groupedByTeam[key].day32,
          day33: groupedByTeam[key].day33,
          day34: groupedByTeam[key].day34,
          day35: groupedByTeam[key].day35,
        });

        if (groupedByTeam[key].hasOwnProperty("items")) {
          groupedByTeam[key].items.map((item) => {
            item["earning"] = 0;
            for (let i = 1; i <= header.length; i++) {
              if (item[`day${i}`]) {
                item["earning"] += parseFloat(item[`day${i}`]);
              }
            }
            this.datas.push(item);
          });
        }
      });
    },
    onGridReady(params) {
      // this.$_agGrid.addEventListener('cell-value-changed', this.onCellValueChanged);
    },
    onCellValueChanged(event) {
      // Handle the cell value change event here

      this.datas = [];
      this.rearrangeData("3*9");
      this.rearrangeData("5*4");

      console.log("Cell value changed:", event.data);
      const item = this.earnings.find(
        (item) => item._id === event.data._id
      );
      if (item) {
        console.log("item",item._id);
      }
    },
    async save() {
      this.$store.dispatch("earningManagement/updateEarings", this.earnings)
      .then((res) => {})
      .catch((err) => {
        this.user_not_found = true;
        return;
        console.error(err);
      });

    },
    async confirmSearch() {
      const payload = {
        yearmonth: new Date(this.yearmonth),
        organization: this.organFilter,
        notify: this.$vs.notify,
      };
      await this.$store.dispatch("earningManagement/fetchEarings", payload);

      this.datas = [];
      this.rearrangeData("3*9");
      this.rearrangeData("5*4");
    },
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    // this.$_agGrid.addEventListener('cell-value-changed', this.onCellValueChanged);
    // this.$vs.loading();
    // setTimeout(() => {
    //   this.$vs.loading.close();
    // }, 0);

    this.rearrangeData("3*9");
    this.rearrangeData("5*4");
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
