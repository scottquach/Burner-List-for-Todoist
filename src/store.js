import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { clientId, state, devToken } from './environment';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allTasks: [],
    allProjects: []
  },
  mutations: {  
    appendAllTasks(state, newTasks) {
      console.log(newTasks);
      console.log(state);
      state.allTasks.push(...newTasks);
      console.log(state)
    },
    appendAllProjects(state, newProjects) {
      state.allProjects.concat(newProjects);
    }
  },
  getters: {
    allTasks(state) {
      return state.allTasks;
    }
  },
  actions: {
    authenticate(context) {
      return axios.get('https://todoist.com/oauth/authorize', {
        params: {
          "client_id": clientId,
          "scope": "data:read",
          "state": state
        }
      }).then(result => {
        console.log(result);
      }).catch(err => {
        console.log(err);
      })
    },
    fetchAllTasks(context) {
      return axios.get('https://api.todoist.com/rest/v1/tasks', {
        headers: {
          "Authorization": `Bearer ${devToken}`
        }
      }).then(result => {
        console.log(result);
        context.commit("appendAllTasks", result.data)
      })
    },
    fetchAllProjects(context) {
      return axios.get('https://api.todoist.com/rest/v1/projects', {
        headers: {
          "Authorization": `Bearer ${devToken}`
        }
      }).then(result => {
        console.log(result);
      })
    }
  }
})
