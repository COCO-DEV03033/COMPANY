import axios from '@/axios.js'
import { resolve } from 'core-js/fn/promise'
import companyPlan from '../../views/main/planing/component/data/companyPlan'

const API_URL = 'http://localhost:5050'

export default {
  fetchPlans ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      
      // axios.get(`${API_URL}/api/plan/getPlans/`, payload)
      axios.get(`${API_URL}/api/plan/getPlans?year=${payload.year}&month=${payload.month}&organization=${payload.organization}`)
      .then((res) => {
          if (res.data.status_code === 0) {
            commit('GET_PLANS', { plans:res.data.data.plans })
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
  fetchCompanyPlans ({commit}, payload) {
    console.log("action", payload)
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/plan/getCompanyPlans`, payload)
      .then((res) => {
        if(res.data.status_code === 0) {
          commit('GET_COMPANYPLANS', {companyPlans: res.data.data.companyPlans})
          console.log('GET_COMPANYPLANS', res.data.data.companyPlans)
          resolve(res.data.data)
        } else if(res.data.status_code === 1) {
          this._vm.$vs.notify({
            color: 'warning',
            title: 'Warning',
            text: res.data.message
          })
          resolve([])
        }
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  updatePlans ({commit}, payload) {
    return new Promise((resolve, reject) => {
      commit('UPDATE_PLANS',payload);
    })
  },
  
  savePlans ({commit}, payload) {
    console.log("save payload----->",payload);
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/api/plan/savePlans`, payload)
        .then((response) => {
          this._vm.$vs.notify({
            color: 'success',
            title: 'Success',
            text: 'Update Plan Successfully!!!'
          })
          // commit('UPDATE_PLANS',payload);
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
  
  // removeRecord ({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     axios.post(`${API_URL}/api/plan/deleteYearMonth`, payload)
  //       .then((res) => {
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
  //         reject(error) 
  //       })
  //   })
  // }
}
