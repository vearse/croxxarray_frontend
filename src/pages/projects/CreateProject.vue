<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <h4 class="h4 ml-3">Create Project</h4>
        </div> 
        <div class="my-3">
            <CCard  class="box-croxx">
              <CCardBody>
                <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
                  <form action="" @submit.prevent="createNewProject()">
                    <CTabs variant="" id="croxx-tab" vertical 
                      :active-tab.sync="activeTab" style="min-height: 500px;">
                      <CTab active>
                        <template slot="title">
                          {{tabs[0]}} 
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        <div class="container my-4">
                            <p>
                              Step 1 / 3
                            </p>
                            <h4 class="h4 py-2 bold"> Choose from a pre-made Template</h4>
                            <CRow>
                              <CCol sm="12">
                                  <validation-provider name="Well" rules="required" v-slot="validationContext">
                                      <select 
                                          :invalid="validationContext.errors[0]"
                                          :class="{ 'is-invalid': validationContext.errors[0] }"
                                          v-model="form.well_id" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                          <option value="" selected="selected"> Please Select </option> 
                                          <option :key="well.id" :value="well.id" v-for="well in wells" >{{well.name}} </option>
                                      </select>
                                      <br>
                                      <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                  </validation-provider>
                              </CCol> 
                            </CRow>
                            <CRow>  
                              <CCol sm="12">
                                  <validation-provider  name="Job Type" rules="required" v-slot="validationContext">
                                    <select 
                                        :invalid="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        v-model="form.job_type_id" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                        <option value="" selected="selected"> Please Select </option> 
                                        <option :key="job_type.id" :value="job_type.id" v-for="job_type in job_types" >{{job_type.name}} </option>
                                    </select>
                                    <br>
                                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                            </CRow>

                            <CRow>
                              <CCol sm="6">
                                <validation-provider  name="Job Number" rules="required|integer" v-slot="validationContext">
                                  <CInput
                                    label="Job Number"
                                    size="lg" v-model="form.job_number" 
                                    :invalid-feedback="validationContext.errors[0]"
                                    :class="{ 'is-invalid': validationContext.errors[0] }"
                                    placeholder="Enter Job Number"/>
                                      <br>
                                      <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                              <CCol sm="6">
                                <validation-provider  name="Job Preparation Start Date" rules="required"  v-slot="validationContext">
                                  <CInput
                                    size="lg" v-model="form.job_start"
                                     type="date"
                                    :invalid-feedback="validationContext.errors[0]"
                                    :class="{ 'is-invalid': validationContext.errors[0] }"
                                    label="Job Preparation Start Date"/>
                                      <br>
                                      <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                              <CCol sm="6">
                                <validation-provider  name="Planned Loadout Date" rules="required" v-slot="validationContext">
                                  <CInput
                                    size="lg" v-model="form.planned_loadout"
                                     type="date"
                                    :invalid-feedback="validationContext.errors[0]"
                                    :class="{ 'is-invalid': validationContext.errors[0] }"
                                    label="Planned Loadout Date"/>
                                  
                                    <br>
                                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                            </CRow>
                            <div class="flex justify-content-end mt-5">
                                <CButton type="button"  color="primary" @click="activeTab = 1"> Next > </CButton>
                            </div>
                        </div>
                      </CTab>


                      <CTab> 
                        <template slot="title">
                          <span class="">{{tabs[1]}}</span> 
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        <div class="container my-4">
                            <p>
                              Step 2 / 3
                            </p>
                            <h4 class="h4 py-2 bold"> Add Equipments</h4>
                            <div class="d-flex">
                               <!-- <CButton type="button"  class="mr-3 bg-blue-200 "> Add Equipments <CIcon class="pl-2" name="cil-check-circle"/> </CButton> -->
                               <AddSubcomponent class="mr-3" @addSubcomponent="loadEquipments" /> 
                               <CButton type="button"  class="mt-4 mr-3" color="primary"> Import Backup <CIcon class="pl-2" name="cil-uploads"/> </CButton>
                               <CButton type="button"  class="mt-4 mr-3 bg-gray-100"> <CIcon class="pl-2" name="cil-check-cicle"/> </CButton>
                            </div>
                            
                            <div class="flex justify-content-end mt-5">
                                <CButton type="button"  color="primary" @click="activeTab = 2"> Next > </CButton>
                            </div>
                        </div>
                      </CTab>
                      
                      <CTab>
                        <template slot="title">
                          {{tabs[2]}}  
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        
                        <div class="container my-4">
                            <p>
                              Step 3 / 3
                            </p>
                            <h4 class="h4 py-2 bold"> Add Team Members</h4>

                            <div class="team-members">
                                <CRow v-for="(team, i) in form.teams" :key="i">
                                  <CCol sm="6">
                                      <validation-provider name="Role" rules="required" v-slot="validationContext">
                                        <select 
                                            :invalid="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            v-model="team.role" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                            <option value="" selected="selected"> Select Role </option> 
                                            <option :key="role.id" :value="role.id" v-for="role in roles" >{{role.name}} </option>
                                        </select>
                                          <br>
                                          <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol> 
                                  <CCol sm="6">
                                      <validation-provider name="Employee" rules="required" v-slot="validationContext">
                                        <select 
                                            :invalid="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            v-model="team.employee" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                            <option value="" selected="selected"> Select Employee </option> 
                                            <option :key="employee.id" :value="employee.id" v-for="employee in employees" >{{employee.firstname}} {{employee.lastname}} </option>
                                        </select>
                                          <br>
                                          <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol> 
                                </CRow>
                            </div>
                            <div class="flex my-3 justify-content-center">
                              <CButton type="button"  class="bg-blue-200 " @click="form.teams.push({name: '', employee: ''})"> Add Team <CIcon class="pl-2" name="cil-plus"/> </CButton>
                            </div>
                             <div class="flex justify-content-end mt-5">
                                <CButton type="submit"  color="primary"> Submit </CButton>
                            </div>
                        </div>
                      </CTab>
                    </CTabs>
                  </form>
                </validation-observer>
              </CCardBody>
            </CCard>
        </div>
    </div>

  </div>
</template>
<style scoped>

</style>
<script>
import { mapState } from 'vuex'
import AddSubcomponent from '../../components/AddSubcomponent.vue';

export default {
  name: 'CreateProject',
  components: {
    AddSubcomponent
  },

  data () {
    return {
      tabs: [
        'Wells Data',
        'Equipment List',
        'Team'
      ],
      activeTab: 0,
      roles: Object.values(this.$store.state.roles.dataList),
      wells: Object.values(this.$store.state.wells.dataList),
      employees: Object.values(this.$store.state.users.dataList),
      job_types: Object.values(this.$store.state.jobTypes.dataList),
      
      form : {
        well_id: "",
        job_type_id: "",
        job_number: "",
        job_start: "",
        planned_loadout: "",
        equipments: [],
        teams: [
          {role: '', employee: ''}
        ]
      }
    }
  },

  mounted() {
    this.loadRecords()
  },

  computed:{
    
  },

  methods: {

    loadEquipments(fields){
      console.log(fields);
      this.form.equipments = fields;
    },
    loadRecords(){
      let payload = {};
      // this.$store.dispatch('databases/list', payload);
    },

    createNewProject(){
      console.log(this.form);
      
      this.$store.dispatch("projects/create", this.form)
        .then(() => {
            if (this.success !== false && this.error === false) {
            this.loadRecords();
            this.$router.push({ name: "" });
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
    }
  }
}
</script>
