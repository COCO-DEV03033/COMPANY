import axios from '@/axios.js'
import { resolve } from 'core-js/fn/promise'
// import { resolve } from 'core-js/fn/promise'

const API_URL = 'http://localhost:5050'

export default {
  
  async fetchProjects ({ commit }) {
   
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/api/project`)
        .then((response) => {
          console.log(response)
          commit('SET_PROJECTS', {projects:response.data.data.projects})
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  async fetchProject ({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}/api/project/${payload}`)
        .then((response) => {
          commit('SET_PROJECT', {project:response.data.data.projects})
          console.log('response->',response);
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  async updateProject ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/project/${payload.id}`, payload)
        .then((res) => {
          commit('UPDATE_PROJECT', payload)
          console.log("payload==========>", payload.id)
          if (res.data.status_code==0) {
            this._vm.$vs.notify({
              color: 'success',
              title: 'Success',
              text: res.data.message,
            })
          } else if(res.data.status_code==1) {
            this._vm.$vs.notify({
              color: 'warning',
              title: 'Warning',
              text: res.data.message,
            });
          } else {
            console.log('error'); 
          }
        })
        .catch((error) => { 
          console.log(error)
          reject(error) })
    })
  },
  
  async addProject ({ commit }, payload) {
    console.log(payload);
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/project`, payload)
        .then((res) => {
          if (res.data.status_code == 0) {
            commit('ADD_PROJECT', res.data.data.project )
            this._vm.$vs.notify({
              color: 'success',
              title: 'Success',
              text: res.data.message,
            });
            resolve(res.data.data)
          } else if (res.data.status_code == 1) {
            this._vm.$vs.notify({
              color: 'warning',
              title: 'Warning',
              text: res.data.message,
            });
            resolve([])
          }
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  async deleteProject ({ commit }, payload) {
    console.log('projectID', payload)
    return new Promise((resolve, reject) => {
      axios.delete(`${API_URL}/api/project/${payload.id}`, payload)
        .then((res) => {
          if (res.data.status_code == 0) {
            commit('DELETE_PROJECT', payload.id)
            this._vm.$vs.notify({
              color: 'success',
              title: 'Success',
              text: res.data.message
            });
            resolve(res.data.data)
          } else if (res.data.status_code == 1) {
            this._vm.$vs.notify({
              color: 'warning',
              title: 'Warning',
              text: res.data.message
            });
            resolve([])
          }
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  
  async removeRecord ({ commit }, userId) {
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
