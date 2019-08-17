import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as uuidv4 from 'uuid/v4';
import router from './router'


// import { clientId, state, devToken } from './environment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allTasks: [],
    allProjects: [],
    todaysTasks: [],
    frontBurnerTasks: [],
    backBurnerTasks: [],
    miscBurnerTasks: [],
    labelIds: {},
    appCode: '',
    appState: '',
    authToken: ''
  },
  mutations: {
    updateAllTasks(state, newTasks) {
      state.allTasks = newTasks;
    },
    appendAllProjects(state, newProjects) {
      state.allProjects.concat(newProjects);
    },
    updateTodaysTasks(state, newTasks) {
      state.todaysTasks = newTasks.filter(
        task =>
          task.due &&
          !task.label_ids.includes(state.labelIds['Front_Burner']) &&
          !task.label_ids.includes(state.labelIds['Back_Burner']) &&
          !task.label_ids.includes(state.labelIds['Misc_Burner'])
      );
    },
    setupFrontBurnerTasks(state, newTasks) {
      state.frontBurnerTasks = newTasks.filter(
        task =>
          task.due && task.label_ids.includes(state.labelIds['Front_Burner'])
      );
    },
    setupBackBurnerTasks(state, newTasks) {
      state.backBurnerTasks = newTasks.filter(
        task =>
          task.due && task.label_ids.includes(state.labelIds['Back_Burner'])
      );
    },
    setupMiscBurnerTasks(state, newTasks) {
      state.miscBurnerTasks = newTasks.filter(
        task =>
          task.due && task.label_ids.includes(state.labelIds['Misc_Burner'])
      );
    },
    updateFrontBurnerTasks(state, newTasks) {
      state.frontBurnerTasks = newTasks;
    },
    updateBackBurnerTasks(state, newTasks) {
      state.backBurnerTasks = newTasks;
    },
    updateMiscBurnerTasks(state, newTasks) {
      state.miscBurnerTasks = newTasks;
    },
    updateLabelIds(state, labelIds) {
      console.log(labelIds);
      state.labelIds = labelIds;
    },
    updateTaskLabels(state, { task, labels }) {
      const itemIndex = state.allTasks.findIndex(item => item.id === task.id);
      state.allTasks[itemIndex].label_ids = labels;
    },
    setAppState(state, appState) {
      state.appState = appState;
    },
    setAppCode(state, appCode) {
      state.appCode = appCode;
    },
    setAuthToken(state, authToken) {
      state.authToken = authToken;
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
    },
    labelIds(state) {
      return state.labelIds;
    },
    appCode(state) {
      return state.appCode;
    },
    authToken(state) {
      return state.authToken;
    }
  },
  actions: {
    authenticate(context) {
      const appCode = context.getters.appCode;

      return axios.post('https://us-central1-burner-list-for-todoist.cloudfunctions.net/authenticate', {
            appCode: appCode,
        })
        .then(result => {
          console.log(result);
          context.commit('setAuthToken', result.data.access_token);
          console.log(context.getters.authToken);
          router.push({ name: "home" });
        })
        .catch(err => {
          console.log(err);
        });
    },
    async configureBurnerLabels(context) {
      const authToken = context.getters.authToken;

      const labelsStatus = {
        Front_Burner: false,
        Back_Burner: false,
        Misc_Burner: false
      };
      const labels = await axios.get('https://api.todoist.com/rest/v1/labels', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      labels.data.forEach(label => {
        if (labelsStatus.hasOwnProperty(label.name)) {
          labelsStatus[label.name] = true;
        }
      });
      const promises = [];
      Object.keys(labelsStatus).forEach(label => {
        if (!labelsStatus[label]) {
          const promise = axios.post(
            'https://api.todoist.com/rest/v1/labels',
            {
              name: label
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
                'X-Request-Id': uuidv4()
              }
            }
          );
          promises.push(promise);
        }
      });
      const result = await Promise.all(promises);
      console.log(result);
      if (result.length > 0) {
        const configuredLabels = await axios.get(
          'https://api.todoist.com/rest/v1/labels',
          {
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          }
        );
        console.log('configured', configuredLabels);
        const labelIdMap = configuredLabels.data.reduce((obj, label) => {
          obj[label.name] = label.id;
          return obj;
        }, {});
        context.commit('updateLabelIds', labelIdMap);
      } else {
        const labelIdMap = labels.data.reduce((obj, label) => {
          obj[label.name] = label.id;
          return obj;
        }, {});
        context.commit('updateLabelIds', labelIdMap);
      }
    },
    fetchTodaysTasks(context) {
      const authToken = context.getters.authToken;

      return axios
        .get('https://api.todoist.com/rest/v1/tasks', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then(result => {
          console.log(result);
          context.commit('updateTodaysTasks', result.data);
          context.commit('setupFrontBurnerTasks', result.data);
          context.commit('setupBackBurnerTasks', result.data);
          context.commit('setupMiscBurnerTasks', result.data);
          context.commit('updateAllTasks', result.data);
        });
    },
    fetchAllTasks(context) {
      const authToken = context.getters.authToken;

      return axios
        .get('https://api.todoist.com/rest/v1/tasks', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then(result => {
          console.log(result);
          context.commit('updateAllTasks', result.data);
        });
    },
    fetchAllProjects(context) {
      const authToken = context.getters.authToken;

      return axios
        .get('https://api.todoist.com/rest/v1/projects', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        .then(result => {
          console.log(result);
        });
    },
    switchBurnerLabel(context, { task, burnerList }) {
      const authToken = context.getters.authToken;

      console.log('adding', task, burnerList);
      const labelIdMap = context.getters.labelIds;
      const labels = [...task.label_ids].filter(
        labelId =>
          labelId !== labelIdMap['Front_Burner'] &&
          labelId !== labelIdMap['Back_Burner'] &&
          labelId !== labelIdMap['Misc_Burner']
      );

      labels.push(labelIdMap[burnerList]);
      console.log(labels);
      context.commit('updateTaskLabels', {
        task,
        labels
      });

      return axios
        .post(
          `https://api.todoist.com/rest/v1/tasks/${task.id}`,
          {
            label_ids: labels
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              'X-Request-Id': uuidv4()
            }
          }
        )
        .then(console.log)
        .catch(console.log);
    },
    returnItemToToday(context, { task }) {
      const authToken = context.getters.authToken;

      const labelIdMap = context.getters.labelIds;
      const labels = [...task.label_ids].filter(
        labelId =>
          labelId !== labelIdMap['Front_Burner'] &&
          labelId !== labelIdMap['Back_Burner'] &&
          labelId !== labelIdMap['Misc_Burner']
      );
      context.commit('updateTaskLabels', {
        task,
        labels
      });

      return axios
        .post(
          `https://api.todoist.com/rest/v1/tasks/${task.id}`,
          {
            label_ids: labels
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
              'X-Request-Id': uuidv4()
            }
          }
        )
        .then(console.log)
        .catch(console.log);
    }
  }
});
