import { createStore } from 'vuex';
import { fetchDepartments, searchArtworks } from '@/services/metMuseumService';

const store = createStore({
  state: {
    departments: [],
    artworks: [],
    isDepartmentsLoading: false,
    isSearchLoading: false,
    networkError: null,
  },
  mutations: {
    SET_DEPARTMENTS(state, departments) {
      state.departments = departments;
    },
    SET_ARTWORKS(state, artworks) {
      state.artworks = artworks;
    },
    SET_DEPARTMENTS_LOADING(state, isLoading) {
      state.isDepartmentsLoading = isLoading;
    },
    SET_SEARCH_LOADING(state, isLoading) {
      state.isSearchLoading = isLoading;
    },
    SET_NETWORK_ERROR(state, error) {
      state.networkError = error;
    },
  },
  actions: {
    async loadDepartments({ commit }) {
      commit('SET_DEPARTMENTS_LOADING', true);
      commit('SET_NETWORK_ERROR', null);
      try {
        const departments = await fetchDepartments();
        commit('SET_DEPARTMENTS', departments);
      } catch (error) {
        commit('SET_NETWORK_ERROR', 'Error fetching departments');
        console.error('Error fetching departments:', error);
      } finally {
        commit('SET_DEPARTMENTS_LOADING', false);
      }
    },
    async performSearch({ commit }, { departmentId, query }) {
      commit('SET_SEARCH_LOADING', true);
      commit('SET_NETWORK_ERROR', null);
      try {
        const artworks = await searchArtworks(departmentId, query);
        commit('SET_ARTWORKS', artworks);
      } catch (error) {
        commit('SET_NETWORK_ERROR', 'Error searching artworks');
        console.error('Error searching artworks:', error);
      } finally {
        commit('SET_SEARCH_LOADING', false);
      }
    },
  },
});

export default store;
