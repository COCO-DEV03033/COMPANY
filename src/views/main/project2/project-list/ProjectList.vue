<!-- =========================================================================================
  File Name: ProjectList.vue
  Description: Project List page
========================================================================================== -->

<template>

  <div id="page-user-list">
    <div class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ projectsData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : projectsData.length }} of {{ projectsData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>            
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- SEARCH & EXPORT AS CSV -->
          <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
          <vs-button class="mb-4 md:mb-0" @click="gridApi.exportDataAsCsv()">Export as CSV</vs-button>
          
      </div>


      <!-- AgGrid Table -->
      <ag-grid-vue style="width: 100%;"
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        gridOption.suppressCellSelection = "true,"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="projectsData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"        
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage" />

    </div>
  </div>

</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import { EyeIcon } from 'vue-feather-icons'
import vSelect from 'vue-select'
import moduleProjectManagement from '@/store/project-management/moduleProjectManagement.js'
import CellRendererLink from './cell-renderer/CellRendererLink.vue'
import CellRendererStatus from './cell-renderer/CellRendererStatus.vue'
import CellRendererVerified from './cell-renderer/CellRendererVerified.vue'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'


export default {
  components: {
    AgGridVue,
    vSelect,
    EyeIcon,

    // Cell Renderer
    CellRendererLink,
    CellRendererStatus,
    CellRendererVerified,
    CellRendererActions
  },
  data () {
    return {     

      searchQuery: '',

      // AgGrid
      gridApi: null,
      gridOptions: {
        suppressCellSelection: true  
      },
      
      defaultColDef: {
        sortable: true,
        resizable: true,
        suppressMenu: true
        
      },

      
      columnDefs: [
        {
          headerName: 'No',
          field: 'no',
          width: 80,
          filter: true,
          checkboxSelection: false,
          headerCheckboxSelection: false,
          valueGetter: 'node.rowIndex + 1'
        },
        {
          headerName: 'Name',
          field: 'name',
          filter: true,
          width: 200,
          cellRendererFramework: 'CellRendererLink'
        },
        {
          headerName: 'Group',
          field: 'team',
          filter: true,
          width: 100
        },
        
        {
          headerName: 'Company',
          field: 'company',
          filter: true,
          width: 150
        },
        {
          headerName: 'Plan',
          field: 'plan',
          filter: true,
          width: 100
        },
        {
          headerName: 'Current Income',
          field: 'income',
          filter: true,
          width: 180
        },
        
        // {
        //   headerName: 'Project Status',
        //   children: [
        //     { headerName: 'Dev Field', field: 'devField', filter: true, flex: 1, minWidth: 250, maxWidth: 300 },
        //     { headerName: 'Earnings', field: 'earnings', filter: true, minWidth: 250, maxWidth: 300, flex:2 }
        //   ]
        // },        
        
        {
          headerName: 'Dev Field',
          field: 'devField',
          filter: true,
          width: 150
        },
        {
          headerName: 'Payment Dates and Income ',
          field: 'earnings',
          filter: true,
          width: 200
        },
        {
          headerName: 'Expected Incom',
          field: 'expectedIncome',
          filter: true,
          width: 180
        },
        {
          headerName: 'Actions',
          field: 'transactions',
          width: 130,
          cellRendererFramework: 'CellRendererActions'
        }
      ],

      // Cell Renderer Components
      components: {
        CellRendererLink,
        CellRendererStatus,
        CellRendererVerified,
        CellRendererActions
      }
    }
  },
  watch: {
    
  },
  computed: {
    projectsData () {
      return this.$store.state.projectManagement.projects
    },
    paginationPageSize () {
      if (this.gridApi) return this.gridApi.paginationGetPageSize()
      else return 10
    },
    totalPages () {
      if (this.gridApi) return this.gridApi.paginationGetTotalPages()
      else return 0
    },
    currentPage: {
      get () {
        if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
        else return 1
      },
      set (val) {
        this.gridApi.paginationGoToPage(val - 1)
      }
    }
  },
  methods: {
    setColumnFilter (column, val) {
      const filter = this.gridApi.getFilterInstance(column)
      let modelObj = null

      if (val !== 'all') {
        modelObj = { type: 'equals', filter: val }
      }

      filter.setModel(modelObj)
      this.gridApi.onFilterChanged()
    },
    resetColFilters () {
      // Reset Grid Filter
      this.gridApi.setFilterModel(null)
      this.gridApi.onFilterChanged()

      // Reset Filter Options
      this.roleFilter = this.statusFilter = this.isVerifiedFilter = this.departmentFilter = { label: 'All', value: 'all' }

      this.$refs.filterCard.removeRefreshAnimation()
    },
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    }
  },
  mounted () {
    this.gridApi = this.gridOptions.api

    if (this.$vs.rtl) {
      const header = this.$refs.agGridTable.$el.querySelector('.ag-header-container')
      header.style.left = `-${  String(Number(header.style.transform.slice(11, -3)) + 9)  }px`
    }
  },
  created () {
    if (!moduleProjectManagement.isRegistered) {
      this.$store.registerModule('projectManagement', moduleProjectManagement)
      moduleProjectManagement.isRegistered = true
    }
    this.$store.dispatch('projectManagement/fetchProjects').catch(err => { console.error(err) })
  }
}

</script>

<style lang="scss" scoped>
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}

.ag-header-cell {
  border: 1px solid #d3d3d3;
}

.ag-cell-focus, .ag-cell-no-focus {
  border: none !important;
}

.no-border.ag-cell:focus {
  border: none !important;
  outline: none;
}

</style>
