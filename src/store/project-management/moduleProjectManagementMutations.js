/*=========================================================================================
  File Name: moduleProjectMutations.js
  Description: Project Module Mutations
==========================================================================================*/


export default {
  SET_USERS (state, users) {
    state.users = users
  },

  SET_USER (state, user) {
    state.user = user
  },
  
  DELETE_PROJECT (state, itemId) {
    console.log('itemID', itemId);
    const userIndex = state.project.findIndex((u) => u.id === itemId)
    state.project.splice(userIndex, 1)
  },

  SET_PROJECTS (state, {projects}) {
    state.projects = projects
  },
  
  SET_PROJECT (state, {project}) {
    state.project = project
  },

  UPDATE_PROJECT(state, updatedProject) {   
    
    for (let i=0;i<state.project.length;i++) {
      if (state.project[i].id == updatedProject.id) {
        state.project.splice(i,1,updatedProject)
      }
    }    
    console.log('Updated Project=====================================================>', state.project[0], updatedProject)
  },

  ADD_PROJECT (state, project) {
    console.log('project', project);
    state.project.push(project)
    console.log('project', state.project);


  },
}
