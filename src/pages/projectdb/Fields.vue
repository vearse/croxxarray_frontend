<template>
  <div>
    <div class="container">
        <div class="row my-3">
            <div class="col-8">
              <h4 class="h4">{{ $route.name }}</h4>
            </div>
            <div class="col-4"> 
                <span class="float-right">
                   <CButton class="bg-croxx-secondary rounded-10p mr-3 w-24 shadow-sm" @click="createModal = true">Create</CButton>
                   <!-- <CButton class="bg-croxx-import rounded-10p w-24 shadow-sm" >Import </CButton> -->
                </span>
            </div>
        </div>  
        <div class="row">
            <div class="col">
              <CCard class="rounded-xl" style="min-height: 400px;">
                <CCardBody> 
                  <div class="p-2">
                      <div class=" header"> 
                        <span class="">
                          <CInput  @change="handleDataListSearch"
                            class="float-right rounded-md " style="width:300px; height:40px;" placeholder="Search">
                            <template #prepend>
                              <div class="px-3 pt-1 border" color="gray">
                                <CIcon class="" name="cil-magnifying-glass"/> 
                              </div>
                            </template>
                          </CInput>
                        </span>
                      </div>
                  </div>
                  <div class="">
                    <div  small="true">
                      <div class="position-relative table-responsive">
                        <table class="table table-hover">
                          <thead>
                            <tr>
                              <th class="inline-table-head"><div></div></th>
                              <th class="inline-table-head"><div>Name</div></th>
                              <th class="inline-table-head"><div>Client</div></th>
                              <th class="inline-table-head"><div>Description</div></th>
                              <th class="inline-table-head"><div>Date Created</div></th>
                              <th class="inline-table-head"><div>Author</div></th>
                            </tr>
                          </thead>
                          <tbody class="position-relative">
                            <tr v-if="loadingDataList || dataList.length < 1">
                              <td data-v-431cdece="" colspan="6">
                                <div data-v-431cdece="" class="text-center my-5">
                                  <h2 data-v-431cdece="" v-if="loadingDataList"> Loading <svg data-v-431cdece="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="text-danger mb-2 c-icon c-icon-custom-size" width="30"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" class="ci-primary"></path></svg></h2>
                                  <h2 data-v-431cdece="" v-else-if="dataList.length < 1"> No Items <svg data-v-431cdece="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="text-danger mb-2 c-icon c-icon-custom-size" width="30"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" class="ci-primary"></path></svg></h2>
                                </div>
                              </td>
                            </tr>
                            <tr v-else
                                v-for="(item, i) in dataList" :key="i">
                                <td > 
                                  <div role="group" class="custom-control custom-checkbox">
                                    <input id="uid-ya7qse3inbb" type="checkbox" name="Option" class="custom-control-input" 
                                        v-model="item.id" :value="item.id">
                                    <label for="uid-ya7qse3inbb" class="custom-control-label">  </label>
                                  </div>
                                </td> 
                                <td @click="editItem(item)" class=""> {{item.name}} </td> 
                                <td @click="editItem(item)" class=""> <span v-if="item.client"> {{item.client.name}}</span> </td>
                                <td @click="editItem(item)" class=""> {{item.description}} </td>
                                <td @click="editItem(item)" class=""> {{ item.created_at  | moment("MMMM Do YYYY") }} </td>
                                <td @click="editItem(item)" class="">  <span v-if="item.author">{{item.author.firstname}} {{item.author.lastname}}</span>   </td>
                            </tr>
                          </tbody>
                        </table>

                        <div class="my-3" v-if="tableFilters.page > 1">
                          
                          <CPagination
                            :activePage.sync="tableFilters.page"
                            :pages="dataListLastPage"
                            
                            v-on:update-activePage="handlePageChange"
                            :goto="true"
                            align="end"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
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
          <h5 class="h5 bold">{{ (form.editmode) ? 'Edit' : 'Create'  }} {{$route.name}}</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="createModal=false"	>X</button>
      </template>
      <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
          <form action="" @submit.prevent="form.editmode ? handleSubmit(updateComponentRecord) : handleSubmit(createNewComponent)"> 
              <CRow>
                <CCol sm="12">
                   <validation-provider  name="Name" rules="required"
                    v-slot="validationContext">
                      <CInput
                        v-model="form.name" label="Name"  
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        placeholder="Enter your name"
                      />
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <CRow>
                <CCol sm="12">
                    <validation-provider name="Role Description" rules="required"
                      v-slot="validationContext">
                        <label for="uid-mu3370ovqhi" class=""> Client </label>
                        <select 
                          :invalid="validationContext.errors[0]"
                          :class="{ 'is-invalid': validationContext.errors[0] }"
                          v-model="form.client_id" id="uid-mu3370ovqhi" vertical="" class="form-control">
                            <option value="" selected="selected" hidden="hidden"> Please select </option> 
                            <option :key="client.id" :value="client.id" v-for="client in clients" >{{client.name}} </option>
                        </select>
                         <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                    </validation-provider>
                </CCol> 
              </CRow>
              <CRow>
                <CCol sm="12">
                   <validation-provider  name="Description" rules="max:512"
                    v-slot="validationContext">
                    <CTextarea
                      v-model="form.description"
                      :invalid-feedback="validationContext.errors[0]"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      label="Description"
                      placeholder="Description"
                      class="croxx-textarea"  
                    /> 
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <div class="py-3 float-right">
                  <CButton type="submit" button="submit" 
                      class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">{{ (form.editmode) ? 'Update' : 'Save'  }} </CButton>
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
import _ from "lodash";

