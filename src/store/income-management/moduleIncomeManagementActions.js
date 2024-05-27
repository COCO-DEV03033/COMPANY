import axios from '@/axios.js'
import { resolve } from 'core-js/fn/promise'

const API_URL = 'http://localhost:5050'

export default {
  fetchEarings({ commit }, payload) {
    return new Promise((resolve, reject) => {
      const { yearmonth, organization } = payload;
      const formData = new FormData();
      formData.append("year", yearmonth.getFullYear());
      formData.append("month", yearmonth.getMonth()+1);
      formData.append("organization", organization);
      axios.post("/api/earning", formData)
        .then((res) => {
          if(res.data.status_code==0){

            commit('GET_EARNINGS', { earnings:res.data.data.earnings , dates: res.data.data.dates })
            this._vm.$vs.notify({
              color: "success",
              title: "Success",
              text: res.data.message,
            });
            resolve(res.data.data)
          } else if(res.data.status_code==1){
            this._vm.$vs.notify({
              color: "warning",
              title: "Warning",
              text: res.data.message,
            });
            commit('GET_EARNINGS', { earnings:[] , dates: [] })
            resolve([])
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        })
    })
  },
  
  changeEaring({ commit }, payload) {
    commit('CHANGE_EARNING', { changedata:payload })
  },
  updateEarings({commit}, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/earning/update`,payload)
        .then((response) => {
          this._vm.$vs.notify({
            color: "success",
            title: "Success",
            text: 'Update Data Successfully!!!',
          });
          resolve(response)
        })
        .catch((error) => { reject(error) })
    })
  },

  fetchYearMonths({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post("/api/income/getYearMonths", payload)
        .then((res) => {
          if(res.data.status_code==0){
            commit('GET_YEARMONTHS', { yearmonths:res.data.data.yearmonths })
            this._vm.$vs.notify({
              color: "success",
              title: "Success",
              text: res.data.message,
            });
            resolve(res.data.data)
          } else if(res.data.status_code==1){
            this._vm.$vs.notify({
              color: "warning",
              title: "Warning",
              text: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          reject(err)
        })
    })
  },

  addYearMonth({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/income/addYearMonth`, payload)
        .then((res) => {
          console.log(res);
          if(res.data.status_code==0){
            commit('ADD_YEARMONTH', { adddata:res.data.data.yearmonth })
            this._vm.$vs.notify({
              color: "success",
              title: "Success",
              text: res.data.message,
            });
          } else if(res.data.status_code==1){
            this._vm.$vs.notify({
              color: "warning",
              title: "Warning",
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
  
  updateYearMonth({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/income/updateYearMonth`, payload)
        .then((res) => {
          commit('UPDATE_YEARMONTH', { updatedata:payload })
          if(res.data.status_code==0){
            this._vm.$vs.notify({
              color: "success",
              title: "Success",
              text: res.data.message,
            });
          } else if(res.data.status_code==1){
            this._vm.$vs.notify({
              color: "warning",
              title: "Warning",
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
  
  removeRecord({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/api/income/deleteYearMonth`, payload)
        .then((res) => {
          if(res.data.status_code==0){
            this._vm.$vs.notify({
              color: "success",
              title: "Success",
              text: res.data.message,
            });
          } else if(res.data.status_code==1){
            this._vm.$vs.notify({
              color: "warning",
              title: "Warning",
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

}