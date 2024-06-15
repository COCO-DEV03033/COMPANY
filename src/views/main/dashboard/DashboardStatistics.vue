<template>
	<div id="dashboard-statistics">
		<!--First raw related to firm's income-->
		<div class="vx-row">
			<div class="vx-col w-full xl:w-2/5 md:w-full mb-base">											
				<vx-card title="Today's Income" style = "height:307px">
					<template slot="actions">
						<feather-icon icon="CalendarIcon" svgClasses="h-5 w-5"></feather-icon>
						<span class="text-xl font-light">&nbsp;{{new Date().getFullYear()  }}.{{new Date().getMonth()+1 }}.{{new Date().getDate()  }}</span>
						<p class="text-xl font-light">&nbsp;{{ daysOfWeek[indexOfWeek]  }}</p>	
						
					</template>
					<div class="vx-row">
						<div class="vx-col w-full md:w-1/2 mb-base">							
							<div class="vx-row flex-col-reverse md:flex-col-reverse sm:flex-col-reverse lg:flex-row">						
								<div class="vx-col w-full md:w-full sm:w-full lg:w-full xl:w-full flex flex-col justify-between" v-if="weekIncomeData.todayIncome">
									<div>
										<p class="text-4xl font-bold">$&nbsp;{{ weekIncomeData.todayIncome.toLocaleString() }}</p>							
										<!-- Previous Data Comparison -->
										<p class="mt-2 font-medium" >
											<span :class="weekIncomeData.comparisonYesterday.result >= 0 ? 'text-success' : 'text-danger'">
												<span v-if="weekIncomeData.comparisonYesterday.result > 0">+</span>
												<span >{{ weekIncomeData.comparisonYesterday.result }}$</span>
											</span>
											<span> &nbsp; </span>
											<span>{{ weekIncomeData.comparisonYesterday.str }}</span>
										</p>
										<p class="mt-10 font-medium" >
											<span :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'">
												<span>{{ weekIncomeData.comparisonLastMonth.result.toLocaleString() }}USD</span>
											</span>
											<feather-icon class="ml-2 mr-2" :class="weekIncomeData.comparisonLastMonth.result >= 0 ? 'text-success' : 'text-danger'" :icon="weekIncomeData.comparisonLastMonth.result >= 0 ? 'TrendingUpIcon' : 'TrendingDownIcon'"  svgClasses="h-5 w-5"></feather-icon>
											<span class="font-light ">{{ weekIncomeData.comparisonLastMonth.str.toLocaleString() }}&nbsp;&nbsp;{{new Date().getDate()  }}th of Last Month&nbsp;</span>
										</p>

									</div>						
								</div>
							</div>
							<vs-divider class="my-4"></vs-divider>
							<div class="vx-row" v-if="weekIncomeData.expectedIncome">
								<div class="vx-col w-full mb-6" >
									<p >Expected Income: $&nbsp;{{ weekIncomeData.expectedIncome.toLocaleString() }}
										<span class="float-right font-bold" :class="(weekIncomeData.todayIncome/weekIncomeData.expectedIncome)*100 >= 100 ? 'text-success' : 'text-primary'">									
											{{parseInt((weekIncomeData.todayIncome/weekIncomeData.expectedIncome)*100)}} %
										</span>								
									</p>						
									<vs-progress  :height="10" class="block mt-1" :percent= "(weekIncomeData.todayIncome/weekIncomeData.expectedIncome)*100" color="primary"></vs-progress>
								</div>
							</div>
						</div>
						<div class="vx-col w-full md:w-1/2 mb-base">											
							<div class="vx-card__body pt-7">								
								<vue-apex-charts
									type="bar"
									height = "190px"
									:options="analyticsData.weekIncomeDataChart"
									:series="weekIncomeData.series"
									v-if="weekIncomeData.series" />
							</div>
						</div>
				</div>
				</vx-card>			
			</div>		
			<div class="vx-col w-full xl:w-1/5 md:w-full mb-base">	
				<vx-card title="Income till now" >                
                    <!-- CHART -->                    
                        <div class="vx-card_body"  v-if="currentExpectedIncome">
                            <vue-apex-charts 
							type="radialBar"
							height="287" 
							:options="analyticsData.semiRadialChart.chartOptions" 
							:series="[(((currentExpectedIncome.completed)*100/currentExpectedIncome.expected).toFixed(2))]"/>
                        </div>
						<div class="flex justify-between text-center mt-6" slot="no-body-bottom" v-if="currentExpectedIncome">
							<div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
								<p class="mt-4 font-lignt">Income</p>
								<p class="mb-4 text-xl font-light">$&nbsp;{{currentExpectedIncome.completed}}</p>
							</div>
							<div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
								<p class="mt-4 font-lignt">Plan</p>
								<p class="mb-4 text-xl font-light">$&nbsp;{{currentExpectedIncome.expected}}</p>
							</div>
						</div>                
                </vx-card>				
			</div> 	
			<div class="vx-col w-full xl:w-2/5 md:w-full mb-base" style="height:300px;">					
				<carousel-responsive-breakpoints   />						
			</div>								
		</div>
		<!--Second raw related to firm's income-->
		<div class="vx-row" style="height:433px;">			
			<div class="vx-col w-full xl:w-3/5 md:w-3/5 mb-base" v-if="monthlyIncomeTrends">				
				<vx-card title="Daily Income Trends" class="mb-base">      
					<vs-tabs :color="colorx">
						<vs-tab  label="729" icon-pack="feather" icon="icon-home">
						<vue-apex-charts type="line"  height="241" :options="analyticsData.monthlyIncomeTrends.chartOptions" :series="monthlyIncomeTrends.seriesFirm"></vue-apex-charts>  
						</vs-tab>
						<vs-tab @click="colorx = 'success'" label="514" icon-pack="feather" icon="icon-zap">
						<vue-apex-charts type="line"  height="241" :options="analyticsData.monthlyIncomeTrends.chartOptions" :series="monthlyIncomeTrends.series514"></vue-apex-charts>
						</vs-tab>
						<vs-tab @click="colorx = 'primary'" label="329" icon-pack="feather" icon="icon-twitter">
						<vue-apex-charts type="line"  height="241" :options="analyticsData.monthlyIncomeTrends.chartOptions" :series="monthlyIncomeTrends.series329"></vue-apex-charts>
						</vs-tab>
						<vs-tab @click="colorx = 'danger'" label="812" icon-pack="feather" icon="icon-slack">
						<vue-apex-charts type="line"  height="241" :options="analyticsData.monthlyIncomeTrends.chartOptions" :series="monthlyIncomeTrends.series812"></vue-apex-charts>
						</vs-tab>
						<vs-tab @click="colorx = 'warning'" label="AI" icon-pack="feather" icon="icon-globe">
						<vue-apex-charts type="line"  height="241" :options="analyticsData.monthlyIncomeTrends.chartOptions" :series="monthlyIncomeTrends.seriesAI"></vue-apex-charts>
						</vs-tab>
						<vs-tab @click="colorx = 'dark'" label="CT" icon-pack="feather" icon="icon-cpu">
						<vue-apex-charts type="line"  height="241" :options="analyticsData.monthlyIncomeTrends.chartOptions" :series="monthlyIncomeTrends.seriesCT"></vue-apex-charts>
						</vs-tab>
					</vs-tabs>
				</vx-card>
			</div>
			<div class="vx-col w-full md:w-2/5 mb-base" style="margin-top:-115px;">				
				<vx-card title="Company Expected Chart" class="mb-base">
					<vue-apex-charts type="bar" height="414" :options="analyticsData.expectedIncome.chartOptions" :series="analyticsData.expectedIncome.series"></vue-apex-charts>
				</vx-card>
			</div>										
		</div>
		<div class="vx-row" style="height: 510px;">
			<div class="vx-col w-full xl:w-1/3 md:w-1/4 mb-base">				
				<company-order></company-order>
			</div>
			<div class="vx-col w-full md:w-2/3 mb-base">				
				<vx-card title="Every Ten Months Income for Each Company" class="mb-base" v-if="tenMonthsIncome">
					<vue-apex-charts type="line"  height="372" :options="analyticsData.tenMonthsIncome" :series="tenMonthsIncome"></vue-apex-charts>
				</vx-card>
			</div>									
		</div>
		<div class="vx-row" >
			<div class="vx-col w-full xl:w-1/3 md:w-1/3 mb-base ">				
				<vx-card title="Today Incoming Member" v-if="todayIncomingMembers">	
					<div class="con-tablex vs-table--content scroll_hidden" style="height:390px;">			
						<vs-table search :data="todayIncomingMembers" >
							<template>
								<vs-th>Nro</vs-th>
								<vs-th>Name</vs-th>
								<vs-th>Organization</vs-th>
								<vs-th>Income</vs-th>							
							</template>
							<template slot-scope="{data}">
								<vs-tr :key="indextr" v-for="(tr, indextr) in data">
									<vs-td :data="data[indextr].id">
										{{data[indextr].id}}
									</vs-td>
									<vs-td :data="data[indextr].username">
										{{data[indextr].name}}
									</vs-td>
									<vs-td :data="data[indextr].organization">
										{{data[indextr].organization}}
									</vs-td>								
									<vs-td :data="data[indextr].income">
										{{data[indextr].income}}
									</vs-td>
									
								</vs-tr>
							</template>
						</vs-table>
					</div>	
				</vx-card>
			</div>
			<div class="vx-col w-full xl:w-1/3 md:w-1/3 mb-base">				
				<vx-card title="Team Income Order" v-if="teamIncomeOrder">	
					<div class="con-tablex vs-table--content scroll_hidden" style="height:390px;">			
						<vs-table search :data="teamIncomeOrder.users" >
							<template>
								<vs-th>Nro</vs-th>
								<vs-th>Name</vs-th>
								<vs-th>Organization</vs-th>
								<vs-th>Income</vs-th>							
							</template>
							<template slot-scope="{data}">
								<vs-tr :key="indextr" v-for="(tr, indextr) in data">
									<vs-td :data="data[indextr].id">
										{{data[indextr].id}}
									</vs-td>
									<vs-td :data="data[indextr].username">
										{{data[indextr].name}}
									</vs-td>
									<vs-td :data="data[indextr].organization">
										{{data[indextr].organization}}
									</vs-td>								
									<vs-td :data="data[indextr].income">
										{{data[indextr].income}}
									</vs-td>
									
								</vs-tr>
							</template>
						</vs-table>
					</div>	
				</vx-card>
			</div>			
			<div class="vx-col w-full xl:w-1/3 md:w-1/3 mb-base" v-if="personalIncomeOrder">				
				<vx-card title="Personal Income Order">	
					<div class="con-tablex vs-table--content scroll_hidden" style="height:390px;">			
						<vs-table search :data="personalIncomeOrder.users" >
							<template>
								<vs-th>Nro</vs-th>
								<vs-th>Name</vs-th>
								<vs-th>Organization</vs-th>
								<vs-th>Income</vs-th>							
							</template>
							<template slot-scope="{data}">
								<vs-tr :key="indextr" v-for="(tr, indextr) in data">
									<vs-td :data="data[indextr].id">
										{{data[indextr].id}}
									</vs-td>
									<vs-td :data="data[indextr].username">
										{{data[indextr].name}}
									</vs-td>
									<vs-td :data="data[indextr].organization">
										{{data[indextr].organization}}
									</vs-td>								
									<vs-td :data="data[indextr].income">
										{{data[indextr].income}}
									</vs-td>
									
								</vs-tr>
							</template>
						</vs-table>
					</div>	
				</vx-card>
			</div>											
		</div>
		<div class="vx-row" >
			<div class="vx-col w-full xl:w-1/3 md:w-1/3 mb-base ">						
				<vx-card title="Product Devlopment Overview">
					<div class="vx-card_body" style="height:480px;">
						<div v-for="(product, index) in productDevelopementOverview" :key="product.id" :class="{'mt-4': index}">
							<div class="flex justify-between">
								<div class="flex flex-col">
									<span class="mb-1">{{ product.name }}</span>
									<h4>{{ product.ratio }}%</h4>
								</div>
								<div class="flex flex-col text-right">
									<span class="flex -mr-1">
										<span class="mr-1">{{ product.comparedResult }}</span>
										<feather-icon :icon=" product.comparedResult < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[product.comparedResult < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
									</span>
								</div>
							</div>
							<vs-progress :percent="product.ratio"></vs-progress>
						</div>
					</div>
				</vx-card>
				
			</div>
			<div class="vx-col w-full xl:w-1/3 md:w-1/3 mb-base">				
				<vx-card title="Extra Alert" v-if="extraAlert">
					<div class="vx-card__body" style="height: 480px;">
						<vx-timeline :data="extraAlert" />
					</div>
				</vx-card>
			</div>			
			<div class="vx-col w-full xl:w-1/3 md:w-1/3 mb-base">				
				<vx-card title="Personal Income Order">	
					<div class="con-tablex vs-table--content scroll_hidden" style="height:480px;">			
						<vs-table search :data="personalIncomeOrder.users" >
							<template slot="thead">
								<vs-th>Nro</vs-th>
								<vs-th>Name</vs-th>
								<vs-th>Organization</vs-th>
								<vs-th>Income</vs-th>							
							</template>
							<template slot-scope="{data}">
								<vs-tr :key="indextr" v-for="(tr, indextr) in data">
									<vs-td :data="data[indextr].id">
										{{data[indextr].id}}
									</vs-td>
									<vs-td :data="data[indextr].username">
										{{data[indextr].name}}
									</vs-td>
									<vs-td :data="data[indextr].organization">
										{{data[indextr].organization}}
									</vs-td>								
									<vs-td :data="data[indextr].income">
										{{data[indextr].income}}
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


