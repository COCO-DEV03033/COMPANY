export default {
  salesBarSession: {
    series: [
      {
        name: 'Sessions',
        data: [75, 125, 225, 175, 125, 75, 25]

      }
    ],
    analyticsData: {
      // session: 2700,
      session: [200000, 200000, 100000, 100000],
      comparison : {
        str: 'Last 7 Days',
        
        result: [+5.2, +6.2, +7.2, +8.2]
      }
    }
  }
}