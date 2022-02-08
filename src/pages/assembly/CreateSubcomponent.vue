<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <h4 class="h4 ml-3">Create SubComponent</h4>
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
                            <h4 class="h4 py-2 bold">Item Template</h4>
                            <CRow>
                              <CCol sm="12">
                                  <validation-provider name="Name" rules="required" v-slot="validationContext">
                                      <CInput 
                                        label="Name"  label-class="required"
                                        size="lg" v-model="form.name"
                                        :invalid-feedback="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        placeholder="Choose preferred name for Template"
                                      />
                                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                  </validation-provider>
                              </CCol> 
                              
                              <CCol sm="12">
                                  <validation-provider name="Shortname" rules="required" v-slot="validationContext">
                                      <CInput 
                                        label="Shortname"  label-class="required"
                                        size="lg" v-model="form.shortname"
                                        :invalid-feedback="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        placeholder="Choose preferred shortname"
                                      />
                                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                  </validation-provider>
                              </CCol> 
                            </CRow>

                            <CRow class="mb-4">
                              <CCol sm="12">
                                  <validation-provider name="Type" rules="required"
                                    v-slot="validationContext">
                                      <label for="uid-mu3370ovqhi" class=""> Type </label>
                                      <select 
                                        :invalid="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        v-model="form.type" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                          <option value="" selected="selected" hidden="hidden"> Please select </option> 
                                          <option :key="type.id" :value="type.id" v-for="type in types" >{{type.name}} </option>
                                      </select>
                                     <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                  </validation-provider>
                              </CCol> 
                            </CRow>
                            <CRow>
                              <CCol sm="12">
                                  <validation-provider name="Category" rules="required"
                                    v-slot="validationContext">
                                      <label for="uid-mu3370ovqhi" class=""> Category </label>
                                      <select  
                                        :invalid="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        v-model="form.category" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                          <option value="" selected="selected" hidden="hidden"> Please select </option> 
                                          <option :key="category.id" :value="category.id" v-for="category in categories" >{{category.name}} </option>
                                      </select>
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

                            <div class="mt-4 flex justify-content-end">
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
                              <CListGroup class="my-1">
                                <CListGroupItem class="bg-croxx-secondary rounded-md" >
                                  <div class="row mx-0">
                                    <div class="col-5">
                                      <h5 class="font-bold">Question</h5>
                                    </div>
                                    <div class="col-3">
                                      <h5 class="font-bold"> Input Type</h5>
                                    </div>
                                    <div class="col-2">
                                      <h5 class="font-bold"> Unit</h5>
                                    </div>
                                    <div class="col-2">
                                      <h5 class="font-bold"> </h5>
                                    </div>
                                  </div>
                                </CListGroupItem>
                                
                                <CListGroupItem  v-for="i in 6" :key="i"
                                  class="px-0 hover-shadow-sm bg-transparent border-none" style="height: 36px">
                                  <div class="row mx-0">
                                    <div class="col-5">
                                      <p class="text-sm truncate">Was Oil quage  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, minus.</p>
                                    </div>
                                    <div class="col-3">
                                      <p class="text-sm truncate"> Radio</p>
                                    </div>
                                    <div class="col-2">
                                      <p class="text-sm truncate"> cm</p>
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

                              </CListGroup>

                              <div class="flex my-3 justify-content-center">
                                <CButton type="button"  class="bg-blue-200 "> Add Questions <CIcon class="pl-2" name="cil-plus"/> </CButton>
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
                            <h4 class="h4 py-2 bold"> Add Verifiers</h4>

                            <div class="team-members">
                                <CRow>
                                  <CCol sm="6">
                                      <validation-provider name="Approval TYpe" rules="required" v-slot="validationContext">
                                          <CSelect 
                                            label="Approval TYpe"  label-class="required"
                                            size="lg" v-model="form.well_id"
                                            :invalid-feedback="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            :options="tabs"
                                            placeholder="Select Approval TYpe"
                                          />
                                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol> 
                                  <CCol sm="6">
                                      <validation-provider name="Job Role" rules="required" v-slot="validationContext">
                                          <CSelect 
                                            label="Job Role"  label-class="required"
                                            size="lg" v-model="form.well_id"
                                            :invalid-feedback="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            :options="tabs"
                                            placeholder="Select Job Role"
                                          />
                                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol> 
                                </CRow>
                            </div>
                            <div class="flex my-3 justify-content-center">
                              <CButton type="button"  class="bg-blue-200 "> Add Verifiers <CIcon class="pl-2" name="cil-plus"/> </CButton>
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

                            <div class="my-3">
                                <h4 class="h4 py-2 bold "> Attn / Access</h4>
                                <CRow>
                                  <CCol v-for="i in 4" :key="i" md="4">
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

                            <div class="my-3">
                                <h4 class="h4 py-2 bold "> Attn / Access</h4>
                                <CRow>
                                  <CCol v-for="i in 4" :key="i" md="4">
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
        'Item Template',
        'Questions',
        'Verifiers',
        'Attn/Access'
      ],
      activeTab: 0,
      categories: Object.values(this.$store.state.componentCategories.dataList),
      types: Object.values(this.$store.state.componentTypes.dataList),
      form : {
        name: '',
        shortname: '',
        type: null,
        category: null,
        description: null
      }
    }
  },

  created() {
    this.loadCategoriesRecords()
  },

  computed:{
    
  },

  methods: {

    loadCategoriesRecords(){
      let payload = {};
      this.$store.dispatch('componentCategories/list', payload);
    },

    loadTypesRecords(){
      let payload = {};
      this.$store.dispatch('componentTypes/list', payload);
    },

    createNewProject(){

    }
  }
}
</script>
