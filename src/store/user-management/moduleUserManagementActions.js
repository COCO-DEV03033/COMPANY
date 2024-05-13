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
        this._vm.$vs.notify({
          title: "Success",
          text: 'Update Success!',
          color: "Success",
        })
      const formData = new FormData();
      formData.append("file", payload.file); // appending file
      formData.append("userID", payload.userDetails.userID);
      formData.append("name", payload.userDetails.name);
      formData.append("dob", payload.userDetails.dob);
      formData.append("organization", payload.userDetails.organization);
      formData.append("department", payload.userDetails.department);
      formData.append("team", payload.userDetails.team);
      formData.append("gender", payload.userDetails.gender);
      formData.append("status", payload.userDetails.status);
      formData.append("role", payload.userDetails.role);
      axios
        .post("/api/auth/updateUser", formData)
        .then((res) => {
          commit('UPDATE_USER', { user: payload.userDetails, path: res.data.file ? res.data.path : '' })
          console.log(res.data)
          this._vm.$vs.notify({
            title: 'Success',
            text: 'response.data.message',
            iconPack: 'feather',
            icon: 'icon-thumbs-up',
            color: 'Success'
          })
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }
}
