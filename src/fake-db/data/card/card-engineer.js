import mock from '@/fake-db/mock.js'

const data = {
  engineerIncome: {
    currentIncome: 5000,
    maximumIncome:8000,
    engineerRanking: 30,
    wholeEngineers: 350
    
  }
}


mock.onGet('/api/card/card-engineer/engineerdate').reply(() => {
  return [200, data.engineerIncome]
})

