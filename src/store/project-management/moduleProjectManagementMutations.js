/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default {
  SET_USERS (state, users) {
    state.users = users
  },

  SET_USER (state, user) {
    state.user = user
  },
  
  REMOVE_RECORD (state, itemId) {
    const userIndex = state.users.findIndex((u) => u.id === itemId)
    state.users.splice(userIndex, 1)
  },

  SET_PROJECTS (state, {projects}) {
    state.projects = projects
  },
  
  SET_PROJECT (state, {project}) {
    console.log('project', project);
    state.project = project
  },
  ADD_PROJECT (state, project) {
    state.projects.push(project)
  }
}
