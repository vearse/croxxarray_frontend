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
                            
                            <CRow class="mt-2">
                              <CCol sm="12">
                                <validation-provider  name="Description" rules="max:512" v-slot="validationContext">
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
                            <div class="">
                             
                             <div class="my-3">
                                <h4 class="h4 py-2 bold "> Approvers</h4>
                                 <CRow>
                                        <!-- <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold">  {{ groups.find( x =>x.id == i) }} </label> -->
                                  <CCol v-for="(group,i) in group_roles" :key="i" md="4">
                                      <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold"> </label>
                                      <div  v-for="(role,r) in group_roles[i]" :key="r" role="group" class="mb-2 form-check">
                                        <input id="uid-kqjzgs10s7p" type="checkbox" v-model="form.approvers" class="form-check-input" :value="role.id">
                                        <label for="uid-kqjzgs10s7p" class="form-check-label"  v-text="role.name" />
                                      </div>
                                  </CCol> 
                                </CRow>
                              </div>

                              <div class="my-3">
                                  <h4 class="h4 py-2 bold "> Segments</h4>
                                  <CRow>
                                    <CCol md="4">
                                        <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold"> </label>
                                        <div  v-for="(segment,r) in segments" :key="r" role="group" class="mb-2 form-check">
                                          <input id="uid-kqjzgs10s7p" type="checkbox" v-model="form.segments" class="form-check-input" :value="segment.id">
                                          <label for="uid-kqjzgs10s7p" class="form-check-label"  v-text="segment.name" />
                                        </div>
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
                                          <draggable v-model="form.questions">
                                              <transition-group name="fade" tag="div" class="mt-3 instruments">
                                                  <div v-for="(question, id) in form.questions" :key="id">
                                                    <CListGroupItem 
                                                        class="px-0 hover-shadow-sm bg-transparent border-none" style="height: 36px">
                                                        <div class="row mx-0">
                                                          <div class="col-5">
                                                            <p class="text-sm truncate">{{question.name}} </p>
                                                          </div>
                                                          <div class="col-3">
                                                            <p class="text-sm truncate"> {{question.type}}</p>
                                                          </div>
                                                          <div class="col-2">
                                                            <p class="text-sm truncate"> {{question.unit}}</p>
                                                          </div>
                                                          <div class="col-2">
                                                            <p class="text-sm truncate"> 
                                                              <CIcon class="pr-2" name="cil-cursor-move"/> 
                                                              <CIcon class="pr-2" name="cil-trash"/> 
                                                              <CIcon class="pr-2" name="cil-user"/> 
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </CListGroupItem>
                                                  </div>
                                              </transition-group>
                                          </draggable>
                                        </div>
                                          <div class="d-flex my-3 justify-content-left">
                                            <AddQuestion class="ml-3"  @newQuestion="loadNewQuestion"/> 
                                          </div>
                                      </div>
                                      <!-- <div class=" my-3 justify-content-center">
                                        <CButton type="button"  class="text-blue bg-transparent"> Add Fields <CIcon class="pl-2" name="cil-plus"/> </CButton>
                                      </div>  -->
                                  </CTab>
                                  <CTab  class="col text-center" title="CheckSheet" >
                                    
                                    <div class="mt-2  text-left">
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
                                      <div>
                                        <draggable v-model="form.checksheet">
                                            <transition-group name="fade" tag="div" class="mt-3 instruments">
                                                <div v-for="(checklist, id) in form.checksheet" :key="id">
                                                  <CListGroupItem 
                                                      class="px-0 hover-shadow-sm bg-transparent border-none" style="height: 36px">
                                                      <div class="row mx-0">
                                                        <div class="col-6">
                                                          <p class="text-sm truncate">{{checklist}} </p>
                                                        </div>
                                                        <div class="col-4">
                                                          <p class="text-sm truncate"> {{checklist}}</p>
                                                        </div>
                                                        <div class="col-2">
                                                          <p class="text-sm truncate"> 
                                                            <CIcon class="pr-2" name="cil-cursor-move"/> 
                                                            <CIcon class="pr-2" name="cil-trash"/> 
                                                            <CIcon class="pr-2" name="cil-user"/> 
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </CListGroupItem>
                                                </div>
                                            </transition-group>
                                        </draggable>
                                      </div>
                                      <div class="d-flex my-3 justify-content-left">
                                        <AddField class="ml-3"  @addChecklist="loadFields"/> 
                                      </div>
                                  </CTab>
                                  <CTab  class="col text-center" title="Approvals" >
                                      <div class=""></div>
                                  </CTab>
                                </CTabs>
                            </div>

                            <div class=""  style="height: 200px;"> 
                              
                                <CTabs>
                                  <CTab  title="Subcomponents" active>
                                    
                                    <div class="mt-2  text-left">
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
                                     <div>
                                        <draggable v-model="form.checksheet">
                                            <transition-group name="fade" tag="div" class="mt-3 instruments">
                                                <div v-for="(checklist, id) in form.checksheet" :key="id">
                                                  <CListGroupItem 
                                                      class="px-0 hover-shadow-sm bg-transparent border-none" style="height: 36px">
                                                      <div class="row mx-0">
                                                        <div class="col-6">
                                                          <p class="text-sm truncate">{{checklist}} </p>
                                                        </div>
                                                        <div class="col-4">
                                                          <p class="text-sm truncate"> {{checklist}}</p>
                                                        </div>
                                                        <div class="col-2">
                                                          <p class="text-sm truncate"> 
                                                            <CIcon class="pr-2" name="cil-cursor-move"/> 
                                                            <CIcon class="pr-2" name="cil-trash"/> 
                                                            <CIcon class="pr-2" name="cil-user"/> 
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </CListGroupItem>
                                                </div>
                                            </transition-group>
                                        </draggable>
                                      </div>
                                      <div class="d-flex my-3 justify-content-left">
                                        <AddSubcomponent class="ml-3"  @addChecklist="loadFields"/> 
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
import AddQuestion from '../../components/AddQuestion.vue';
import AddField from '../../components/AddField.vue';

import AddSubcomponent from '../../components/AddSubcomponent.vue';
import draggable from 'vuedraggable'

export default {
  name: 'CreateSubAssembly',
  components: {
    AddQuestion,
    AddField,
    AddSubcomponent,
    draggable
  },

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
      segments: Object.values(this.$store.state.segments.dataList),
      group_roles: (this.$store.state.roles.dataGrouped),
      form : {
        name: '',
        description: null,
        shortname: '',
        segments: null,

        questions: [],
        checksheet: [],
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

    loadFields(fields){
      this.form.checksheet = fields;
    },
    
    loadNewQuestion(question){
      this.form.questions.unshift(question)
    },

    createNewProject(){

    }
  }
}
</script>
