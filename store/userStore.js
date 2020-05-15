export const state = () => ({
    // Items
    userDetails: [],
  });
  
  export const mutations = {
    SET_USERDETAILS(state, userDetails) {
      
      state.userDetails = userDetails;
    },
    
  };
  
  export const actions = {
    async getUserDetails({ commit, dispatch, state }, payload) {
      try {
        
       const userRes = await this.$axios.$get('/api/users/userDetails')
       
        commit('SET_USERDETAILS', userRes)
        
        return userRes;
      } catch (err) {
        console.log(err);
      }
    },
  };

  
  export const getters = {
    getUserDetails: (state) => {
      
      return state.userDetails
    },

  }