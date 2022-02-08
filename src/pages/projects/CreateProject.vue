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
                  <form action="" @submit.prevent="handleSubmit(createNewProject)">
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
                                      <CSelect 
                                        label="Well"  label-class="required"
                                        size="lg" v-model="form.well_id"
                                        :invalid-feedback="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        :options="tabs"
                                        placeholder="Choose Template"
                                      />
                                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                  </validation-provider>
                              </CCol> 
                            </CRow>
                            <CRow>
                              <CCol sm="12">
                                  <validation-provider  name="Job Type" rules="required" v-slot="validationContext">
                                    <CSelect 
                                      label="Job Type"
                                      size="lg" v-model="form.job_type_id"
                                      :invalid-feedback="validationContext.errors[0]"
                                      :class="{ 'is-invalid': validationContext.errors[0] }"
                                      :options="tabs"
                                      placeholder="Choose Job Type"
                                    />
                                  <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                            </CRow>

                            <CRow>
                              <CCol sm="6">
                              <validation-provider  name="Job Number" rules="required|integer" v-slot="validationContext">
                                <CInput
                                  label="Job Number*"
                                  size="lg" v-model="form.description" 
                                  :invalid-feedback="validationContext.errors[0]"
                                  :class="{ 'is-invalid': validationContext.errors[0] }"
                                  placeholder="Enter Job Number"/>
                                  <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>

                              </CCol> 
                              <CCol sm="6">
                                <validation-provider  name="Job Preparation Start Date" rules="required|after:yesterday "  v-slot="validationContext">
                                  <CInput
                                    size="lg" v-model="form.job_number"
                                     type="date"
                                    :invalid-feedback="validationContext.errors[0]"
                                    :class="{ 'is-invalid': validationContext.errors[0] }"
                                    label="Job Preparation Start Date"/>
                                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                              <CCol sm="6">
                                <validation-provider  name="Planned Loadout Date" rules="required|after:yesterday " v-slot="validationContext">
                                  <CInput
                                    size="lg" v-model="form.job_number"
                                     type="date"
                                    :invalid-feedback="validationContext.errors[0]"
                                    :class="{ 'is-invalid': validationContext.errors[0] }"
                                    label="Planned Loadout Date"/>
                                  
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
                            <div class="">
                               <CButton type="button"  class="mr-3 bg-blue-200 "> Add Equipments <CIcon class="pl-2" name="cil-check-circle"/> </CButton>
                               <CButton type="button"  class="mr-3" color="primary"> Import Backup <CIcon class="pl-2" name="cil-uploads"/> </CButton>
                               <CButton type="button"  class="mr-3 bg-gray-100"> <CIcon class="pl-2" name="cil-check-cicle"/> </CButton>
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
                                <CRow>
                                  <CCol sm="6">
                                      <validation-provider name="Role" rules="required" v-slot="validationContext">
                                          <CSelect 
                                            label="Role"  label-class="required"
                                            size="lg" v-model="form.well_id"
                                            :invalid-feedback="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            :options="tabs"
                                            placeholder="Select Role"
                                          />
                                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol> 
                                  <CCol sm="6">
                                      <validation-provider name="Employee" rules="required" v-slot="validationContext">
                                          <CSelect 
                                            label="Employee"  label-class="required"
                                            size="lg" v-model="form.well_id"
                                            :invalid-feedback="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            :options="tabs"
                                            placeholder="Select Employee"
                                          />
                                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol> 
                                </CRow>
                            </div>
                            <div class="flex my-3 justify-content-center">
                              <CButton type="button"  class="bg-blue-200 "> Add Equipments <CIcon class="pl-2" name="cil-plus"/> </CButton>
                            </div>
                             <div class="flex justify-content-end mt-5">
                                <CButton type="button"  color="primary"> Submit </CButton>
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
// border-r-2 border-fuchsia-600

export default {
  name: 'CreateProject',
  components: {},

  data () {
    return {
      tabs: [
        'Wells Data',
        'Equipment List',
        'Team'
      ],
      activeTab: 0,
      form : {
        well_id: null,
        job_type_id: null,
        job_number: null,
        job_tart: null,
        planned_loadout: null
      }
    }
  },

  mounted() {
    this.loadRecords()
  },

  computed:{
    
  },

  methods: {

    loadRecords(){
      let payload = {};
      // this.$store.dispatch('databases/list', payload);
    },

    createNewProject(){

    }
  }
}
</script>
