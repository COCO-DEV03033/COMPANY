export default {
  GET_EARNINGS(state, { earnings, dates }) {
    state.earnings = earnings
    state.dates = dates
  },
  CHANGE_EARNINGS(state, { changedatas }) {
    state.earnings = changedatas
  },
  
  GET_YEARMONTHS(state, { yearmonths }) {
    state.yearmonths = yearmonths
  },

  UPDATE_YEARMONTH(state, { updatedata }) {
    let data = state.yearmonths;
    data.forEach((item, index) => {
      if (item._id === updatedata._id) {
        data[index] = { ...item, ...updatedata };
      }
    });
    data.push(updatedata);
    state.yearmonths = data
  },
  
  ADD_YEARMONTH(state, { adddata }) {
    let data = state.yearmonths;
    state.yearmonths.push(adddata)
    state.yearmonths = data
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
