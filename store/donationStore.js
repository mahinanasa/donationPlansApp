//import axios from '@nuxtjs/axios'
export const state = () => ({
    // Items
    products: [],
    donationList: []
  });
  
  export const mutations = {
    // Items
        SET_PRODUCTS(state, products) {
             state.products = products;
        },
        ADD_DONATIONOBJ(state, donationObj) {
          state.donationList.push(donationObj);
        },
        RESET_DONATIONOBJ(state) {
          let emptyArr = []
          state.donationList = emptyArr 
        },
        DELETE_DONATIONOBJ(state,product) {
          
          let donList = _.cloneDeep(state.donationList)
          _.remove(donList, function(n) { return n.productId == product.productId;})
          
          state.donationList = donList 
        },
        UPDATE_DONATIONOBJ(state,payload) {
          
          let donList = _.cloneDeep(state.donationList)
          _.forEach(donList, function(o) {
            if(o.productId === payload.productId){
                o.isMonthly =  payload.isMonthly
                o.isOneTime =  payload.isOneTime
            }
            })

          state.donationList = donList 
        },
  };
  
  export const actions = {
    async getAllProducts({ commit, dispatch, state }, payload) {
      try {
       const productsRes = await this.$axios.$get('/api/products')
       
        commit('SET_PRODUCTS', productsRes)
        
        return productsRes;
      } catch (err) {
        console.log(err);
      }
    },

    addToDonationList({ commit, state }, payload){
        
        if(payload != undefined && payload != null){
          //Finding product already exist in donationList
          let tempPdtObj = _.find(state.donationList, function(o) {
            return o.productId === payload.productId;
            })

           if(tempPdtObj == undefined && tempPdtObj == null){ 
             payload.isMonthly = false
             payload.isOneTime = true
             
             commit('ADD_DONATIONOBJ', payload)
             return {
              'message': 'Product sucesfully Added',
              'status': 'sucess'
            }
           }else{
            return {
              'message': 'Product already Added',
              'status': 'failed'
            }
           }
        }
        
    },

    async checkout({ commit, dispatch, state, rootState }, payload) {
      try {
        
       const checkoutRes = await this.$axios.$post('/api/checkout',payload)
        commit('SET_PRODUCTS', checkoutRes.data)
        commit('RESET_DONATIONOBJ')
        commit('userStore/SET_USERDETAILS', checkoutRes.user, { root: true })
        
        return checkoutRes;
      } catch (err) {
        console.log(err);
      }
    },

    async deleteDonationList({ commit, state }, payload){
        try{

          if(payload != undefined && payload != null){
            
               commit('DELETE_DONATIONOBJ', payload)
              
          }
          
        }catch (err) {
          console.log(err);
        }
  },

  async updatePdtEntity({ commit, state }, payload){
        
    if(payload != undefined && payload != null){
         
         commit('UPDATE_DONATIONOBJ', payload)
         
         return {
          'message': 'Product sucesfully updated',
          'status': 'sucess'
        }
      
    }
    
},
    
  };

  export const getters = {
    getProducts: (state) => {
      return state.products
    },
    getDonationList: (state) => {
      return state.donationList
    }

  }