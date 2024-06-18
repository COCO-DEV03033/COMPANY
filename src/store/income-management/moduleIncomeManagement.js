import state from './moduleIncomeManagementState.js'
import mutations from './moduleIncomeManagementMutations.js'
import actions from './moduleIncomeManagementActions.js'
import getters from './moduleIncomeManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

