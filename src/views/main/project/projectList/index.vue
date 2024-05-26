<template>
    <div id="dashboard-analytics">        
        <!-- CARD 9: DISPATCHED ORDERS -->
        <div class="vx-row"> 
            <div class="vx-col w-full">
              <vx-card >                
                <div slot="no-body" class="mt-5">
                  <vs-table ref="table" pagination :max-items = "itemsPerPage" class="table-dark-inverted mb-4 mr-4" style="padding: 25px;" :data="products">
                    <div v-if="products.length" slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-start">
  
                        <!-- ITEMS PER PAGE -->
                        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                            <div class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-left justify-start font-medium">
                            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ products.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : products.length }} of {{ queriedItems }}</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
                            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                            <vs-dropdown-menu>

                            <vs-dropdown-item @click="itemsPerPage=4">
                                <span>4</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="itemsPerPage=10">
                                <span>10</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="itemsPerPage=15">
                                <span>15</span>
                            </vs-dropdown-item>
                            <vs-dropdown-item @click="itemsPerPage=20">
                                <span>20</span>
                            </vs-dropdown-item>
                            </vs-dropdown-menu>
                        </vs-dropdown>

                        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                            <div class="p-4 border border-solid d-theme-border-grey-light rounded-lg d-theme-dark-bg cursor-pointer flex items-center  font-medium">
                            <span class="mr-2">Organization</span>
                            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
                            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
                            <vs-dropdown-menu>

                              <vs-dropdown-item @click="filterByCompany('All')">
                                  <span>All</span>
                              </vs-dropdown-item>
                              <vs-dropdown-item @click="filterByCompany('339')">
                                  <span>3*9</span>
                              </vs-dropdown-item>
                              <vs-dropdown-item @click="filterByCompany('839')">
                                  <span>8*2</span>
                              </vs-dropdown-item>
                              <vs-dropdown-item @click="filterByCompany('539')">
                                  <span>5*4</span>
                              </vs-dropdown-item>
                              <vs-dropdown-item @click="filterByCompany('AI')">
                                  <span>AI</span>
                              </vs-dropdown-item>
                              <vs-dropdown-item @click="filterByCompany('Control')">
                                  <span>Control</span>
                              </vs-dropdown-item>
                            </vs-dropdown-menu>
                        </vs-dropdown>                               
                    </div>
                    <div slot="header" class="flex flex-wrap-reverse items-right flex-grow justify-end">
                      <vs-input class="p-4 sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery" @input="updateSearchQuery" placeholder="Search..." />
                      <vs-dropdown vs-trigger-click class="cursor-pointer">

                        <div class="p-4 shadow-drop rounded-lg d-theme-dark-light-bg cursor-pointer flex items-end justify-center text-lg font-medium w-32">
                          <span class="mr-2 leading-none">Actions</span>
                          <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                        </div>

                        <vs-dropdown-menu>

                          <vs-dropdown-item>
                            <span class="flex items-center">
                              <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                              <span>Delete</span>
                            </span>
                          </vs-dropdown-item>

                          <vs-dropdown-item>
                            <span class="flex items-center">
                              <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                              <span>Archive</span>
                            </span>
                          </vs-dropdown-item>

                          <vs-dropdown-item>
                            <span class="flex items-center">
                              <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                              <span>Print</span>
                            </span>
                          </vs-dropdown-item>

                          <vs-dropdown-item>
                            <span class="flex items-center">
                              <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                              <span>CSV</span>
                            </span>
                          </vs-dropdown-item>

                        </vs-dropdown-menu>
                      </vs-dropdown>
                    
                    </div>

                    
                    <template slot="thead">
                        <vs-th sort-key="no">No</vs-th>
                        <vs-th sort-key="group">Group</vs-th>
                        <vs-th sort-key="name">Name</vs-th>
                        <vs-th sort-key="name">Company</vs-th>
                        <vs-th sort-key="plan">Plan</vs-th>
                        <vs-th sort-key="current_earning">Earning</vs-th>                    
                        <vs-th sort-key="dev_field">Dev Field</vs-th>
                        <vs-th sort-key="earning_date">Date</vs-th>
                        <vs-th sort-key="price">Price</vs-th>
                        <vs-th sort-key="remark">Note</vs-th>          
                        <vs-th>Action</vs-th>          
                    </template>
      
                    <template slot-scope="{ data }">            
    
                      <vs-tr  class="mt-5" :key="indextr" v-for="(tr, indextr) in data">
    
                        <vs-td>
                        <p class="product-name font-medium truncate">{{ indextr+1 }}</p>
                        </vs-td>
                        <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.group }}</p>
                        </vs-td>                       
    
                        <vs-td>
                          <div class="flex items-center">
                            <vs-avatar :src="tr.avatar" size="40px" class="border-2 border-white border-solid -m-1"></vs-avatar>
                            <p class="product-name font-medium truncate pl-5">{{ tr.name }}</p>
                          </div>
                        </vs-td>
                        <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.company }}</p>
                        </vs-td>
    
                        <vs-td>
                        <p class="product-price">${{ tr.plan }}</p>
                        </vs-td>
    
                        <vs-td>
                        <p class="product-price">${{ tr.earning }}</p>
                        </vs-td>
    
                        <vs-td>
                        <p class="product-category">{{ tr.dev_field | title }}</p>
                        </vs-td>
    
                        <vs-td>
                        <p class="product-name font-medium truncate">{{ tr.earning_date }}-{{ tr.cost }}</p>
                        </vs-td>                       
    
                        <vs-td>
                        <p class="product-price">${{ tr.price }}</p>
                        </vs-td>
    
                        <vs-td>
                        <p class="product-name font-medium truncate">{{tr.remark}}</p>
                        </vs-td>
    
                        <vs-td class="whitespace-no-wrap">
                        <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(tr)" />
                        <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(tr.id)" />
                        </vs-td>
    
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

import moduleProjectManagement from '@/store/project-management/moduleProjectManagement.js'


export default {
  data () {
    return {            
      // products: [],
      itemsPerPage:10,
      isMounted: false,
      searchQuery:'',
      filteredProducts:[]
     
    }
    
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    products () {
      return this.$store.state.projectManagement.projects
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
    }
  },

  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    filterByCompany (companyName) {
    // Filter the products based on the selected company name
      this.filteredProducts = this.products.filter(product => product.company === companyName)
      console.log('filteredProducts=========>')
    }
  },

  components: {
    // VueApexCharts
    
  },
  
  created () {
    
    if (!moduleProjectManagement.isRegistered) {
      this.$store.registerModule('projectManagement', moduleProjectManagement)
      moduleProjectManagement.isRegistered = true
    }
    this.$store.dispatch('projectManagement/fetchProjects').catch(err => { console.error(err) })
  
    // // Dispatched Orders
    // this.$http
    //   .get('/api/data-list/products')
    //   .then((response) => {
    //     this.product = response.data
    //     console.log('response=============>', response)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })      
  },

  
  mounted () {
    this.isMounted = true
  }
}
</script>

<style scoped>
thead.vs-table--thead th {
    background-color: antiquewhite;
    /* font-size: medium; */
}

.vs-table--tbody-table tr {    
    border-bottom: 1pt solid #dfddd9;
}
</style>
