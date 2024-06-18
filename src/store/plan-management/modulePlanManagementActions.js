import axios from '@/axios.js'
import { resolve } from 'core-js/fn/promise'

const API_URL = 'http://localhost:5050'

export default {
  fetchPlans ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      
      // axios.get(`${API_URL}/api/plan/getPlans/`, payload)
      axios.get(`${API_URL}/api/plan/getPlans?year=${payload.year}&month=${payload.month}&organization=${payload.organization}`)
      .then((res) => {
          if (res.data.status_code === 0) {
            commit('GET_PLANS', { plans:res.data.data.plans })
            console.log('plans', res.data.data.plans)
            console.log('res.data.data', res.data.data, typeof res.data.data)
            resolve(res.data.data)
          } else if (res.data.status_code === 1) {
            this._vm.$vs.notify({
              color: 'warning',
              title: 'Warning',
              text: res.data.message
            })
            resolve([])
          }
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  },
  updatePlans ({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/plan/updatePlan`, payload)
        .then((response) => {
          this._vm.$vs.notify({
            color: 'success',
            title: 'Success',
            text: 'Update Plan Successfully!!!'
          })
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  
  addPlans ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/plan/addPlan`, payload)
        .then((res) => {
          console.log(res)
          if (res.data.status_code === 0) {
            commit('ADD_PLAN', { adddata:res.data.data.plans })
            this._vm.$vs.notify({
              color: 'success',
              title: 'Success',
              text: res.data.message
            })
          } else if (res.data.status_code === 1) {
            this._vm.$vs.notify({
              color: 'warning',
              title: 'Warning',
              text: res.data.message
            })
          } else {
            console.log('error')
          }
        })
        .catch((error) => { 
          console.log(error)
          reject(error) 
        })
    })
  },
  
  // updateYearMonth ({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`${API_URL}/api/plan/updateYearMonth`, payload)
  //       .then((res) => {
  //         commit('UPDATE_YEARMONTH', { updatedata:payload })
  //         if (res.data.status_code === 0) {
  //           this._vm.$vs.notify({
  //             color: 'success',
  //             title: 'Success',
  //             text: res.data.message
  //           })
  //         } else if (res.data.status_code === 1) {
  //           this._vm.$vs.notify({
  //             color: 'warning',
  //             title: 'Warning',
  //             text: res.data.message
  //           })
  //         } else {
  //           console.log('error')
  //         }
  //       })
  //       .catch((error) => { 
  //         console.log(error)
  //         reject(error) })
  //   })
  // },
  
  removeRecord ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/plan/deleteYearMonth`, payload)
        .then((res) => {
          if (res.data.status_code === 0) {
            this._vm.$vs.notify({
              color: 'success',
              title: 'Success',
              text: res.data.message
            })
          } else if (res.data.status_code === 1) {
            this._vm.$vs.notify({
              color: 'warning',
              title: 'Warning',
              text: res.data.message
            })
          } else {
            console.log('error')
          }
        })
        .catch((error) => { 
          console.log(error)
          reject(error) 
        })
    })
  }
}
