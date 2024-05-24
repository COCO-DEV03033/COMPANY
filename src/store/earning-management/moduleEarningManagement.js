import state from './moduleEarningManagementState.js'
import mutations from './moduleEarningManagementMutations.js'
import actions from './moduleEarningManagementActions.js'
import getters from './moduleEarningManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

