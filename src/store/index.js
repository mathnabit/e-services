import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
// Ici on fait l'importation du router qui déjà exporté dans le fichier router/index.js
import router from '../router/index.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * Auth
     * Pour le state d'auth on a le token et le user
     */
    token: null,
    user: null
  },
  getters: {
    // Auth
    // Pour tester l'athentification
    authenticated(state) {
      return state.user && state.token;
    },
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    /**
     * Auth
     * On a une mutaion pour modifier le token et autre pour le user
     */
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    /* ------ Auth -----*/
    /**
     * Cette méthode a pur but d'envoyer l'email et le pass et récupérer le token du user qui convient
     * Puis on déclenche la méthode attempt qui récupère l'utilisateur via son token
     * Finalement on stocke le token dans localstorage pour le récupérer au cas d'actualisation
     */
    async login({ dispatch }, credentials) {
      try {
        const response = await axios.post('/api/login', credentials);
        console.log(response.data.token);
        dispatch('attempt', response.data.token)
        .then(()=>{
          router.push('Dashboard/');
          // stockage du token 
          localStorage.setItem('token', response.data.token);
        });
  
      } catch (error) {
        console.log(error);
      }
    },
    /**
     *  Pour récupérer l'utilisateur authentifié en passant le token
     * Puis déclenche les mutations pour stocker le token et le user dans le state
     */ 
    async attempt({ state, commit }, token) {
      const headers = {
        headers :
        { Authorization: `Bearer ${token}`,
          Accept :'application/json', 
        }
      };
      try {
        if(token) {
          commit('setToken', token);
        } 
        // Pour sortir si le token est null
        if(!state.token)
        return;
        const response = await axios.get('/api/user', headers);      
        commit('setUser', response.data);
        //console.log(response.data.token);
      } catch (error) {
        // supprimer le user et le token si ce dernier existe mais invalide
        commit('setToken', null);
        commit('setUser', null);
      }
     
    },
    /**
     * On lance d'abord le requete qui tue la session backend,
     * puis on supprime le token et le user depuis le state et le storage.
     * En retourne le promise pour l'utiliser dans le NavbarComponent pour
     * rediriger l'utilisateur à la page login
     */
    async logout({ state, commit }) {
      const headers = {
        headers :
        { Authorization: `Bearer ${state.token}`,
          Accept :'application/json', 
        }
      };
      try {
        // Attention! Le 2éme paramètre par défaut c'est le body pour les requetes post,
        // il faut le mentionner, après vient le header qui va contenir le token
        return await axios.post('/api/logout',{}, headers)
        .then(() => {
          commit('setToken', null);
          commit('setUser', null);
        });
      } catch (error) {
        
      }
    }
  },
  modules: {},
});
