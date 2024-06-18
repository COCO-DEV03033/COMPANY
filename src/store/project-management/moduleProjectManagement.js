

import state from './moduleProjectManagementState.js'
import mutations from './moduleProjectManagementMutations.js'
import actions from './moduleProjectManagementActions.js'
import getters from './moduleProjectManagementGetters.js'

export default {
  isRegistered: false,
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

