import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import { clientId, state } from './environment';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    authenticat(context) {
      return axios.get('https://todoist.com/oauth/authorize', {
        params: {
          "client_id": clientId,
          "scope": "data:read",
          "state": state
        }
      })
    }
  }
})
