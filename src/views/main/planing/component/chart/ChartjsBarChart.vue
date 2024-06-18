<template>
  <div>
    <chartjs-component-bar-chart :height="200" :data="data" :options="options"></chartjs-component-bar-chart>
    
    
  </div>
</template>

<script>
import ChartjsComponentBarChart from './ChartjsComponentBarChart.vue'
import companyPlan from '../data/companyPlan.js'
export default {
  props: {
    realdata: {
      type: Array,
      required: true
    },
    companyPlan : {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        datasets: [
          {
            label: 'Plan',
            backgroundColor: ['#B9B3F7 ', '#B9B3F7', '#B9B3F7', '#B9B3F7', '#B9B3F7', '#FF0000'],
            data: this.realdata
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: false,
          text: 'Predicted world population (millions) in 2050'
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 240000,
                stepSize: 80000
              }
            }
          ]
        }
      }
    }
  },
  components: {
    ChartjsComponentBarChart,
    companyPlan
  }
}
</script>