import VueApexCharts from 'vue-apexcharts'
import FeatherIcon from './FeatherIcon.vue'
import analyticsData from './analyticsData.js'
import CarouselResponsiveBreakpoints from './carousel/CarouselResponsiveBreakpoints.vue'
import CompanyOrder from './CompanyOrder.vue'
import VxTimeline from '@/components/timeline/VxTimeline'

export default {
	components: {
		VueApexCharts,		
		FeatherIcon,
		CarouselResponsiveBreakpoints,
		CompanyOrder,
		VxTimeline
		
	},
	mounted(){
		
	},
	created() {	
		
		const today = new Date();
		this.date = today.getDate();
		this.month = today.getMonth();
		this.year = today.getFullYear();    
		var thisMonth = ["January", "February", "March","April", "May", "June","July", "August", "September","October", "November", "December"]
		var currentdate = [];
		
		for(let i = 0; i <= this.month; i ++){
		
		let current = this.date.toString()+ " " + thisMonth[i];
		currentdate.push(current);

		}
		analyticsData.monthlyIncomeTrends.chartOptions.xaxis.categories = currentdate;	
		
		
		
		this.$http.get('/api/card/card-dashboard/last-twelvemonths')
		.then((response) => {			
			this.monthlyIncomeTrends  = response.data 			
		})		
		.catch((error) => { console.log(error) })
	
		// Today's income data: row 1,1
		this.$http.get('/api/card/card-dashboard/week-income')
		.then((response) => {			
			this.weekIncomeData  = response.data 			
		})		
		.catch((error) => { console.log(error) })
	

		analyticsData.weekIncomeDataChart['colors'][6]='rgba(255,9,109,1)';		

		// The comparison to last month data: row 1,4
		this.$http.get('/api/card/card-dashboard/current-expected-income')
		.then((response) => {			
			this.currentExpectedIncome  = response.data 			
		})		
		.catch((error) => { console.log(error) })

		this.$http.get('/api/card/card-dashboard/today-incoming-members')
		.then((response) => {			
			this.todayIncomingMembers  = response.data 			
		})		
		.catch((error) => { console.log(error) })

		this.$http.get('/api/card/card-dashboard/team-income-order')
		.then((response) => {			
			this.teamIncomeOrder  = response.data 			
		})		
		.catch((error) => { console.log(error) })

		this.$http.get('/api/card/card-dashboard/personal-income-order')
		.then((response) => {			
			this.personalIncomeOrder  = response.data 			
		})		
		.catch((error) => { console.log(error) })

		this.$http.get('/api/card/card-dashboard/product-developement-overview')
		.then((response) => {			
			this.productDevelopementOverview  = response.data 			
		})		
		.catch((error) => { console.log(error) })

		this.$http.get('/api/card/card-dashboard/extra-alert')
		.then((response) => {			
			this.extraAlert  = response.data 			
		})		
		.catch((error) => { console.log(error) })

		// Ten Monthly Income
		this.$http.get('/api/card/card-dashboard/ten-months-income')
		.then((response) => {			
			this.tenMonthsIncome  = response.data 			
		})		
		.catch((error) => { console.log(error) })
		
	},	
	data() {
		return {

			//row-1	
			monthlyIncomeTrends:{},
    		colorx: 'success',
			weekIncomeData: {},
			tenMonthsIncome: {},
			currentExpectedIncome: {},
			expectedIncome:{},
			completed:{},
			analyticsData,
			todayIncomingMembers:{},
			teamIncomeOrder:{},
			personalIncomeOrder:{},
			productDevelopementOverview: {},
			extraAlert: {},			
			daysOfWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			indexOfWeek:null,
			week_number:null,		
			'tableList': [
				'vs-th: Component',
				'vs-tr: Component',
				'vs-td: Component',
				'thread: Slot',
				'tbody: Slot',
				'header: Slot'
			],			
		}
	}
	
}

</script>
<style lang="scss">
/*! rtl:begin:ignore */

#dashboard-statistics {
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
	.vx-card__actions {
		display: inline-flex;
	}
	@media(max-width: 576px) {
		.decore-left,
		.decore-right {
			width: 140px;
		}
	}
}

/*! rtl:end:ignore */
</style>
<style lang="scss">
@import "@/assets/scss/vuexy/components/featherIcon.scss"
</style>

<style scoped>
.mt-6 {
    margin-top: 0rem !important;
}
.avatar {
  vertical-align: middle;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.vs-table--content {
    height: 389px;
}
.scroll_hidden{
	overflow-y:hidden;
}
.scroll_hidden:hover{
	overflow-y:scroll;
}



</style>

