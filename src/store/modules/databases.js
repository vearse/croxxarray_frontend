import $http from "../../plugins/axios";

function initialState(){
    return{
        loading: false,
        loadingDataList: false,
        error: false,
        success: false,
        validationErrors: {},
        data: {},
        dataList: [],
        dataListTotal: 0,
    }
}

const storeModule = {
    namespaced: true,

    state: initialState(),

    getters: {
        isLoading: state => state.loading,
        isLoadingDataList: state => state.loadingDataList,
        getData: state =>state.data
    },

    mutations: {
        SET_LOADING(state) {
            state.loading = true;
            state.error = false;
            state.success = false;
            state.validationErrors = {};
        },

        SET_LOADING_DATALIST(state){
            state.isLoadingDataList = true;
        },

        SET_ERROR(state, message) {
          state.error = message;
          state.success = false;
          state.loading = false;
          state.validationErrors = {};
        },
    
        SET_SUCCESS(state, message) {
          state.success = message;
          state.error = false;
          state.validationErrors = {};
          state.loading = false;
        },
    
        SET_VALIDATION_ERRORS(state, payload) {
          state.validationErrors = payload;
        },
    
        REMOVE_ERROR_SUCCESS(state) {
          state.error = false;
          state.success = false;
          state.validationErrors = {};
          state.loading = false;
        },
    
        SET_DATA(state, payload) {
          state.data = payload.data;
        },

        SET_DATALIST(state, payload){
            state.dataList = payload.databases;
            state.loadingDataSet = false;
        }
    },

    actions: { 
      async list({ commit }, payload){
          try{
              commit("SET_LOADING_DATALIST");
              let response = await $http.get("databases/database_list", {
                  params: payload
              });
              let responsePayload = response.data;
              commit("SET_DATALIST", responsePayload);  
          } catch (error) {
            //
          }
      },

      async create({ commit }, payload){
        try{
            commit("SET_LOADING_DATALIST");
            let response = await $http.post("databases/database_list", payload); 
            let responsePayload = response.data;
            commit("SET_DATALIST", responsePayload);
            commit("SET_SUCCESS", responsePayload.message);  
        } catch (error) {
          if (error && error.data) {
            console.log(error);
            let errorPayload = error.data;
            if (errorPayload.message) {
              commit("SET_ERROR", errorPayload.message);
              if (errorPayload.errors) 
                commit("SET_VALIDATION_ERRORS", errorPayload.errors);
              }
              return;
            } 
          }
          commit("SET_ERROR", "Internal connection error, please try again.");
        },

      // View action
      async view({ commit }, id) {
        console.log('Loading ', id)
        commit("SET_LOADING");
        try {
          let response = await $http.get(`databases/database_list/${id}`);
          let responsePayload = response.data;
          commit("SET_DATA", responsePayload);
          commit("SET_SUCCESS", responsePayload.message);
        } catch (error) {
          if (error && error.data) {
            let errorPayload = error.data;
            if (errorPayload.message) {
              commit("SET_ERROR", errorPayload.message);
              return;
            } 
          }
          commit("SET_ERROR", "Internal connection error, please try again.");
        }
      },

    
      // Update action
      async update({ commit }, { id, payload }) {
        commit("SET_LOADING");
        try {
          let response = await $http.put(`databases/database_list/${id}`, payload);
          let responsePayload = response.data;
          commit("SET_DATA", responsePayload);
          commit("SET_SUCCESS", responsePayload.message);
        } catch (error) {
          if (error && error.data) {
            let errorPayload = error.data;
            if (errorPayload.message) {
              commit("SET_ERROR", errorPayload.message);
              if (errorPayload.errors) {
                commit("SET_VALIDATION_ERRORS", errorPayload.errors);
              }
              return;
            }
          }
          commit("SET_ERROR", "Internal connection error, please try again.");
        }
      },

      // Delete action
      async delete({ commit }, id) {
        commit("SET_LOADING");
        try {
          let response = await $http.delete(`databases/database_list/${id}`);
          let responsePayload = response.data;
          commit("SET_SUCCESS", responsePayload.message);
        } catch (error) {
          if (error && error.data) {
            let errorPayload = error.data;
            if (errorPayload.message) {
              commit("SET_ERROR", errorPayload.message);
              return;
            }
          }
          commit("SET_ERROR", "Internal connection error, please try again.");
        }
      }

    }
}

export default storeModule;