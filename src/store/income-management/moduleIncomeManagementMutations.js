import { rearrangeData, updateArrays } from '@/utils/utils';

export default {
  GET_INCOMES(state, { incomes, dates }) {
    state.incomes = incomes
    state.groupincomes = rearrangeData(state.incomes, dates)
    state.dates = dates
  },
  
  GET_OVERVIEW(state, overView) {
    console.log('udpate OverView->', overView);
    state.overView = overView
  },
  CHANGE_INCOME(state, { changedata }) {
    let changedatas = updateArrays (state.incomes, changedata)
    state.incomes = changedatas
    state.groupincomes = rearrangeData(changedatas, state.dates)
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
