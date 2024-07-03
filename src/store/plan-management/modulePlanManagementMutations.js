import { rearrangeData, updateArrays } from '@/utils/utils';

export default {
  GET_PLANS (state, { plans }) {
    state.plans = plans
  },
  GET_COMPANYPLANS (state, { companyPlans}) {
    state.companyPlans = companyPlans
  },
  UPDATE_PLANS (state, updatedata ) {
    state.plans = updatedata
  },
  
  ADD_PLANS (state, { adddata }) {
    let data = state.plans
    state.plans.push(adddata)
    state.plans = data
  }

}
