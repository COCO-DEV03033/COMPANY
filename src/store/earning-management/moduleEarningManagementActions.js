import axios from '@/axios.js'
import { resolve } from 'core-js/fn/promise'

const API_URL = 'http://localhost:5050'

export default {
  fetchEarings({ commit }, payload) {
    return new Promise((resolve, reject) => {

      const { yearmonth, organization } = payload;
      console.log(yearmonth.getFullYear(), yearmonth.getMonth()+1);

      const formData = new FormData();
      formData.append("year", yearmonth.getFullYear());
      formData.append("month", yearmonth.getMonth()+1);
      formData.append("organization", organization);
      axios.post("/api/earning", formData)
        .then((res) => {
          console.log(res.data.earnings);
          commit('SET_EARNING', { earnings:res.data.earnings , dates: res.data.dates })
          this._vm.$vs.notify({
            color: "success",
            title: "Success",
            text: 'Get Data Successfully!!!',
          });
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        })
    })
  },
  updateEarings({commit}, payload) {
    console.log('payload', payload);
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/earning/update`,payload)
        .then((response) => {
          this._vm.$vs.notify({
            color: "success",
            title: "Update Data Successfully!",
            text: 'Update Data Successfully!!!',
          });
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  removeRecord({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.delete(`${API_URL}/api/auth/users/${userId}`)
        .then((response) => {
          commit('REMOVE_RECORD', userId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  updateUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", payload.file); // appending file
      formData.append("userID", payload.userDetails.userID);
      formData.append("name", payload.userDetails.name);
      formData.append("dob", payload.userDetails.dob);
      formData.append("organization", payload.userDetails.organization);
      formData.append("department", payload.userDetails.department);
      formData.append("team", payload.userDetails.team);
      formData.append("gender", payload.userDetails.gender);
      formData.append("role", payload.userDetails.role);
      axios
        .post("/api/auth/updateUser", formData)
        .then((res) => {
          commit('UPDATE_USER', { user: payload.userDetails, path: res.data.file ? res.data.path : '' })
          console.log(res.data)
          this._vm.$vs.notify({
            color: "success",
            title: "User Update Success!",
            text: res.data.message,
          });
          resolve(res.data)
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        })
    })
  },
  approveRecord({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.put(`${API_URL}/api/auth/usersApprove/${userId}`)
        .then((response) => {
          this._vm.$vs.notify({
            color: "success",
            title: "User Approved",
            text: response.data.message,
          });
          commit('APPROVE_USER', userId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  rejectRecord({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.put(`${API_URL}/api/auth/usersReject/${userId}`)
        .then((response) => {
          this._vm.$vs.notify({
            color: "danger",
            title: "User Rejected",
            text: response.data.message,
          });
          commit('REJECT_USER', userId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
