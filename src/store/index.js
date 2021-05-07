import Vue from 'vue';
import Vuex from 'vuex';
import { dataService } from '../shared';
import {
  ADD_HERO,
  DELETE_HERO,
  GET_HEROES,
  UPDATE_HERO,
} from './mutation-types';
Vue.use(Vuex);
const state = {
  heroes: [],
};
const mutations = {
  [GET_HEROES](state, heroes) {
    state.heroes = heroes;
  },
  [ADD_HERO](state, hero) {
    state.heroes.push(hero);
  },
  [DELETE_HERO](state, heroId) {
    state.heroes = [...state.heroes.filter(h => h.id !== heroId)];
    console.log(state.heroes, heroId);
  },
  [UPDATE_HERO](state, hero) {
    const index = state.heroes.findIndex(h => h.id === hero.id);
    if (index !== 1) {
      // Update and produce brand new Array..
      state.heroes.splice(index, 1, hero);
      state.heroes = [...state.heroes];
    }
  },
};
const actions = {
  // actions let us get to context which contains..
  // {state, getters, commit, dispatch}
  async getHeroesAction({ commit }) {
    const heroes = await dataService.getHeroes();
    commit(GET_HEROES, heroes);
  },
  async addHeroAction({ commit }, hero) {
    const addedHero = await dataService.addHero(hero);
    commit(ADD_HERO, addedHero);
  },
  async deleteHeroAction({ commit }, hero) {
    const deletedHero = await dataService.deleteHero(hero);
    console.log(deletedHero);
    commit(DELETE_HERO, deletedHero);
  },
  async updateHeroAction({ commit }, hero) {
    const updatedHero = await dataService.updateHero(hero);
    commit(UPDATE_HERO, updatedHero);
  },
};

// const mutations = {
//   getHeroes(state, heroes) {
//     state.heroes = heroes;
//   },
// };
// const actions = {
//   async getHeroesAction({ commit }) {
//     const heroes = await dataService.getHeroes();
//     commit('getHeroes', heroes);
//   },
// };

const getters = {
  getHeroById: state => id => state.heroes.find(h => h.id === id),
};
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});
