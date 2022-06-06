import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    currencies:[]
  },
  getters: {},
  mutations: {
    SET_CURR(state,payload) {
        state.currencies= payload
    }
  },
  actions: {
    async fetchCurrencies({commit}){
        commit("SET_CURR",(await axios.get('https://api.changenow.io/v1/currencies?active=true&fixedRate=true')).data);
    }
  },
 
  modules: {},
  getters: {
      curr:(s)=>s.currencies
  },
});