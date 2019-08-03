import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as uuidv4 from 'uuid/v4';
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
      state.allTasks.push(...newTasks);
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
    async createBurnerLabels(context) {
      const labelsStatus = {
        Front_Burner: false,
        Back_Burner: false,
        Misc_Burner: false
      };
      const tasks = await axios.get('https://api.todoist.com/rest/v1/labels', {
        headers: {
          Authorization: `Bearer ${devToken}`
        }
      });
      tasks.data.forEach(label => {
        if (labelsStatus.hasOwnProperty(label.name)) {
          labelsStatus[label.name] = true;
        }
      });
      Object.keys(labelsStatus).forEach(
        async label => {
          if (!labelsStatus[label]) {
            await axios.post(
              'https://api.todoist.com/rest/v1/labels',
              {
                name: label
              },
              {
                headers: {
                  Authorization: `Bearer ${devToken}`,
                  'Content-Type': 'application/json',
                  'X-Request-Id': uuidv4()
                }
              }
            );
          }
        }
      );
      // console.log(labelsStatus);
      // console.log(tasks);
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
    },
    addLabelToTask(context, {}) {},
    removeLabelFromTask(context) {}
  }
});
