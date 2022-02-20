<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <h4 class="h4 ml-3">Create SubAssembly</h4>
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
                            <p class="small">
                              Step 1 / 4
                            </p>
                            <h4 class="h4 py-2 bold">Template Details</h4>
                            <CRow>
                              <CCol sm="12">
                                  <validation-provider name="Name" rules="required" v-slot="validationContext">
                                      <CInput 
                                        label="Name"  label-class="required"
                                        size="lg" v-model="form.well_id"
                                        :invalid-feedback="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        placeholder="Choose Template"
                                      />
                                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                  </validation-provider>
                              </CCol> 
                            </CRow>
                            <CRow>
                              <CCol sm="12">
                                  <validation-provider  name="Description" rules="required" v-slot="validationContext">
                                    <CInput 
                                      label="Description"
                                      size="lg" v-model="form.job_type_id"
                                      :invalid-feedback="validationContext.errors[0]"
                                      :class="{ 'is-invalid': validationContext.errors[0] }"
                                      placeholder="Description"
                                    />
                                  <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                            </CRow>

                            <!-- <CRow>
                              <CCol sm="12" class="my-2">  
                                  <validation-provider  name="Accepteance Criteria" rules="required|max:500" v-slot="validationContext">
                                  <label for="uid-78dm4967fch" class="col-form-label-lg"> Accepteance Criteria </label>
                                    <vue-editor
                                      id="input-description"
                                      v-model.trim="form.description"     
                                      placeholder="Provide more details here..."
                                      maxlength="500" rows="2"
                                      :invalid-feedback="validationContext.errors[0]"
                                      :class="{ 'is-invalid': validationContext.errors[0] }"
                                      :state="(validationContext)" trim
                                      size="sm"
                                    /> <br>
                                  <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                            </CRow> -->
                            <div class="flex justify-content-end">
                                <CButton type="button"  color="primary" @click="activeTab = 1"> Next Step </CButton>
                            </div>
                        </div>
                      </CTab>
                      <CTab> 
                        <template slot="title">
                          <span class="">{{tabs[1]}}</span> 
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        <div class="container my-4">
                            <p class="small">
                              Step 2 / 4
                            </p>
                            <h4 class="h4 py-2 bold"> Checklist Questions</h4>
                            <div class="">
                             
                              <div class="my-3">
                                  <h4 class="h4 py-2 bold "> Approvers</h4>
                                  <CRow>
                                  <CCol v-for="(group,i) in group_roles" :key="i" md="4">
                                        <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold"> </label>
                                        <!-- <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold">  {{ groups.find( x =>x.id == i) }} </label> -->
                                      <div  v-for="(role,r) in group_roles[i]" :key="r"
                                        role="group" class="mb-2 form-check"
                                        ><input id="uid-kqjzgs10s7p" type="checkbox" v-model="form.approvers" class="form-check-input" :value="role.id">
                                        <label for="uid-kqjzgs10s7p" class="form-check-label"  v-text="role.name" />
                                      </div>
                                      
                                  </CCol> 
                                </CRow>
                              </div>

                              <div class="my-3">
                                  <h4 class="h4 py-2 bold "> Segments</h4>
                                  <CRow>
                                    <CCol md="4">
                                        <validation-provider name="Role" rules="required" v-slot="validationContext">
                                              <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold">  Criteria </label>
                                            <CInputCheckbox
                                                  v-for="(option, optionIndex) in 6"
                                                  :key="optionIndex"
                                                  :label="`Option ${option}`"
                                                  :value="option"
                                                  :custom="true"
                                                  :name="`Option 1${option}`"
                                                  :checked="optionIndex === option"
                                                />
                                          <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                        </validation-provider>
                                    </CCol> 
                                  </CRow>
                              </div>


                              <div class="mt-4 flex justify-content-end">
                                  <CButton type="button"  color="primary" @click="activeTab = 2"> Next Step </CButton>
                              </div>
                            </div>
                        </div>
                      </CTab>
                      <CTab>
                        <template slot="title">
                          {{tabs[2]}} 
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        
                        <div class="container my-4">
                            <p class="small">
                              Step 3 / 4
                            </p>
                            <h4 class="h4 py-2 bold"> Inclusions</h4>

                            <div class="tab-members" style="height: 300px;">
                                <CTabs>
                                  <CTab  class="col text-center" title="Details" active>
                                    <div class="my-3 text-left">
                                      <p class="text-xs text-italic">In this section you should add general input fields and measurement information item should include</p>
                                      <div>
                                        <CInputCheckbox
                                            v-for="(option, optionIndex) in 2"
                                            :key="optionIndex"
                                            :label="`Option ${option}`"
                                            :value="option"
                                            :custom="true"
                                            :name="`Option 1${option}`"
                                            :inline="true"
                                            :checked="optionIndex === option"
                                          />
                                      </div>
                                    </div>
                                      <div class=" my-3 justify-content-center">
                                        <CButton type="button"  class="text-blue bg-transparent"> Add Fields <CIcon class="pl-2" name="cil-plus"/> </CButton>
                                      </div>
                                  </CTab>
                                  <CTab  class="col text-center" title="CheckSheet" >
                                    2. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                    officia deserunt mollit anim id est laborum.
                                  </CTab>
                                  <CTab  class="col text-center" title="Approvals" >
                                    3. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                                    officia deserunt mollit anim id est laborum.
                                  </CTab>
                                </CTabs>
                            </div>

                            <div class=""  style="height: 200px;"> 
                              
                                <CTabs>
                                  <CTab  title="Subcomponents" active>
                                    <div class="my-3 text-left">
                                      <p class="text-xs text-italic">In this section you should add general input fields and measurement information item should include</p>
                                      <div>
                                        <CInputCheckbox
                                              v-for="(option, optionIndex) in 2"
                                              :key="optionIndex"
                                              :label="`Option ${option}`"
                                              :value="option"
                                              :custom="true"
                                              :name="`Option 1${option}`"
                                                :inline="true"
                                              :checked="optionIndex === option"
                                            />
                                      </div>
                                    </div>
                                      <div class=" my-3 justify-content-center">
                                        <CButton type="button"  class="text-blue bg-transparent"> Add Fields <CIcon class="pl-2" name="cil-plus"/> </CButton>
                                      </div>
                                  </CTab>
                                </CTabs>
                            </div>


                              <div class="mt-4 flex justify-content-end">
                                  <CButton type="button"  color="primary" @click="activeTab = 3"> Next Step </CButton>
                              </div>
                        </div>
                      </CTab>
                      <CTab>
                        <template slot="title">
                          {{tabs[3]}} 
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        
                        <div class="container my-4">
                            <p class="small">
                              Step 4 / 4
                            </p>
                            <h4 class="h4 py-2 bold "> Make Up Plan</h4>

                            <div class="my-3">
                                 <CTabs>
                                  <CTab  title="Subcomponents" active>
                                    <div class="my-3 text-left">
                                      <p class="text-xs text-italic">In this section you should add general input fields and measurement information item should include</p>
                                      <div class="mt-2">
                                        <CInputCheckbox
                                              v-for="(option, optionIndex) in 2"
                                              :key="optionIndex"
                                              :label="`Option ${option}`"
                                              :value="option"
                                              :custom="true"
                                              :name="`Option 1${option}`"
                                                :inline="true"
                                              :checked="optionIndex === option"
                                            />
                                      </div>
                                    </div>
                                      <div class=" my-3 justify-content-center">
                                        <CButton type="button"  class="text-blue bg-transparent"> Add Fields <CIcon class="pl-2" name="cil-plus"/> </CButton>
                                      </div>
                                  </CTab>
                                </CTabs>
                            </div>

                            
                              <div class="mt-4 flex justify-content-end">
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
        'Template Details',
        'Approvers',
        'Inclusions',
        'Make-up Plan'
      ],
      activeTab: 2,
      categories: Object.values(this.$store.state.componentCategories.dataList),
      types: Object.values(this.$store.state.componentTypes.dataList),
      group_roles: (this.$store.state.roles.dataGrouped),
      form : {
        name: '',
        shortname: '',
        type: null,
        category: null,
        description: null,

        questions: [],
        checksheet: [],
        access:[],
        approvers: [],
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
