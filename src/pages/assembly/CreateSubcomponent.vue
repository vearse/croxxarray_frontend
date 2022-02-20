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
                  <form action="" @submit.prevent="createNewSubcomponent">
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
                                      </select> <br>
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
                                      </select> <br>
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
                            <h4 class="h4 py-2 bold"> Inclusions</h4>
                            <div class="">
                               <div class="tab-members" style="height: 300px;">
                                <CTabs>
                                  <CTab  class="" style="mi-width:140px" title="Details" active>
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
                                  </CTab>
                                  <CTab  class="" style="mi-width:140px" title="CheckSheet" >
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
                                        <!-- <AddField class="ml-3"  @addChecklist="loadFields"/> -->
                                        <AddField class="ml-3"  @addChecklist="loadFields"/> 
                                      </div>
                                  </CTab>
                                </CTabs>
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
                             <h4 class="h4 py-2 bold "> Attn / Access</h4>

                            <div class="team-members">
                                 <CRow>
                                  <CCol v-for="(group,i) in group_roles" :key="i" md="4">
                                        <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold"> </label>
                                        <!-- <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold">  {{ groups.find( x =>x.id == i) }} </label> -->
                                      <div  v-for="(role,r) in group_roles[i]" :key="r"
                                        role="group" class="mb-2 form-check"
                                        ><input id="uid-kqjzgs10s7p" type="checkbox" v-model="form.access" class="form-check-input" :value="role.id">
                                        <label for="uid-kqjzgs10s7p" class="form-check-label"  v-text="role.name" />
                                      </div>
                                      
                                  </CCol> 
                                </CRow>
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
                                <h4 class="h4 py-2 bold "> Approvers</h4>
                                 <CRow>
                                        <!-- <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold">  {{ groups.find( x =>x.id == i) }} </label> -->
                                  <CCol v-for="(group,i) in group_roles" :key="i" md="4">
                                        <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold"> </label>
                                      <div  v-for="(role,r) in group_roles[i]" :key="r"
                                        role="group" class="mb-2 form-check"
                                        ><input id="uid-kqjzgs10s7p" type="checkbox" v-model="form.approvers" class="form-check-input" :value="role.id">
                                        <label for="uid-kqjzgs10s7p" class="form-check-label"  v-text="role.name" />
                                      </div>
                                  </CCol> 
                                </CRow>
                            </div>

                            
                              <div class="mt-4 flex justify-content-end">
                                  <CButton type="submit" button="submit" 
                                    class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">Save</CButton>
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
import draggable from 'vuedraggable'

export default {
  name: 'CreateProject',
  components: {
    AddQuestion,
    AddField,
    draggable
  },

  data () {
    return {
      tabs: [
        'Item Template',
        'Inclusions',
        'Attn/Access',
        'Approvers',
      ],
      activeTab: 0,
      categories: Object.values(this.$store.state.componentCategories.dataList),
      types: Object.values(this.$store.state.componentTypes.dataList),
      group_roles: (this.$store.state.roles.dataGrouped),
      // add_question: false,
      // add_field: false,
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

  created() {
    this.loadCategoriesRecords();
    this.loadTypesRecords();
  },

  computed:{
    ...mapState({
      // dataList
    })
  },

  methods: {

    loadCategoriesRecords(){
      let payload = {
        per_page: -1
      };
      this.$store.dispatch('componentCategories/list', payload);
    },

    loadTypesRecords(){
      let payload = {
        per_page: -1
      };
      this.$store.dispatch('componentTypes/list', payload);
    },

    loadNewQuestion(question){
      this.form.questions.unshift(question)
    },

    loadFields(fields){
      this.form.checksheet = fields;
    },

    createNewSubcomponent(){
      console.log(this.form);
      this.$store.dispatch('subcomponent/create', this.form)
      .then(result => {
        if (this.success !== false && this.error === false) {
          this.loadRecords();
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
