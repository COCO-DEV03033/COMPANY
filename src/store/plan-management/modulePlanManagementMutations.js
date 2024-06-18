import { rearrangeData, updateArrays } from '@/utils/utils';

export default {
  GET_PLANS (state, { plans }) {
    state.plans = plans
  },
  CHANGE_PLAN (state, { changedata }) {
    let changedatas = updateArrays(state.plans, changedata)
    state.plans = changedatas
    state.groupplans = rearrangeData(changedatas, state.dates)
  },
  
  GET_YEARMONTHS (state, { yearmonths }) {
    state.yearmonths = yearmonths
  },

  UPDATE_YEARMONTH (state, { updatedata }) {
    let changedatas = updateArrays(state.yearmonths, updatedata)
    state.yearmonths = changedatas
  },
  
  ADD_YEARMONTH (state, { adddata }) {
    let data = state.yearmonths
    state.yearmonths.push(adddata)
    state.yearmonths = data
  }

}
