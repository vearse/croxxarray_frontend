<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <div class="col-8">
              <h4 class="h4 ml-3 font-bold">Groups</h4>
            </div>
            <div class="col-4">
                <div class="float-right">
                  <CButton class="bg-croxx-secondary rounded-10p mr-3  shadow-sm" @click="createModal = true">Create</CButton>
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

                  <CListGroupItem  
                    v-for="(group, i) in dataList" :key="i"
                    @click="editItem(group)"
                    class="rounded-md hover-shadow-sm bg-white my-1"> 
                    <div class="row mx-0"> 
                      <div class="col-5">
                        <h5 class="">{{group.name}} {{group.admin_id}} </h5>
                      </div>
                      <div class="col-7">
                        <h5 class=""> {{group.description}}</h5>
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
          <h5 class="h5 bold">{{ (form.editmode) ? 'Edit' : 'Create'  }} Group</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="createModal=false"	>X</button>
      </template> 
       <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
          <form  @submit.prevent="form.editmode ? handleSubmit(updateComponentRecord) : handleSubmit(createNewGroup)">
              <CRow>
                <CCol sm="12">
                  <validation-provider name="Group Name" rules="required"
                    v-slot="validationContext">
                    <CInput
                      v-model="form.name" label="Name" 
                      :invalid-feedback="validationContext.errors[0]"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      placeholder="Group Name"
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
                        placeholder="Group Description"
                        class="croxx-textarea-sm"  
                      /> 
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol>  
              </CRow>

                <div class="py-3 float-right">
                  <CButton type="submit" button="submit"  
                      class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">
                    {{ (form.editmode) ? 'Update' : 'Save'  }}    
                  </CButton>
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
  name: 'Groups',
  components: {},

  data () {
    return {
       createModal: false,
       form: {
         name: '',
         description: '',
       },
    }
  },

  mounted() {
    this.loadRecords()
  },

  computed:{
      ...mapState('groups', {
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
      this.$store.dispatch('groups/list', payload);
    },

    createNewGroup(){
       let vm = this;
        this.$store.dispatch('groups/create', this.form) 
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
         id: null,
         name: '',
         description: '',
         editmode : false
      };
      this.createModal = true;
    },

    editItem(item){
      console.log(item);
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
        this.$store.dispatch('groups/update', { id:this.form.id, payload: this.form}) 
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
