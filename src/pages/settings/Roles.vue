<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <div class="col-8">
              <h4 class="h4 ml-3 font-bold">Roles</h4>
            </div>
            <div class="col-4">
                <div class="float-right">
                  <CButton class="bg-croxx-secondary rounded-10p mr-3  shadow-sm" @click="createModal = true">Create</CButton>
                </div>
            </div> 
        </div> 
        <div class="my-5">
          <div class="col-md-10 col-sm-12 mx-auto">
            
              <div class="">
                <CListGroup class="my-1">
                  <CListGroupItem class="bg-croxx-secondary rounded-md  my-1 ">
                    <div class="row mx-0">
                      <div class="col-3">
                        <h5 class="font-bold">Group</h5>
                      </div>
                      <div class="col-3">
                        <h5 class="font-bold">Name</h5>
                      </div>
                      <div class="col-4">
                        <h5 class="font-bold"> Description</h5>
                      </div>
                      <div class="col-2">
                        Piority
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem class="rounded-md bg-white my-1"
                      @click="editItem(role)"
                      v-for="(role, i) in dataList" :key="i">
                    <div class="row mx-0">
                      <div class="col-3"> 
                        <h5 class=""> <span v-if="role.group">{{role.group.name}}</span> </h5>
                      </div> 
                      <div class="col-3">
                        <h5 class=""> {{role.name}} </h5>
                      </div>
                      <div class="col-4">
                        <p>{{role.description}}</p>
                      </div>
                      <div class="col-2">
                        <span class="bg-success px-3 py-1 rounded-md text-capitalize">
                          {{role.piority}}
                        </span>
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
          <h5 class="h5 bold">{{ (form.editmode) ? 'Edit' : 'Create'  }}  Role</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="createModal=false">X</button>
      </template>
     <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
        <form  @submit.prevent="form.editmode ? handleSubmit(updateComponentRecord) : handleSubmit(createNewRole)">
            <CRow>
              <CCol sm="12">
                 <validation-provider name="Role Name" rules="required"
                    v-slot="validationContext">
                    <CInput
                      :invalid="validationContext.errors[0]"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      v-model="form.name" label="Name"
                      placeholder="Name of Role"
                    />
                     <span class="text-danger" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                 </validation-provider>
              </CCol> 

              <CCol sm="12">
                  <div role="group" class="form-group">
                    <validation-provider name="Role Description" rules="required"
                      v-slot="validationContext">
                        <label for="uid-mu3370ovqhi" class=""> Groups </label>
                        <select 
                          :invalid="validationContext.errors[0]"
                          :class="{ 'is-invalid': validationContext.errors[0] }"
                          v-model="form.group_id" id="uid-mu3370ovqhi" vertical="" class="form-control">
                            <option value="" selected="selected" hidden="hidden"> Please select </option> 
                            <option :key="group.id" :value="group.id" v-for="group in groups" >{{group.name}} </option>
                        </select>
                    </validation-provider>
                  </div>
                
              </CCol>

              <CCol sm="12">
                <validation-provider name="Rele Description Name" rules=""
                      v-slot="validationContext">
                    <CTextarea
                     :invalid="validationContext.errors[0]"
                      :class="{ 'is-invalid': validationContext.errors[0] }"
                      v-model="form.description"
                      label="Description"
                      placeholder="Description of  Database"
                      class="croxx-textarea-sm"  
                    /> 
                </validation-provider>
              </CCol>  
               <CCol>
                 <CButton type="button" size="sm" class="mr-3" :color="form.piority == 'moderate' ? 'info' : 'gray'" @click="form.piority = 'moderate'" > Moderate</CButton>
                 <CButton type="button" size="sm" class="mr-3" :color="form.piority == 'high' ? 'yellow' : 'gray'" @click="form.piority = 'high'" > High</CButton>
                 <CButton type="button" size="sm" class="mr-3" :color="form.piority == 'very high' ? 'success' : 'gray'" @click="form.piority = 'very high'" > Very High</CButton>
              </CCol>

            </CRow>

            <div class="py-3 float-right">
              <CButton type="submit" button="submit" 
                  class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm"> {{ (form.editmode) ? 'Update' : 'Save'  }}</CButton>
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
  name: 'Roles',
  components: {},

  data () {
    return {
       createModal: false,
       form: {
         name: '',
         group_id: '',
         piority: '',
         description: '',
         editmode: false,
       },
       groups: Object.values(this.$store.state.groups.dataList),
       systemDatabase: [
         {name: 'Segments', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Clients', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Fields', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Platforms', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Wells', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Job Types', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Completion Types', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'}
       ]
    }
  },

  mounted() {
    this.loadGroups();
    this.loadRecords();
  },

  computed:{
      ...mapState('roles', {
        loading: state =>state.loading,
        loadingDataList: state =>state.loadingDataList,
        error: state => state.error,
        success: state => state.success,
        validationErrors: state => state.validationErrors,
        data: state => state.data,
        dataList: state => state.dataList,
        dataListTotal: state =>state.dataListTotal,
      })  
  },

  methods: {
    
    loadRecords(){
      let payload = {
        per_page : -1
      }; 
      this.$store.dispatch('roles/list', payload);
    },

    loadGroups(){
       if (
        this.$store.state.groups.dataList.length <= 0 &&
        this.$store.state.groups.loadingDataList !== true
      ) {
        let payload = {
          per_page: "all", // -1 or all = all records
          sort_by: "name",
          sort_dir: "asc",
          archived: "no"
        };
        this.$store.dispatch('groups/list', payload);
      }
    },
 
    createNewRole(){
      this.$store.dispatch('roles/create', this.form)
      .then(() => {
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
        group_id: item.group_id,
        description: item.description,
        editmode : true
      };
      this.createModal = true;
    },

    updateComponentRecord(){ 
        this.$store.dispatch('roles/update', { id:this.form.id, payload: this.form}) 
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
