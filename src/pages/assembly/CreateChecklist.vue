<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <h4 class="h4 ml-3">Create Checklist</h4>
        </div> 
        <div class="my-3">
            <CCard  class="box-croxx">
              <CCardBody>
                <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
                  <form action="" @submit.prevent="createNewCheckList">
                    <CTabs variant="" id="croxx-tab" vertical 
                      :active-tab.sync="activeTab" style="min-height: 700px;">
                      <!-- Tab 1 -->
                      <CTab active>
                        <template slot="title">
                          {{tabs[0]}} 
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        <div class="container my-4">
                            <p class="small">
                              Step 1 / 4
                            </p>
                            <h4 class="h4 py-2 bold">Field Template</h4>
                            <CRow>
                              <CCol sm="12">
                                  <validation-provider name="Name" rules="required|max:50" v-slot="validationContext">
                                      <CInput 
                                        label="Name"  label-class="required"
                                        size="lg" v-model="form.name"
                                        :invalid-feedback="validationContext.errors[0]"
                                        :class="{ 'is-invalid': validationContext.errors[0] }"
                                        placeholder="Enter preferred name for template"
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
                                      size="lg" v-model="form.description"
                                      :invalid-feedback="validationContext.errors[0]"
                                      :class="{ 'is-invalid': validationContext.errors[0] }"
                                      placeholder="Enter Template Description"
                                    />
                                  <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                            </CRow>

                            <CRow>
                              <CCol sm="12" class="my-2">  
                                  <validation-provider  name="Accepteance Criteria" rules="required|max:500" v-slot="validationContext">
                                  <label for="uid-78dm4967fch" class="col-form-label-lg"> Accepteance Criteria </label>
                                    <vue-editor
                                      id="input-description"
                                      v-model.trim="form.acceptance_criteria"     
                                      placeholder="Provide more details here..."
                                      maxlength="500" rows="2"
                                      :invalid-feedback="validationContext.errors[0]"
                                      :class="{ 'is-invalid': validationContext.errors[0] }"
                                      :state="(validationContext)" trim
                                      :editor-toolbar="customToolbar"
                                      size="sm"
                                    /> <br> 
                                  <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>

                              </CCol> 
                              <CCol sm="12" class="my-2">  
                                  <validation-provider  name="Reference Document" rules="required|max:500" v-slot="validationContext">
                                  <label for="uid-78dm4967fch" class="col-form-label-lg"> Reference Document </label>
                                    <vue-editor
                                      id="input-description"
                                      v-model.trim="form.documents"     
                                      placeholder="Provide more details here..."
                                      maxlength="500" rows="2"
                                      :invalid-feedback="validationContext.errors[0]"
                                      :class="{ 'is-invalid': validationContext.errors[0] }"
                                      :state="(validationContext)" trim
                                      :editor-toolbar="editorToolbar"
                                      size="sm"
                                    /> <br>
                                  <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                </validation-provider>
                              </CCol> 
                            </CRow>
                            <div class="flex justify-content-end">
                                <CButton type="button"  color="primary" @click="activeTab = 1"> Next Step </CButton>
                            </div>
                        </div>
                      </CTab>
                      <!-- Tab 2 -->
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
                                <CListGroupItem class="bg-croxx-secondary rounded-md" style="height:40px;">
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
                                <draggable v-model="form.questions">
                                    <transition-group name="fade" tag="div" class="instruments">
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
                                <!-- <CListGroupItem  v-for="i in 1" :key="i"
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
                                </CListGroupItem> -->

                              </CListGroup>

                              <div class="flex my-3 justify-content-center">
                                <AddQuestion v-bind:isquestion="add_question"  @newQuestion="loadNewQuestion"/> 
                              </div>


                              <div class="mt-4 flex justify-content-end">
                                  <CButton type="button"  color="primary" @click="activeTab = 2"> Next Step </CButton>
                              </div>
                            </div>
                        </div>
                      </CTab>
                      <!-- Tab 3 -->
                      <CTab>
                        <template slot="title">
                          {{tabs[2]}} 
                          <v-icon name="circle" class="dot-mode float-right "></v-icon>
                        </template>
                        
                        <div class="container my-4">
                            <p class="small">
                              Step 3 / 4
                            </p>
                            <h4 class="h4 py-2 bold"> Verifiers</h4>
                            <div class="team-members">
                                <CRow v-for="(verifier, i) in form.verifiers" :key="i">
                                  <CCol sm="5">
                                      <validation-provider name="Approval Type" rules="required" v-slot="validationContext">
                                          <CSelect 
                                            label="Approval Type"  label-class="required"
                                            size="lg"  
                                            :invalid-feedback="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            :value.sync="verifier.type"
                                            :options="input_types" 
                                            placeholder="Select Approval Type"
                                          />
                                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol>  
                                  <CCol sm="5">
                                      <validation-provider name="Job Role" rules="required" v-slot="validationContext">
                                          <CSelect 
                                            label="Job Role"  label-class="required"
                                            size="lg"
                                            :invalid-feedback="validationContext.errors[0]"
                                            :class="{ 'is-invalid': validationContext.errors[0] }"
                                            :value.sync="verifier.role" 
                                            :options="roleList"
                                            placeholder="Select Job Role"
                                          />
                                        <!-- :options="Object.values($store.state.roles.dataList)" -->
                                        <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                      </validation-provider>
                                  </CCol>
                                   <CCol sm="2"> 
                                     <div v-if="i"> 
                                      <CButton type="button"> <CIcon name="cil-trash"  class="mr-3"/> </CButton>
                                      <CButton type="button"> <CIcon name="cil-user" /> </CButton>
                                     </div>
                                  </CCol>
                                </CRow>
                            </div>
                            <div class="flex my-3 justify-content-center">
                              <CButton type="button"  class="bg-blue-200 " @click="form.verifiers.push({type: '', role: ''})"> Add Verifiers <CIcon class="pl-2" name="cil-plus"/> </CButton>
                            </div>
                              <div class="mt-4 flex justify-content-end">
                                  <CButton type="button"  color="primary" @click="activeTab = 3"> Next Step </CButton>
                              </div>
                        </div>
                      </CTab>
                      <!-- Tab 4 -->
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
                                  <!-- {{group_roles}} -->
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

                            <div class="my-3">
                                <h4 class="h4 py-2 bold "> Approvers</h4>
                                <CRow>
                                  <!-- {{}} -->
                                  <CCol v-for="(group,i) in group_roles" :key="i" md="4" >
                                      <!-- <label for="uid-78dm4967fch" class="py-2 text-primary col-form-label-lg font-bold">  {{ detail.id }} </label> -->
                                      <div  v-for="(role,r) in group_roles[i]" :key="r"
                                        role="group" class="mb-2 form-check"
                                        ><input id="uid-kqjzgs10s7p" type="checkbox" v-model="form.approvers" class="form-check-input" :value="role.id">
                                        <label for="uid-kqjzgs10s7p" class="form-check-label"  v-text="role.name" />
                                      </div>
                                      
                                  </CCol> 
                                </CRow>
                            </div>

                            
                              <!-- <div class="mt-4 flex justify-content-end">
                                  <CButton type="submit"  color="primary"> Submit </CButton>
                              </div> -->

                              
                              <div class="py-3 float-right">
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
import draggable from 'vuedraggable'
// border-r-2 border-fuchsia-600

