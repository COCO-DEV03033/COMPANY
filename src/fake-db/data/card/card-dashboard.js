import mock from '@/fake-db/mock.js'

const data = {  
  weekIncomeData:{
    series : [{
        name:"Income",
        data: [12355, 12355, 56651, 26556, 26541, 5654, 34000]
    }],  
    todayIncome: 34000,
    expectedIncome: 54000,
    comparisonYesterday : {
      str: 'than yesterday',
      result: -561,
    },
    comparisonLastMonth : {
      str: 'than',
      result: 36321,
    }    
  }, 
  currentExpectedIncome:{
      completed: 76617,
      expected: 512361
  },
  weekIncomeData_Company:{
    todayIncome_Company:{
      todayIncome_514:10000,
      todayIncome_329:12000,
      todayIncome_812:5000,
      todayIncome_AI:4000,
      todayIncome_CT:3000
    },
    expectedIncome_Company:{
      expectedIncome_514:20000,
      expectedIncome_329:12000,
      expectedIncome_812:8000,
      expectedIncome_AI:10000,
      expectedIncome_CT:4000
    },
    comparisonYesterday_Company :{
      result_514:+3.4,
      result_329:+1.2,
      result_812:+2.1,
      result_AI:-1.2,
      result_CT: 2
    },
    comparisonLastMonth_Company : {
      result_514:1500,
      result_329:2000,
      result_812:-900,
      result_AI:250,
      result_CT:-102
    },    
    series_514 : [{
        name:"Income_514",
        data: [254, 562, 56651, 26556, 26541, 568, 34000]
    }],
    series_329 : [{
        name:"Income_329",
        data: [26556, 26541,12355, 12355, 56651, 5654, 34000]
    }],
    series_812 : [{
        name:"Income_812",
        data: [23231, 23123, 56651, 26556, 26541, 5654, 34000]
    }],
    series_AI : [{
        name:"Income_AI",
        data: [5000, 12355, 5214, 26556, 26541, 10000, 34000]
    }],
    series_CT : [{
        name:"Income_CT",
        data: [4565, 12355, 7898, 84521, 1000, 5654, 4562]
    }], 

  },
  currentIncome_Company :{
    currentExpectedIncome_Company:{
      currentExpectedIncome_514:190000,
      currentExpectedIncome_329:100000,
      currentExpectedIncome_812:100000,
      currentExpectedIncome_AI:150000,
      currentExpectedIncome_CT:50000,
    },

      planIncome_514:200000,
      planIncome_329:100000,
      planIncome_812:100000,
      planIncome_AI:200000,
      planIncome_CT:50000,
       
      currentIncome_514:180000,
      currentIncome_329:80000,
      currentIncome_812:58000,
      currentIncome_AI:120000,
      currentIncome_CT:20000,
  
  },

  monthlyIncomeTrends:{
    seriesFirm: [
      { 
        name:'Income',       
        type: 'column',
        data: [150, 220, 100, 160, 200]
      }, 
      { 
        name:'Developers',       
        type: 'column',
        data: [40, 40, 40, 40, 40]
      },      
    ],
    series514: [
      { 
        name:'Income',       
        type: 'column',
        data: [150, 220, 100, 160, 200]
      }, 
      { 
        name:'Developers',       
        type: 'column',
        data: [40, 40, 40, 40, 40]
      },      
    ],
    series329: [
      { 
        name:'Income',       
        type: 'column',
        data: [150, 220, 100, 160, 200]
      }, 
      { 
        name:'Developers',       
        type: 'column',
        data: [40, 40, 40, 40, 40]
      },      
    ],
    series812: [
      { 
        name:'Income',       
        type: 'column',
        data: [150, 220, 100, 160, 200]
      }, 
      { 
        name:'Developers',       
        type: 'column',
        data: [40, 40, 40, 40, 40]
      },      
    ],
    seriesAI: [
      { 
        name:'Income',       
        type: 'column',
        data: [150, 220, 100, 160, 200]
      }, 
      { 
        name:'Developers',       
        type: 'column',
        data: [40, 40, 40, 40, 40]
      },      
    ],
    seriesCT: [
      { 
        name:'Income',       
        type: 'column',
        data: [150, 220, 100, 160, 200]
      }, 
      { 
        name:'Developers',       
        type: 'column',
        data: [40, 40, 40, 40, 40]
      },      
    ],    
  },

  todayIncomeMembers:[   
      {
        'id': 1,
        'name': 'KimCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 2,
        'name': 'SoCholJin',
        'organization': '329',
        'income': '150'
      },
      {
        'id': 3,
        'name': 'RiCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 4,
        'name': 'PakCholJin',
        'organization': '812',
        'income': '150'
      },
      {
        'id': 5,
    'name': 'KimCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 6,
    'name': 'JoCholJin',
        'organization': '329',
        'income': '150'
      },
      {
        'id': 7,
    'name': 'SoCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 8,
        'name': 'KimCholJin',
        'organization': 'AI',
        'income': '150'
      },
      {
        'id': 9,
        'name': 'JongCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 10,
    'name': 'WonCholJin',
        'organization': 'CT',
        'income': '150'
      }
      ,   
      {
        'id': 8,
        'name': 'KimCholJin',
        'organization': 'AI',
        'income': '150'
      },
      {
        'id': 9,
        'name': 'JongCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 10,
    'name': 'WonCholJin',
        'organization': 'CT',
        'income': '150'
      }   
    ],
  teamIncomeOrder:{
    'users': [
      {
        'id': 1,
        'name': 'KimCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 2,
        'name': 'SoCholJin',
        'organization': '329',
        'income': '150'
      },
      {
        'id': 3,
        'name': 'RiCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 4,
        'name': 'PakCholJin',
        'organization': '812',
        'income': '150'
      },
      {
        'id': 5,
    'name': 'KimCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 6,
    'name': 'JoCholJin',
        'organization': '329',
        'income': '150'
      },
      {
        'id': 7,
    'name': 'SoCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 8,
        'name': 'KimCholJin',
        'organization': 'AI',
        'income': '150'
      },
      {
        'id': 9,
        'name': 'JongCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 10,
    'name': 'WonCholJin',
        'organization': 'CT',
        'income': '150'
      }
  ,
      {
        'id': 8,
        'name': 'KimCholJin',
        'organization': 'AI',
        'income': '150'
      },
      {
        'id': 9,
        'name': 'JongCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 10,
    'name': 'WonCholJin',
        'organization': 'CT',
        'income': '150'
      }
  
    ]
  },
  personalIncomeOrder:{
    'users': [
      {
        'id': 1,
        'name': 'KimCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 2,
        'name': 'SoCholJin',
        'organization': '329',
        'income': '150'
      },
      {
        'id': 3,
        'name': 'RiCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 4,
        'name': 'PakCholJin',
        'organization': '812',
        'income': '150'
      },
      {
        'id': 5,
    'name': 'KimCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 6,
    'name': 'JoCholJin',
        'organization': '329',
        'income': '150'
      },
      {
        'id': 7,
    'name': 'SoCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 8,
        'name': 'KimCholJin',
        'organization': 'AI',
        'income': '150'
      },
      {
        'id': 9,
        'name': 'JongCholJin',
        'organization': '514',
        'income': '150'
      },
      {
        'id': 10,
    'name': 'WonCholJin',
        'organization': 'CT',
        'income': '150'
      } 
    ]
  },
  productDevelopementOverview: [
    {
      id: 1,
      name: 'Product1',
      ratio: 73,
      comparedResult: '800'
    },
    {
      id: 3,
      name: 'Product2',
      ratio: 8,
      comparedResult: '-200'
    },
    {
      id: 2,
      name: 'Product3',
      ratio: 19,
      comparedResult: '100'
    },
    {
      id: 4,
      name: 'Product4',
      ratio: 27,
      comparedResult: '-450'
    },
    {
      id: 5,
      name: 'Product5',
      ratio: 27,
      comparedResult: '-45'
    }
  ],
  extraAlert: [
    {
      color: 'primary',
      icon: 'PlusIcon',
      title: 'Client Meeting',
      desc: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
      time: '25 mins Ago'
    },
    {
      color: 'warning',
      icon: 'MailIcon',
      title: 'Email Newsletter',
      desc: 'Cupcake gummi bears soufflé caramels candy',
      time: '15 Days Ago'
    },
    {
      color: 'danger',
      icon: 'UsersIcon',
      title: 'Plan Webinar',
      desc: 'Candy ice cream cake. Halvah gummi bears',
      time: '20 days ago'
    },
    {
      color: 'success',
      icon: 'LayoutIcon',
      title: 'Launch Website',
      desc:
        'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears soufflé caramels candy.',
      time: '25 days ago'
    },
    {
      color: 'primary',
      icon: 'TvIcon',
      title: 'Marketing',
      desc: 'Candy ice cream cake. Halvah gummi bears Cupcake gummi bears.',
      time: '28 days ago'
    }
  ],
  tenMonthsIncome:[
      {
        name: "514",
        data: [280, 290, 3300, 360, 3200,2800, 2900, 330, 360, 3200,280]
      },
      {
        name: "329",
        data: [230, 1100, 3500, 4100, 500,3300, 3600, 3200,2800, 2900,230]
      },
      {
        name: "812",
        data: [4300, 430, 90, 70, 3000,500, 100, 7000,800, 2900,4300]
      },
      {
        name: "AI",
        data: [500, 5600, 500, 8000, 500,600, 4500, 120,300, 2900,500]
      },
      {
        name: "CT",
        data: [200, 1000, 300, 430, 1100,1400, 210, 240,280, 4000,200]
      }
  ],
  

}


