<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <div class="col-8">
              <h4 class="h4 ml-3 font-bold">Project Database</h4>
            </div>
            <div class="col-4">
                <div class="float-right">
                  <CButton class="bg-croxx-secondary rounded-10p mr-3  shadow-sm" @click="createModal = true">Create Database</CButton>
                </div>
            </div> 
        </div> 
        <div class="row">
            <div v-for="(database, i) in systemDatabase" :key="i" 
                 class="col-lg-4 col-md-6 col-sm-12 cursor-pointer">
                <CCard style="height: 130px" class="hover-shadow-md box-croxx">
                  <CCardBody>
                    <router-link :to="'/projectdb/'+ database.link | toLower " class="card-link">
                    <div class="py-2">
                      <h5 class="h5 text-primary">{{database.name}}
                          <span class="float-right mr-3">
                          
                          </span>
                        </h5>
                      <p class="text-dark">{{database.description}}</p>
                    </div> 
                    </router-link>
                  </CCardBody>
                </CCard>
            </div> 
            <div v-for="(database, j) in dataList" :key="j" 
                 class="col-lg-4 col-md-6 col-sm-12 cursor-pointer">
                <CCard style="height: 130px" class="hover-shadow-md box-croxx">
                  <CCardBody>
                     <router-link :to="'/projectdb/db/'+ database.id" class="card-link">
                        <div class="py-2"> 
                          <h5 class="h5 text-primary">{{database.name}}
                            <span class="float-right mr-3 text-black"
                                v-c-tooltip="{content: 'Edit database!'}">
                                <v-icon name="pencil-alt" class="absolute" style="top:15px"></v-icon>
                              <!-- <CIcon name="cil-user" /> -->
                            </span> 
                          </h5> 
                          <p class="text-dark">{{database.description}}</p>
                        </div> 
                     </router-link>
                  </CCardBody>
                </CCard>
            </div> 
        </div> 
    </div>
    <!-- Create -->
    <CModal
      :show.sync="createModal"
      :centered="true"
    >
      <template slot="header">
          <h5 class="h5 bold">{{ (form.editmode) ? 'Edit' : 'Create'  }} Database</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="createModal=false"	>X</button>
      </template>
      <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
          <form  @submit.prevent="form.editmode ? handleSubmit(updateDatabaseRecord) : handleSubmit(createNewDatabase)">
              <CRow>
                <CCol sm="12">
                  <validation-provider  name="Database Name" rules="required|max:15" v-slot="validationContext">
                    <CInput
                      :invalid-feedback="validationContext.errors[0]"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      v-model="form.name" label="Name"
                      placeholder="Name of Database"
                      />
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <CRow>
                <CCol sm="12">
                  <validation-provider  name="Description" rules="required|min:10|max:512" v-slot="validationContext">
                    <CTextarea
                        v-model="form.description"
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        label="Description"
                        placeholder="Description of  Database"
                        class="croxx-textarea-sm"  
                      /> 
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <label for="">Database Columns</label>
              <div v-for="(column, index) in form.columns" :key="index">
                <CRow>
                  <CCol sm="12">
                    <!-- <CInput v-model="column.name"
                      :invalid-feedback="validationContext.errors[0]"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      placeholder="Column Name" /> -->
                      
                    <validation-provider  name="Column Name" rules="required|max:15" v-slot="validationContext">
                      <CInput
                        v-model="column.name"
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        placeholder="Column Name" 
                        />
                      <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                    </validation-provider>
                  </CCol> 
                </CRow>
              </div>
              <CButton  v-show="form.columns.length <= 7" 
                  @click="addNewColumn()"
                  class="bg-croxx-secondary text-primary rounded-10p mx-2 btn-block"
                >Add Custom Field</CButton>

                <div class="py-3 float-right">
                  <CButton type="submit" button="submit" 
                      class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">Save</CButton>
                </div>
          </form>
      </validation-observer>
    </CModal>

  </div>
</template>
<style scoped>

</style>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProjectDatabase',
  components: {},

  data () {
    return {
       createModal: false,
       form: {
         name: '',
         description: '',
         columns: [
           {name: ''}
         ],
         editmode: false
       },

       systemDatabase: [
        //  {name: 'Segments', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         { link: 'clients', name: 'Clients', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         { link: 'fields', name: 'Fields', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         { link: 'platforms', name: 'Platforms', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         { link: 'wels', name: 'Wells', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         { link: 'jobs', name: 'Job Types', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         { link: 'completion', name: 'Completion Types', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'}
       ]
    }
  },

  mounted() {
    this.loadRecords()
  },

  computed:{
      ...mapState('databases', {
        loading: state =>state.loading,
        loadingDataList: state =>state.loadingDataList,
        error: state => state.error,
        success: state => state.success,
        validationErrors: state => state.validationErrors,
        data: state => state.data, 
        dataList: state =>state.dataList,
        dataListTotal: state =>state.dataListTotal,
      })  
  },

  methods: {
    addNewColumn(){
      this.form.columns.push({name: ''})
    },
  
    loadRecords(){
      let payload = {};
      this.$store.dispatch('databases/list', payload)
    },

    createNewDatabase(){
      
      this.$store.dispatch('databases/create', this.form)
      .then(() => {
          // console.log( this.data );  
         if (this.data) {
            this.loadRecords();
            this.$forceUpdate();
            this.createModal = false;
            let msg = this.success;
            this.$swal.fire("", msg, "success").then(function() {
              // console.log(vm.success);
            });
          } else { 
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
            let msg = this.error;
            this.$swal.fire("", msg, "error");
          }
        });  
    },

    updateDatabaseRecord(){

    }
  }
}
</script>
