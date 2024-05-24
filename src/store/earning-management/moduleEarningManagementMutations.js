import { rearrangeData, updateArrays } from '@/utils/utils';

export default {
  GET_EARNINGS(state, { earnings, dates }) {
    state.earnings = earnings
    state.groupearnings = rearrangeData(earnings)
    state.dates = dates
  },
  CHANGE_EARNING(state, { changedata }) {
    let changedatas = updateArrays (state.earnings, changedata)
    state.earnings = changedatas
    state.groupearnings = rearrangeData(changedatas)
  },
  
  GET_YEARMONTHS(state, { yearmonths }) {
    state.yearmonths = yearmonths
  },

  UPDATE_YEARMONTH(state, { updatedata }) {
    let changedatas = updateArrays (state.yearmonths, updatedata)
    state.yearmonths = changedatas
  },
  
  ADD_YEARMONTH(state, { adddata }) {
    let data = state.yearmonths;
    state.yearmonths.push(adddata)
    state.yearmonths = data
  },

}
