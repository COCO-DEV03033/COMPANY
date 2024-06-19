<!-- =========================================================================================
    File Name: CarouselResponsiveBreakpoints.vue
    Description: Carousel with responsive breakpoints
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div content-color="#fff" class="carousel-example d-none mt-6">
          <!-- swiper -->
          <swiper :options="swiperOption" :dir="$vs.rtl ? 'rtl' : 'ltr'" :key="$vs.rtl">
            <swiper-slide>
              <vx-card>
                <template slot="no-body" >
                  <div class="p-8 clearfix" v-if="weekIncomeData_Company.todayIncome_Company">                      
                      <div class="vx-row" style="height: 52px;">
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base">
                          <h3>
                          514
                          </h3>
                          <small>                            
                            <span class="text-xl font-bold">$&nbsp;{{ weekIncomeData_Company.todayIncome_Company.todayIncome_514}}</span>
                          </small>	
                        </div>
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base" >
                          <div class="con-vs-avatar null con-vs-avatar-success" style="left: 75%;">
                            <span translate="no" class="vs-avatar--text notranslate feather icon-zap material-icons" style="transform: translate(-50%, -50%) scale(1); color: rgb(255, 255, 255);">
                            </span>
                          </div>	
                        </div>                       
                      </div>  
                      <p class="mt-2 font-medium">
                        <span :class="weekIncomeData_Company.comparisonYesterday_Company.result_514 >= 0 ? 'text-primary' : 'text-danger'">
                          <span v-if="weekIncomeData_Company.comparisonYesterday_Company.result_514 > 0">+</span>
                          <span >{{ weekIncomeData_Company.comparisonYesterday_Company.result_514 }}%</span>
                        </span>
                        <span> &nbsp; </span>
                        <span>than yesterday</span>                     
                      </p>      
                      <p class="mt-2 font-medium" >
                        <feather-icon class="ml-2 mr-2" :class="weekIncomeData_Company.comparisonLastMonth_Company.result_514 >= 0 ? 'text-primary' : 'text-danger'" :icon="weekIncomeData_Company.comparisonLastMonth_Company.result_514 >= 0 ? 'ChevronUpIcon' : 'ChevronDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_514 >= 0 ? 'text-primary' : 'text-danger'">$</span>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_514 >= 0 ? 'text-primary' : 'text-danger'">
												<span>{{ weekIncomeData_Company.comparisonLastMonth_Company.result_514.toLocaleString() }}</span>
											</span>
											<span class="font-light ">&nbsp;than&nbsp;&nbsp;{{new Date().getDate()  }}th of Last&nbsp;</span>
										</p>                    
                      <div class="flex justify-between"><small class="font-semibold"></small><small class="text-grey">$ {{weekIncomeData_Company.expectedIncome_Company.expectedIncome_514}}</small></div>                                                     
                      <vs-progress  :height="8" class="block mt-1" :percent= "(weekIncomeData_Company.todayIncome_Company.todayIncome_514 / weekIncomeData_Company.expectedIncome_Company.expectedIncome_514)*100" color="success"></vs-progress>                    						
                  </div>                    
                </template>
              </vx-card>
            </swiper-slide>
            <swiper-slide>
              <vx-card>
                <template slot="no-body" >
                  <div class="p-8 clearfix" v-if="weekIncomeData_Company.todayIncome_Company">
                      <div class="vx-row" style="height: 52px;">
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base">
                          <h3>
                          329
                          </h3>
                          <small>                            
                            <span class="text-xl font-bold">$&nbsp;{{ weekIncomeData_Company.todayIncome_Company.todayIncome_329}}</span>
                          </small>	
                        </div>
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base" >
                          <div class="con-vs-avatar null con-vs-avatar-primary" style="left: 75%">
                            <span translate="no" class="vs-avatar--text notranslate feather icon-twitter material-icons" style="transform: translate(-50%, -50%) scale(1); color: rgb(255, 255, 255);">
                            </span>
                          </div>	
                        </div>                       
                      </div>                     
                      <p class="mt-2 font-medium">
                        <span :class="weekIncomeData_Company.comparisonYesterday_Company.result_329 >= 0 ? 'text-primary' : 'text-danger'">
                          <span v-if="weekIncomeData_Company.comparisonYesterday_Company.result_329 > 0">+</span>
                          <span >{{ weekIncomeData_Company.comparisonYesterday_Company.result_329 }}%</span>
                        </span>
                        <span> &nbsp; </span>
                        <span>than yesterday</span>                     
                      </p>      
                      <p class="mt-2 font-medium" >
                        <feather-icon class="ml-2 mr-2" :class="weekIncomeData_Company.comparisonLastMonth_Company.result_329 >= 0 ? 'text-primary' : 'text-danger'" :icon="weekIncomeData_Company.comparisonLastMonth_Company.result_329 >= 0 ? 'ChevronUpIcon' : 'ChevronDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_329 >= 0 ? 'text-primary' : 'text-danger'">$</span>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_329 >= 0 ? 'text-primary' : 'text-danger'">
                        <span>{{ weekIncomeData_Company.comparisonLastMonth_Company.result_329.toLocaleString() }}</span>
                      </span>
                      <span class="font-light ">&nbsp;than&nbsp;&nbsp;{{new Date().getDate()  }}th of Last&nbsp;</span>
                    </p>                                   
                    <div class="flex justify-between"><small class="font-semibold"></small><small class="text-grey">$ {{weekIncomeData_Company.expectedIncome_Company.expectedIncome_329}}</small></div>                                                     
                    <vs-progress  :height="8" class="block mt-1" :percent= "(weekIncomeData_Company.todayIncome_Company.todayIncome_329 / weekIncomeData_Company.expectedIncome_Company.expectedIncome_329)*100" color="#8075F1"></vs-progress>
                  </div>                      
                </template>
              </vx-card>
            </swiper-slide>
            <swiper-slide> 
              <vx-card>
                <template slot="no-body" >
                  <div class="p-8 clearfix" v-if="weekIncomeData_Company.todayIncome_Company">
                      <div class="vx-row" style="height: 52px;">
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base">
                          <h3>
                          812
                          </h3>
                          <small>                            
                            <span class="text-xl font-bold">$&nbsp;{{ weekIncomeData_Company.todayIncome_Company.todayIncome_812}}</span>
                          </small>	
                        </div>
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base" >
                          <div class="con-vs-avatar null con-vs-avatar-danger" style="left: 75%;">
                            <span translate="no" class="vs-avatar--text notranslate feather icon-slack material-icons" style="transform: translate(-50%, -50%) scale(1); color: rgb(255, 255, 255);">
                            </span>
                          </div>	
                        </div>                       
                      </div>                       
                      <p class="mt-2 font-medium">
                        <span :class="weekIncomeData_Company.comparisonYesterday_Company.result_812 >= 0 ? 'text-primary' : 'text-danger'">
                          <span v-if="weekIncomeData_Company.comparisonYesterday_Company.result_812 > 0">+</span>
                          <span >{{ weekIncomeData_Company.comparisonYesterday_Company.result_812 }}%</span>
                        </span>
                        <span> &nbsp; </span>
                        <span>than yesterday</span>                     
                      </p>      
                      <p class="mt-2 font-medium" >
                        <feather-icon class="ml-2 mr-2" :class="weekIncomeData_Company.comparisonLastMonth_Company.result_812 >= 0 ? 'text-primary' : 'text-danger'" :icon="weekIncomeData_Company.comparisonLastMonth_Company.result_812 >= 0 ? 'ChevronUpIcon' : 'ChevronDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_812 >= 0 ? 'text-primary' : 'text-danger'">$</span>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_812 >= 0 ? 'text-primary' : 'text-danger'">
												<span>{{ weekIncomeData_Company.comparisonLastMonth_Company.result_812.toLocaleString() }}</span>
											</span>
											<span class="font-light ">&nbsp;than&nbsp;&nbsp;{{new Date().getDate()  }}th of Last&nbsp;</span>
										</p>                                   
                    <div class="flex justify-between"><small class="font-semibold"></small><small class="text-grey">$ {{weekIncomeData_Company.expectedIncome_Company.expectedIncome_812}}</small></div>                                                     
                    <vs-progress  :height="8" class="block mt-1" :percent= "(weekIncomeData_Company.todayIncome_Company.todayIncome_812 / weekIncomeData_Company.expectedIncome_Company.expectedIncome_812)*100" color="danger"></vs-progress>
                  </div>                      
                </template>
              </vx-card>          
            </swiper-slide>
            <swiper-slide>
              <vx-card>
                <template slot="no-body" >
                  <div class="p-8 clearfix" v-if="weekIncomeData_Company.todayIncome_Company">
                    <div class="vx-row" style="height: 52px;">
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base">
                          <h3>
                          AI
                          </h3>
                          <small>                            
                            <span class="text-xl font-bold">$&nbsp;{{ weekIncomeData_Company.todayIncome_Company.todayIncome_AI}}</span>
                          </small>	
                        </div>
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base" >
                          <div class="con-vs-avatar null con-vs-avatar-warning" style="left: 75%;">
                            <span translate="no" class="vs-avatar--text notranslate feather icon-globe material-icons" style="transform: translate(-50%, -50%) scale(1); color: rgb(255, 255, 255);">
                            </span>
                          </div>	
                        </div>                       
                      </div> 
                      <p class="mt-2 font-medium">
                        <span :class="weekIncomeData_Company.comparisonYesterday_Company.result_AI >= 0 ? 'text-primary' : 'text-danger'">
                          <span v-if="weekIncomeData_Company.comparisonYesterday_Company.result_AI > 0">+</span>
                          <span >{{ weekIncomeData_Company.comparisonYesterday_Company.result_AI }}%</span>
                        </span>
                        <span> &nbsp; </span>
                        <span>than yesterday</span>                     
                      </p>      
                      <p class="mt-2 font-medium" >
                        <feather-icon class="ml-2 mr-2" :class="weekIncomeData_Company.comparisonLastMonth_Company.result_AI >= 0 ? 'text-primary' : 'text-danger'" :icon="weekIncomeData_Company.comparisonLastMonth_Company.result_AI >= 0 ? 'ChevronUpIcon' : 'ChevronDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_AI >= 0 ? 'text-primary' : 'text-danger'">$</span>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_AI >= 0 ? 'text-primary' : 'text-danger'">
												<span>{{ weekIncomeData_Company.comparisonLastMonth_Company.result_AI.toLocaleString() }}</span>
											</span>
											<span class="font-light ">&nbsp;than&nbsp;&nbsp;{{new Date().getDate()  }}th of Last&nbsp;</span>
										</p>                                   
                    <div class="flex justify-between"><small class="font-semibold"></small><small class="text-grey">$ {{weekIncomeData_Company.expectedIncome_Company.expectedIncome_AI}}</small></div>                                                     
                    <vs-progress  :height="8" class="block mt-1" :percent= "(weekIncomeData_Company.todayIncome_Company.todayIncome_AI / weekIncomeData_Company.expectedIncome_Company.expectedIncome_AI)*100" color="warning"></vs-progress>                      						
                  </div>                      
                </template>
              </vx-card>
              
            </swiper-slide>
            <swiper-slide> 
              <vx-card>
                <template slot="no-body" >
                  <div class="p-8 clearfix" v-if="weekIncomeData_Company.todayIncome_Company">
                      <div class="vx-row" style="height: 52px;">
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base">
                          <h3>
                          CT
                          </h3>
                          <small>                            
                            <span class="text-xl font-bold">$&nbsp;{{ weekIncomeData_Company.todayIncome_Company.todayIncome_CT}}</span>
                          </small>	
                        </div>
                        <div class="vx-col w-full xl:w-1/2 md:w-full mb-base" >
                          <div class="con-vs-avatar null con-vs-avatar-dark" style="left: 75%;">
                            <span translate="no" class="vs-avatar--text notranslate feather icon-cpu material-icons" style="transform: translate(-50%, -50%) scale(1); color: rgb(255, 255, 255);">
                            </span>
                          </div>	
                        </div>                       
                      </div> 
                      <p class="mt-2 font-medium">
                        <span :class="weekIncomeData_Company.comparisonYesterday_Company.result_CT >= 0 ? 'text-primary' : 'text-danger'">
                          <span v-if="weekIncomeData_Company.comparisonYesterday_Company.result_CT > 0">+</span>
                          <span >{{ weekIncomeData_Company.comparisonYesterday_Company.result_CT }}%</span>
                        </span>
                        <span> &nbsp; </span>
                        <span>than yesterday</span>                     
                      </p>      
                      <p class="mt-2 font-medium" >
                        <feather-icon class="ml-2 mr-2" :class="weekIncomeData_Company.comparisonLastMonth_Company.result_CT >= 0 ? 'text-primary' : 'text-danger'" :icon="weekIncomeData_Company.comparisonLastMonth_Company.result_CT >= 0 ? 'ChevronUpIcon' : 'ChevronDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_CT >= 0 ? 'text-primary' : 'text-danger'">$</span>
                        <span :class="weekIncomeData_Company.comparisonLastMonth_Company.result_CT >= 0 ? 'text-primary' : 'text-danger'">
												<span>{{ weekIncomeData_Company.comparisonLastMonth_Company.result_CT.toLocaleString() }}</span>
											</span>
											<span class="font-light ">&nbsp;than&nbsp;&nbsp;{{new Date().getDate()  }}th of Last&nbsp;</span>
										</p>                                   
                    <div class="flex justify-between"><small class="font-semibold"></small><small class="text-grey">$ {{weekIncomeData_Company.expectedIncome_Company.expectedIncome_CT}}</small></div>                                                     
                    <vs-progress  :height="8" class="block mt-1" :percent= "(weekIncomeData_Company.todayIncome_Company.todayIncome_CT / weekIncomeData_Company.expectedIncome_Company.expectedIncome_CT)*100" color="dark"></vs-progress>                    						
                  </div>                      
                </template>
              </vx-card> 
              
            </swiper-slide>
                      
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
      </div>
