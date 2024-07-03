import axios from '@/axios.js'
import { resolve } from 'core-js/fn/promise'

const API_URL = 'http://localhost:5050'

export default {
  // addItem({ commit }, item) {
  //   return new Promise((resolve, reject) => {
  //     axios.post("/api/data-list/products/", {item: item})
  //       .then((response) => {
  //         commit('ADD_ITEM', Object.assign(item, {id: response.data.id}))
  //         resolve(response)
  //       })
  //       .catch((error) => { reject(error) })
  //   })
  // },
  fetchUsers({ commit }) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/api/auth/users`)
        .then((response) => {
          commit('SET_USERS', response.data.allUser)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },
  fetchUser(context, userId) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/api/auth/users/${userId}`)
        .then((response) => {
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
      formData.append("userID", payload.userID);
      formData.append("name", payload.name);
      formData.append("dob", payload.dob);
      formData.append("organization", payload.organization);
      formData.append("department", payload.department);
      formData.append("team", payload.team);
      formData.append("gender", payload.gender);
      formData.append("role", payload.role);
      formData.append("university", payload.university);
      formData.append("old_job", payload.old_job);
      formData.append("enter_date", payload.enter_date);
      formData.append("main_skill", payload.main_skill);
      formData.append("language", payload.lang_level);
      formData.append("special", payload.special);
      formData.append("current_address", payload.current_address);
      formData.append("major_subject", payload.major_subject);
    
      axios
        .post("/api/auth/updateUser", formData)
        .then((res) => {
          commit('UPDATE_USER', { user: payload, path: res.data.file ? res.data.path : '' })        
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
