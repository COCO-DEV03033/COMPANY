import state from './modulePlanManagementState.js'
import mutations from './modulePlanManagementMutations.js'
import actions from './modulePlanManagementActions.js'
import getters from './modulePlanManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

