<template>
  <div id="page-user-view">
    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.userId }} not found. </span>
      <span>
        <span>Check </span
        ><router-link :to="{ name: 'Engineer List' }" class="text-inherit underline"
          >All Users</router-link
        >
      </span>
    </vs-alert>

    <div  class="vx-row" v-if="user_data">
      <div class="vx-col w-full xl:w-1/3 md:w-full mb-base">
        <vx-card title="Account" class="mb-base" style="height: 847px;" >
          <!-- Avatar -->
          <div class="vx-row">
            <!-- Avatar Col -->
            <div class="vx-col border" id="avatar-col">
              <div class="img-container mb-4">
                <img
                  :src="
                    user_data.avatar
                      ? user_data.avatar
                      : require('@/assets/images/avatar.png')
                  "
                  class="rounded border w-full"
                />
              </div>
              
            </div>

            <!-- Information - Col 1 -->
            <div class="vx-col  w-full xl:w-2/3 md:w-full mb-base" id="account-info-col-4">
              <table>
                <tr>
                  <td class="font-semibold">Name</td>
                  <td>{{ user_data.name }}</td>
                </tr>                
                <tr>
                  <td class="font-semibold">Role</td>
                  <td>{{ user_data.role }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Statue</td>                   
                    <td> 
                      <vs-chip :color = "user_data.status? 'success' : 'warning'">
                        {{ user_data.status ? "Approved" : "Pending" }}
                      </vs-chip>
                    </td>                  
                </tr>
                <tr>
                  <td class="font-semibold">Company</td>
                  <td>{{ user_data.organization }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Team</td>
                  <td>{{ user_data.team }} Group</td>
                </tr>
                <tr>
                  <td class="font-semibold">Gender</td>
                  <td>{{ user_data.gender }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Birth Date</td>
                    <td>{{ user_data.dob.split('-')[0] + '-' + user_data.dob.split('-')[1] + '-' + user_data.dob.split('-')[2][0] + user_data.dob.split('-')[2][1] }}</td>
                </tr>
                <tr>
                  <td class="font-semibold"> Current Address</td>
                    <td>{{ user_data.current_address }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Universty</td>
                  <td>{{ user_data.university }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Old Job</td>
                  <td>{{ user_data.old_job }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Enter Date</td>
                  <td>{{  user_data.enter_date.split('-')[0] + '-' + user_data.enter_date.split('-')[1] + '-' + user_data.enter_date.split('-')[2][0] + user_data.enter_date.split('-')[2][1]}}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Main Skill</td>
                  <td>{{ user_data.main_skill }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Dev Years</td>
                  <td>{{ this.today.getFullYear() - user_data.enter_date.split('-')[0]}} year</td>
                </tr>
                
                <tr>
                  <td class="font-semibold">Technical Level</td>
                  <td>{{ user_data.tech_field }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Major Subject</td>
                  <td>{{ user_data.major_subject }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">Language</td>                    
                    <td>                   
                      
                      <div v-for="(requiredSkill, index) in user_data.lang_level">
                        <vs-chip :color="getSkillColor(requiredSkill)">
                          {{ requiredSkill }}
                        </vs-chip>
                      </div>
                    </td>                                   

                </tr>
                <tr>
                  <td class="font-semibold">Tec Level</td>
                  <td><star-rating :rtl="$vs.rtl" :inline="true" :star-size="20" :read-only="true" :show-rating="false" :rating="5"></star-rating></td>
                </tr>
                <tr>
                  <td class="font-semibold">Special</td>
                  <td>{{ user_data.special }}</td>
                </tr>
              </table>            
            </div>
            <div class="vx-row">
              <div class="vx-col w-full xl:w-1/3 md:w-full mb-base" > 
                  <span></span>
                </div> 
               <div class="vx-col w-full xl:w-2/3 md:w-full mb-base" > 
                  <div class="flex">        
                    <vs-button
                      icon-pack="feather"
                      icon="icon-edit"
                      class="mr-1"
                      :to="{ name: 'engineer-edit', params: { userId: $route.params.userId } }"
                      >Edit</vs-button
                    >
                    <vs-button
                      type="border"
                      color="danger"
                      icon-pack="feather"
                      icon="icon-trash"
                      class="mr-1"
                      @click="confirmDeleteRecord"
                      >Delete</vs-button
                    >
                    <vs-button
                      type="border"
                      v-if="user_data.status == true"
                      color="warning"
                      icon-pack="feather"
                      icon="icon-user-x"
                      @click="confirmRejectRecord"
                      >{{user_data.status == true ? 'Reject' : 'Approve'}}</vs-button
                    >
                    <vs-button
                      type="border"
                      v-else
                      color='success'
                      icon-pack="feather"
                      icon="icon-user-check"
                      @click="confirmApproveRecord"
                      >{{user_data.status == true ? 'Reject' : 'Approve'}}</vs-button
                    >
                  </div>
                </div> 
            </div>
          </div>
        </vx-card>
      </div> 
      <div class="vx-col w-full xl:w-2/3 md:w-full mb-base">
        <div  class="vx-row">         
          <div class="vx-col  mb-base xl: w-1/3">
            <vx-card title="Current Income" style = "height:367px;" >
              <template slot="actions" >
                <feather-icon icon="CalendarIcon" svgClasses="h-5 w-5"></feather-icon>
                <span class="text-xl font-light">&nbsp;{{new Date().getFullYear()  }}.{{new Date().getMonth()+1 }}.{{new Date().getDate()  }}</span>
                <p class="text-xl font-light">&nbsp;{{ daysOfWeek[indexOfWeek]  }}</p>						
              </template>
              <div class="vx-row">
                <div class="vx-col xl:w-full mb-base">							
                  <div class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-col-reverse lg:flex-row">						
                    <div class="vx-col w-full md:w-full sm:w-full lg:w-full xl:w-full flex flex-col justify-between" v-if="weekIncomeData.todayIncome">
                      <div>
                        <div class="flex"  style="align-items: center;">
                          <p class="text-4xl font-bold">$&nbsp;{{ this.maximumEngineer.currentIncome }}</p>	  
                          <p class="text-2xl">{{ this.maximumEngineer.engineerRanking }} <span>&nbsp;/&nbsp;</span>{{ this.maximumEngineer.wholeEngineers }}</p>	   
                        </div>                                          
                        <p class="mt-10 font-medium" >
                          <span :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'">
                            <span>$300USD</span>
                          </span>
                          <feather-icon class="ml-2 mr-2" :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'" :icon="weekIncomeData.comparisonLastMonth.result >= 0 ? 'TrendingUpIcon' : 'TrendingDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                          <span class="font-light ">{{ weekIncomeData.comparisonLastMonth.str.toLocaleString() }}&nbsp;&nbsp; Last Month&nbsp;</span>                          
                        </p>
                        <!-- <p class="mt-2 font-medium" >
                          <span :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'">
                            <span>{{ weekIncomeData.comparisonLastMonth.result.toLocaleString() }}USD</span>
                          </span>
                          <feather-icon class="ml-2 mr-2" :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'" :icon="weekIncomeData.comparisonLastMonth.result >= 0 ? 'TrendingUpIcon' : 'TrendingDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                          <span class="font-light ">{{ weekIncomeData.comparisonLastMonth.str.toLocaleString() }}&nbsp;&nbsp;{{new Date().getDate()  }}th of Last Month&nbsp;</span>                          
                        </p>
                        <p class="mt-2 font-medium" >
                          <span :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'">
                            <span>{{ weekIncomeData.comparisonLastMonth.result.toLocaleString() }}USD</span>
                          </span>
                          <feather-icon class="ml-2 mr-2" :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'" :icon="weekIncomeData.comparisonLastMonth.result >= 0 ? 'TrendingUpIcon' : 'TrendingDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                          <span class="font-light ">{{ weekIncomeData.comparisonLastMonth.str.toLocaleString() }}&nbsp;&nbsp;{{new Date().getDate()  }}th of Last Month&nbsp;</span>                          
                        </p> -->

                      </div>						
                    </div>
                  </div>
                  <vs-divider class="my-4"></vs-divider>
                  <div class="vx-row" v-if="weekIncomeData.expectedIncome">
                    <div class="vx-col w-full mb-6" >
                      <p >Average Income: $&nbsp;{{  this.maximumEngineer.maximumIncome  }}
                        <span class="float-right font-bold" :class="(weekIncomeData.todayIncome/weekIncomeData.expectedIncome)*100 >= 100 ? 'text-success' : 'text-primary'">						
                          
                        </span>								
                      </p>	                     
                    </div>
                  </div>
                </div>               
              </div>
            </vx-card>           
          </div>
          <div class="vx-col  mb-base xl: w-2/3">
            <vx-card title="Whole Income" style = "height:367px">
              <template slot="actions">
                <flat-pickr v-model="date" />				
              </template>              
              <vue-apex-charts type="line" height="260" :options="chartOptions" :series="series"></vue-apex-charts>
            </vx-card>           
          </div> 
          
        </div>   
        <div class="vx-row">
            <div class="vx-col  mb-base custom_class">
              <vx-card title="Analysis of income" class="mb-base" >
                <vue-apex-charts type="bar" height="350" :options="analyticsData.analysisIncome.chartOptions" :series="analyticsData.analysisIncome.series"></vue-apex-charts>  
              </vx-card>
            </div> 
            <div class="vx-col mb-base custom_class">
              <vx-card title="Ranking monthly" class="mb-base" >
                <vue-apex-charts type="line" height="350" :options="analyticsData.rankingMonthly.chartOptions" :series="analyticsData.rankingMonthly.series"></vue-apex-charts>
              </vx-card>
            </div>
          </div> 
        </div>      
         
      </div>
    </div>    
  </div>
</template>

<script>
import moduleUserManagement from "@/store/user-management/moduleUserManagement.js";
import analyticsData from './analyticsData.js'
import VueApexCharts from 'vue-apexcharts'
import ApexChart from 'apexcharts'
import StarRating from 'vue-star-rating'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  components: {
    VueApexCharts,
    ApexChart,
    StarRating,
    flatPickr
  },

  data() {
    return {
      date: null,
      
      user_data: null,      
      user_not_found: false,
      currentExpectedIncome: {},
      analyticsData,
      maximumIncome: {},
      requiredSkill: {},
      indexOfWeek:null,
      daysOfWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      langColors: ['success', 'primary', 'danger', 'warning'],

      series: [{
              name: "Income",
              data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
          }],
          chartOptions: {
            chart: {
              height: 350,
              type: 'line',
              zoom: {
                enabled: false
              },
              toolbar: {
                show: false
              }
            },
            dataLabels: {
              enabled: true
            },
            stroke: {
              curve: 'straight'
            },
            
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
          },
    };
  },
  
  computed: {
    userAddress() {
      let str = "";
      for (const field in this.user_data.location) {
        str += `${field} `;
      }
      return str;
    },
  },
  methods: {
    
    confirmDeleteRecord() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: "Confirm Delete",
        text: `You are about to delete "${this.user_data.name}"`,
        accept: this.deleteRecord,
        acceptText: "Delete",
      });
    },
    confirmRejectRecord() {
      this.$store
        .dispatch("userManagement/rejectRecord", this.user_data.userID)
        .then((res) => {
          // this.$router.push({name : 'Refresh Router'});
          this.user_data.status = false
          // this.$router.push('/engineer/list');
        });
    },
    confirmApproveRecord() {
      this.$store
        .dispatch("userManagement/approveRecord", this.user_data.userID)
        .then((res) => {
          // this.$router.push({name : 'Refresh Router'});
          this.user_data.status = true
        });
    },
    deleteRecord() {
      /* Below two lines are just for demo purpose */
      // this.$router.push({ name: "Engineer List" })
      // this.showDeleteSuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      this.$store
        .dispatch("userManagement/removeRecord", this.user_data.userID)
        .then((res) => {
          console.log(res)
          this.$router.push({ name: "Engineer List" });
          this.showDeleteSuccess();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    showDeleteSuccess() {
      this.$vs.notify({
        color: "success",
        title: "User Deleted",
        text: "The selected user was successfully deleted",
      });
    },
    getSkillColor (requiredSkills) {
      const colors = {        
        'english': 'success',
        'russian': 'warning'    
      }
      return colors[requiredSkills] || 'primary'
    },
  },
  created() {
    // Register Module UserManagement Module
    if (!moduleUserManagement.isRegistered) {
      this.$store.registerModule("userManagement", moduleUserManagement);
      moduleUserManagement.isRegistered = true;
    }

    this.today = new Date();
   
    console.log("data", this.user_data);
    
    //const today = new Date();
    //this.dev_year = today.getFullYear() - this.user_data.enter_date;
   // console.log(this.user_data.enter_date.split('-')[0]);
    this.$http.get('/api/card/card-dashboard/week-income')
		.then((response) => {			
			this.weekIncomeData  = response.data 			
		})		
		.catch((error) => { console.log(error) })


    this.$http.get('/api/card/card-engineer/engineerdate')
		.then((response) => {			
			this.maximumEngineer  = response.data 
      console.log(this.maximumEngineer.maximumIncome)			
		})		
		.catch((error) => { console.log(error) })
    

    analyticsData.weekIncomeDataChart['colors'][6]='rgba(255,9,109,1)';

    const userId = this.$route.params.userId;
    
    

    this.$store
      .dispatch("userManagement/fetchUser", userId)
      .then((res) => {
        this.user_data = res.data.existUser;
        console.log(this.user_data)
        console.log(this.user_data.enter_date.split('-')[2][0]);
      })
      .catch((err) => {
        if (err.response.status > 400) {
          this.user_not_found = true;
          return;
        }
        console.error(err);
      });
  },
  beforeCreate() {
    if (!this.$store.state.auth.isUserLoggedIn()) this.$router.push("/login");
    
    //  User Reward Card
  },
};
</script>

<style lang="scss" scoped>
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

.mt-6 {
    margin-top: 0rem !important;
}
.vx-row {
    
    justify-content: space-evenly;
    /* justify-content: space-between; */
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }
.flex {   
    justify-content: space-around;
}
.custom_class {
    width: 50%;
}

.vx-card .vx-card__header {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: baseline;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}

@media  (min-width: 1201px) and (max-width: 1600px) {
  .custom_class{
    width: 100%;
}
}
@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