export default {
  name: 'Fields',
  components: {  },

  props:{
    fields: {
      type: Array,
      default () {
        return ['', 'name', '', '','Date Created', 'Author']
      }
    },
  },
  data () {
    return {
      createModal: false,
      detailModal: false,
      tableFilters: {
        per_page: 25,
        page: 1, 
        search: null,
        sort_by: "created_at",
        sort_dir: "desc"
      },
      clients: Object.values(this.$store.state.clients.dataList),
      form: {
        name: '',
        description: '',
        client_id: '',
        editmode: false
      }
    }
  },

  mounted() {
    this.loadRecords();

    this.loadClientRecord()
  }, 

  computed:{
      ...mapState('fields', {
        loading: state =>state.loading,
        loadingDataList: state =>state.loadingDataList,
        error: state => state.error,
        success: state => state.success,
        validationErrors: state => state.validationErrors,
        data: state => state.data,
        dataList: state =>state.dataList,
        dataListTotal: state => state.dataListTotal,
        dataListLastPage: state => state.dataListLastPage,
      })  
  },

  methods: {

    handleDataListSearch: _.debounce(function(searching) {
      console.log('Searching ', searching);
      this.tableFilters.search = searching;
      this.tableFilters.page = 1;
      this.loadRecords();
    }, 2000),

    loadRecords(){
      // let payload = {};
      // this.dataTableFilterPayload = this.dataTableFilter;
      let payload = {
        ...this.tableFilters
      };
      this.$store.dispatch('fields/list', payload);
    },

    loadClientRecord(){
      let payload = {
        per_page: -1
      };
      this.$store.dispatch('clients/list', payload);
      console.log(this.clients)
    },

    handlePageChange(e){
      console.log(e)
    },

    createNewComponent(){
      console.log(this.form);
      this.$store.dispatch('fields/create', this.form)
      .then(result => {
        if (this.success !== false && this.error === false) {
          this.loadRecords();
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

    openCreateModal(){
      this.form ={
        name: '',
        description: '',
        qcp_ip: '',
        editmode: false
      };
      this.createModal = true;
    },

    editItem(item){
      this.form = {
        id: item.id,
        name: item.name,
        description: item.description,
        qcp_ip: item.qcp_ip,
        editmode : true
      };
      this.createModal = true;
    },

    updateComponentRecord(){
       let vm = this;
        this.$store.dispatch('fields/update', { id:this.form.id, payload: this.form}) 
        .then(result => {
          if (this.success !== false && this.error === false) {
            this.loadRecords();
            this.createModal = false;
            let msg = this.success;
            this.$swal.fire("", msg, "success").then(function() {
              
            });
          } else { 
            this.$refs.form.setErrors(this.validationErrors); // set VeeValidation error
            let msg = this.error;
            this.$swal.fire("", msg, "error");
          }
        }); 
    }

  }
}
</script>
