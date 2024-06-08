export default {
  BarData: {
    series: [
      {
        name: '',
        data: [75, 125, 175, 105, 125, 95, 185]
      }
    ],
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
        toolbar: { show: false }
      },
      states: {
        hover: {
          filter: 'none'
        }
      },
      colors: ['rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)',  'rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)', 'rgba(115,103,240,0.15)', '#FF0000'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          endingShape: 'rounded' // Deprecated
          // borderRadius: '20px', // Coming Soon
        }
      },
      tooltip: {
        x: { show: false }
      }
    }
  },
  str: '% vs Last Month',
  analyticsData: {
    // session: 2700,
    plan: [200000, 200000, 100000, 100000],
    growthrate: [5.2, 6.2, 7.2, 8.2]
  },
  TotalUserByCompany : [100, 100, 50, 50],
  RealUserByCompany : [90, 93, 47, 48]
}