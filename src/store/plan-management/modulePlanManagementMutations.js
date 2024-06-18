import { rearrangeData, updateArrays } from '@/utils/utils';

export default {
  GET_PLANS (state, { plans }) {
    state.plans = plans
  },
  UPDATE_PLANS (state, { updatedata }) {
    let changedatas = updateArrays(state.plans, updatedata)
    state.plans = changedatas
  },
  
  ADD_PLANS (state, { adddata }) {
    let data = state.plans
    state.plans.push(adddata)
    state.plans = data
  }

}
