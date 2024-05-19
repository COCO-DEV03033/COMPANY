export default {
  SET_USERS(state, users) {
    state.users = users
  },
  REMOVE_RECORD(state, itemId) {
    const userIndex = state.users.findIndex((u) => u.userID === itemId)

    state.users.splice(userIndex, 1)
  },
  UPDATE_USER(state, data) {
    const userIndex = state.users.findIndex((u) => u.userID === data.user.userID)

    if (data.path != '') state.users[userIndex].avatar = data.path
    // if (data.user.userID == this.$store.state.AppActiveUser) localStorage.setItem('userInfo') = state.users[userIndex]
  },
  APPROVE_USER(state, data) { 
    const userIndex = state.users.findIndex((u) => u.userID === data)

    state.users[userIndex].statue = true
  },
  REJECT_USER(state, data) { 
    const userIndex = state.users.findIndex((u) => u.userID === data)

    state.users[userIndex].statue = false
  }
}