</template>

<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import VueApexCharts from 'vue-apexcharts'
import analyticsData from './carouselanalyticsData'
import ChangeTimeDurationDropdown from '@/components/ChangeTimeDurationDropdown.vue'


export default {
  data () {
    return {
      currentExpectedIncome: {},
      weekIncomeData_Company:{},
      daysOfWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      chartOptions: {      
				grid: {
					show: false,
					padding: {
					left: 0,
					right: 0
					}
				},
				chart: {
					type: 'bar',
					sparkline: { enabled: true },
					
				},
				
				xaxis: {
					labels: {
						style: {
							cssClass: 'text-grey fill-current'
						}
					},				
					categories: ['Mon', 'Tues', 'Wedn', 'Thurs', 'Fri', 'Satur', 'Sun'],
					axisBorder: {
						show:true
					},
					axisTicks: {
						show: true
					},

				},						
				colors: ['rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)'],
				plotOptions: {
					bar: {
					columnWidth: '45%',
					distributed: true,
					endingShape: 'rounded' // Deprecated
					// borderRadius: '20px', // Coming Soon
					}
				},
				yaxis: {
					show: true
				},
				grid: {
					show: true
				},
				legend: { show: false },
				tooltip: {
					x: { show: true }
				}
			},
      funding: {},
      analyticsData,
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 10,
        // init: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: false
        },
        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 3
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 3
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 3
          }
        }
      }
    }
  },
  created(){

      const today = new Date();
      this.indexOfWeek = today.getDay();
      this.chartOptions['colors'][6]='rgba(255,9,109,1)';
          // Funding
       this.$http.get('/api/card/card-analytics/funding')
      .then((response) => { this.funding = response.data })
      .catch((error) => { console.log(error) })

      this.$http.get('/api/card/card-dashboard/week-income')
      .then((response) => {			
        this.weekIncomeData  = response.data 			
      })
      
      this.$http.get('/api/card/card-dashboard/week-income-company')
      .then((response) => {			
        this.weekIncomeData_Company  = response.data 			
      })	

   
  },
  components: {
    swiper,
    swiperSlide,
    VueApexCharts,
    ChangeTimeDurationDropdown
  }
}
</script>

<style lang="css">
#vx-card__body{
  padding: 0px;

}
.border-color-514{
	border-top: 2px solid #28C76F;
}
.border-color-329{
	border-top: 2px solid #7367f0;
}
.border-color-812{
	border-top: 2px solid #F63C3C;
}
.border-color-AI{
	border-top: 2px solid #ff9f43;
}
.border-color-CT{
	border-top: 2px solid #000000;
}
</style>
