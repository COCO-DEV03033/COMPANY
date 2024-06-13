import axios from '@/axios.js'
// import { resolve } from 'core-js/fn/promise'

const API_URL = 'http://localhost:5050'

export default {
  
  fetchProjects ({ commit }) {
   
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/api/project/getProjects`)
        .then((response) => {
          console.log(response)
          commit('SET_PROJECTS', {projects:response.data.data.projects})
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchProject ({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/api/project/getProject/${payload}`)
        .then((response) => {
          commit('SET_PROJECT', {project:response.data.existProject})
          console.log('response->',response);
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  removeProject ({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios.delete(`${API_URL}/api/data-list/products/${id}`)
        .then((response) => {
          commit('REMOVE_RECORD', id)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  
  removeRecord ({ commit }, userId) {
    return new Promise((resolve, reject) => {
      axios.delete(`${API_URL}/api/auth/users/${userId}`)
        .then((response) => {
          commit('REMOVE_RECORD', userId)
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  }
}