export default {
  name: 'CreateChecklist',
  components: {
    AddQuestion,
    draggable
  },

  data () {
    return {
      tabs: [
        'Field Details',
        'Questions',
        'Verifiers',
        'Attn/Access'
      ],
      activeTab: 0, 
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"]
      ],
      editorToolbar: [
        [{ font: [] }],
        // [{ size: [] }],
        [{ header: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        ["link", "clean"]
      ],
      add_question: false,

      input_types: [
        { value: 'radio', label: 'Radio'}, 
        { value: 'checkbox', label: 'Checkbox '}, 
        { value: 'upload', label: 'Upload '}, 
      ], 
      
      group_roles: (this.$store.state.roles.dataGrouped),
      groups:(this.$store.state.groups.dataList),

      form : {
        name: '', 
        description: '',
        acceptance_criteria: '',
        documents: '',
        type: '',
        questions: [],
        verifiers: [ 
          {type: '', role: ''}
        ],
        access: [],
        approvers: [],
      }
    }
  },

   computed:{
    ...mapState('roles', {
       roleList: state => state.dataList.map((role) => {
        role.label = role.name;
        role.value = role.id;
        return role;
      }),
    })
    // roles: this.$store.state.roles.dataList.map((role) => {
    //   role.label = role.name,
    //   role.value = role.id
    // })
  },

  created() {
    this.loadRolesRecords()
    this.loadGroupRecords()
  },

 

  methods: {

    displayGroupName(index){
      // var gp = groups.find( x => x.id == index);
      // console.log(gp);
      // return gp.name;
    },

    loadRolesRecords(){
      let payload = {
        per_page : -1
      }; 
      this.$store.dispatch('roles/list', payload);
    },

    loadGroupRecords(){
      let payload = {
        per_page : -1
      }; 
      this.$store.dispatch('groups/list', payload);
    },

    loadNewQuestion(question){
      this.form.questions.unshift(question)
      
    },

    createNewCheckList(){
      this.$store.dispatch('checklist/create', this.form)
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
    },

    updateCheckbox(value){
      console.log(value);
    }
  }
}
</script>
