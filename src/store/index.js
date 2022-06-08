import { createStore } from "vuex";
import axios from "axios";
export default createStore({
  state: {
    currencies: [],
    api: "c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd",
  },
  mutations: {
    SET_CURR(state, payload) {
      state.currencies = payload;
    },
  },
  actions: {
    async fetchCurrencies({ commit, state }) {
      try {
        commit(
          "SET_CURR",
          (
            await axios.get(
              "https://api.changenow.io/v1/currencies?active=true&fixedRate=true" +
                `&api-key=${state.api}`
            )
          ).data
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    curr: (s) => s.currencies,
    api: (s) => s.api,
  },
});
