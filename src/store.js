import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { clientId, state, devToken } from './environment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allTasks: [],
    allProjects: [],
    todaysTasks: [],
    frontBurnerTasks: [
      {
        id: '1',
        content: 'test1'
      },
      {
        id: '4',
        content: 'test4'
      }
    ],
    backBurnerTasks: [
      {
        id: '3',
        content: 'test3'
      }
    ],
    miscBurnerTasks: [
      {
        id: '2',
        content: 'test2'
      }
    ]
  },
  mutations: {
    appendAllTasks(state, newTasks) {
      console.log(newTasks);
      console.log(state);
      state.allTasks.push(...newTasks);
      console.log(state);
    },
    appendAllProjects(state, newProjects) {
      state.allProjects.concat(newProjects);
    },
    updateTodaysTasks(state, newTasks) {
      state.todaysTasks = newTasks;
    },
    updateFrontBurnerTasks(state, newTasks) {
      state.frontBurnerTasks = newTasks;
    },
    updateBackBurnerTasks(state, newTasks) {
      state.backBurnerTasks = newTasks;
    },
    updateMiscBurnerTasks(state, newTasks) {
      state.miscBurnerTasks = newTasks;
    }
  },
  getters: {
    allTasks(state) {
      return state.allTasks;
    },
    todaysTasks(state) {
      return state.todaysTasks;
    },
    frontBurnerTasks(state) {
      return state.frontBurnerTasks;
    },
    backBurnerTasks(state) {
      return state.backBurnerTasks;
    },
    miscBurnerTasks(state) {
      return state.miscBurnerTasks;
    }
  },
  actions: {
    authenticate(context) {
      return axios
        .get('https://todoist.com/oauth/authorize', {
          params: {
            client_id: clientId,
            scope: 'data:read',
            state: state
          }
        })
        .then(result => {
          console.log(result);
          context.commit('');
        })
        .catch(err => {
          console.log(err);
        });
    },
    fetchTodaysTasks(context) {
      return axios
        .get('https://api.todoist.com/rest/v1/tasks', {
          headers: {
            Authorization: `Bearer ${devToken}`
          }
        })
        .then(result => {
          console.log(result);
          context.commit(
            'updateTodaysTasks',
            result.data.filter(task => task.due)
          );
        });
    },
    fetchAllTasks(context) {
      return axios
        .get('https://api.todoist.com/rest/v1/tasks', {
          headers: {
            Authorization: `Bearer ${devToken}`
          }
        })
        .then(result => {
          console.log(result);
          context.commit('appendAllTasks', result.data);
        });
    },
    fetchAllProjects(context) {
      return axios
        .get('https://api.todoist.com/rest/v1/projects', {
          headers: {
            Authorization: `Bearer ${devToken}`
          }
        })
        .then(result => {
          console.log(result);
        });
    }
  }
});
