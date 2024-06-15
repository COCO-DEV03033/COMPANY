import axios from '@/axios.js'
import { resolve } from 'core-js/fn/promise'

const API_URL = 'http://localhost:5050'

export default {
  fetchPlans ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      
      axios.post(`${API_URL}/api/plan/getPlans/`, payload)
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
            commit('GET_INCOMES', { incomes:[], dates: [] })
            resolve([])
          }
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  },
  
  changeEaring ({ commit }, payload) {
    commit('CHANGE_EARNING', { changedata:payload })
  },
  updateEarings ({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/earning/update`, payload)
        .then((response) => {
          this._vm.$vs.notify({
            color: 'success',
            title: 'Success',
            text: 'Update Data Successfully!!!'
          })
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchYearMonths ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post('/api/earning/getYearMonths', payload)
        .then((res) => {
          if (res.data.status_code === 0) {
            commit('GET_YEARMONTHS', { yearmonths:res.data.data.yearmonths })
            this._vm.$vs.notify({
              color: 'success',
              title: 'Success',
              text: res.data.message
            })
            resolve(res.data.data)
          } else if (res.data.status_code === 1) {
            this._vm.$vs.notify({
              color: 'warning',
              title: 'Warning',
              text: res.data.message
            })
            commit('SET_EARNING', { earnings:[], dates: [] })
            resolve([])
          }
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
    })
  },

  addYearMonth ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/earning/addYearMonth`, payload)
        .then((res) => {
          console.log(res)
          if (res.data.status_code === 0) {
            commit('ADD_YEARMONTH', { adddata:res.data.data.yearmonth })
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
  
  updateYearMonth ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/earning/updateYearMonth`, payload)
        .then((res) => {
          commit('UPDATE_YEARMONTH', { updatedata:payload })
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
          reject(error) })
    })
  },
  
  removeRecord ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/earning/deleteYearMonth`, payload)
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
