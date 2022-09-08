import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
// Ici on fait l'importation du router qui déjà exporté dans le fichier router/index.js
import router from '../router/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Auth
    token: null,
    user: null

  },
  getters: {
    // Auth
    authenticated(state) {
      return state.user && state.token;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    // Auth
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    /* ---- Auth ---- */
    // l _ utilisé à la place du 1er paramètre par défaut car on est pas besoin pour le moment
    async login({ dispatch }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        console.log(response.data.token);
        // stockage du token 
        localStorage.setItem('token', response.data.token);
        dispatch('attempt', response.data.token)
        .then(()=>{
          router.push('Dashboard/');
        });
  
      } catch (error) {
        console.log(error);
      }
    },
    // Pour récupérer l'utilisateur authentifié en passant le token
    async attempt({ commit }, token) {
      const headers = {
        headers :
        { Authorization: `Bearer ${token}`,
          Accept :'application/json', 
        }
      };
      try {
        const response = await axios.get('/api/user', headers);
        commit('setToken', token);
        commit('setUser', response.data);
        //console.log(response.data.token);
      } catch (error) {
        console.log(error);
      }
     
    }
  },
  modules: {},
});
