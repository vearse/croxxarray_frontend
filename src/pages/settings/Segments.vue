<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <div class="col-8">
              <h4 class="h4 ml-3 font-bold">Business Units</h4>
            </div>
            <div class="col-4">
                <div class="float-right">
                  <CButton class="bg-croxx-secondary rounded-10p mr-3  shadow-sm" @click="openCreateModal()">Create</CButton>
                </div>
            </div> 
        </div> 
        <div class="my-5">
          <div class="col-md-9 col-sm-12 mx-auto">
            
              <div class="">
                <CListGroup class="my-1">
                  <CListGroupItem class="bg-croxx-secondary rounded-md  my-1 ">
                    <div class="row mx-0">
                      <div class="col-5">
                        <h5 class="font-bold">Name</h5>
                      </div>
                      <div class="col-7">
                        <h5 class="font-bold"> Description</h5>
                      </div>
                    </div>
                  </CListGroupItem>

                  
                  <CListGroupItem  @click="editItem(item)"
                    v-for="(item, i) in dataList" :key="i"
                    class="rounded-md bg-white my-1">
                    <div class="row mx-0">
                      <div class="col-5">
                        <h5 class="">{{item.name}} </h5>
                      </div>
                      <div class="col-7">
                        <h5 class=""> {{item.description}}</h5>
                      </div>
                    </div> 
                  </CListGroupItem>

                </CListGroup>
              </div>
          </div>
        </div>
    </div>
    <!-- Create -->
    <CModal
      :show.sync="createModal"
      :centered="true" 
    >
      <template slot="header">
          <h5 class="h5 bold">{{ (form.editmode) ? 'Edit' : 'Create'  }}  Business Unit</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="createModal=false"	>X</button>
      </template>
      
       <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
          <form  @submit.prevent="form.editmode ? handleSubmit(updateComponentRecord) : handleSubmit(createNewComponent)">
              <CRow>
                <CCol sm="12">
                  <validation-provider   name="Name" rules="required|min:3"
                    v-slot="validationContext">
                    <CInput
                      v-model="form.name" label="Name" 
                      :invalid-feedback="validationContext.errors[0]"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      placeholder="Name"
                    />
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <CRow>
                <CCol sm="12">
                   <validation-provider v-slot="validationContext">
                      <CTextarea
                        v-model="form.description"
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        label="Description"
                        placeholder="Description"
                        class="croxx-textarea-sm"  
                      /> 
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol>  
              </CRow>

                <div class="py-3 float-right">
                  <CButton  type="submit" button="submit"  
                      class="ml-auto mt-2 bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">{{ (form.editmode) ? 'Update' : 'Save'  }}  </CButton>
                      
                  <!-- <CButton v-if="!form.editmode" type="submit" button="submit"  :disabled="!invalid"
                      class="ml-auto mt-2 bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">Save</CButton> -->
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
  name: 'Segments',
  components: {},

  data () { 
    return {
       createModal: false,
       form: {
         id: null,
         name: '', 
         description: '',
         editmode: false,
       },
    }
  },

  mounted() {
    this.loadRecords();
  },

  computed:{
      ...mapState('segments', {
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
    
    loadRecords(){
      let payload = {};    
      this.$store.dispatch('segments/list', payload);
    },

    createNewComponent(){
      let vm = this;
      this.$store.dispatch('segments/create', this.form) 
        .then(result => {
          if (this.success !== false && this.error === false) {
            this.loadRecords();
            let msg = this.success;
            this.createModal = false;
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
         id: null,
         name: '',
         description: '',
        editmode : false
      };
       this.createModal = true;
    },

    editItem(item){
      this.form = {
        id: item.id,
        name: item.name,
        description: item.description,
        editmode : true
      };
      this.createModal = true;
    },

    updateComponentRecord(){
       let vm = this;
        this.$store.dispatch('segments/update', { id:this.form.id, payload: this.form}) 
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