mock.onGet('/api/card/card-dashboard/ten-months-income').reply(() => {
  return [200, data.tenMonthsIncome]
})

mock.onGet('/api/card/card-dashboard/week-income').reply(() => {
  return [200, data.weekIncomeData]
})

mock.onGet('/api/card/card-dashboard/last-month-income').reply(() => {
  return [200, data.lastMonthData]
})

mock.onGet('/api/card/card-dashboard/current-expected-income').reply(() => {
  return [200, data.currentExpectedIncome]
})

mock.onGet('/api/card/card-dashboard/week-income-company').reply(() => {
  return [200, data.weekIncomeData_Company]
})

mock.onGet('/api/card/card-dashboard/company-order').reply(() => {
  return [200, data.currentIncome_Company]
})

mock.onGet('/api/card/card-dashboard/last-twelvemonths').reply(() => {
  return [200, data.monthlyIncomeTrends]
})

mock.onGet('/api/card/card-dashboard/today-incoming-members').reply(() => {
  return [200, data.todayIncomeMembers]
})

mock.onGet('/api/card/card-dashboard/team-income-order').reply(() => {
  return [200, data.teamIncomeOrder]
})

mock.onGet('/api/card/card-dashboard/personal-income-order').reply(() => {
  return [200, data.personalIncomeOrder]
})

mock.onGet('/api/card/card-dashboard/product-developement-overview').reply(() => {
  return [200, data.productDevelopementOverview]
})

mock.onGet('/api/card/card-dashboard/extra-alert').reply(() => {
  return [200, data.extraAlert]
})