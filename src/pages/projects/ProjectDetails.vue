<template>
  <div>
    <div class="container-fluid">
        <div class="row my-3">
            <h4 class="h4">{{data.code}} </h4>
        </div>
        <div class="row mt-2 mb-3">
            <div  style="width: 18.5%;margin-right: 16px !important;"  class="" v-for="(info, i) in infos" :key="i">
              <CCard style="margin-right: -6px !important; margin-left: -6px !important;"
                class="hover-shadow-sm box-croxx  hove:bg-gray-10">
                <CCardBody>
                  <div class="flex flex-row">
                    <div class="px-2">
                      <h6 class="h6 font-bold"> {{ info.label }}  </h6>
                      <h5 class="text-md text-muted">{{info.value}}</h5>
                    </div>
                  </div> 
                </CCardBody>
              </CCard> 
            </div>
        </div> 
        <div class="row my-3">
            <CCard  class="box-croxx w-full">
              <CCardHeader>
                <h4 class="h4 d-inline pl-4" v-if="isTeam"> Add Team Members</h4>
                <h4 class="d-inline h4 pl-4" v-else>Equipment List</h4> 
                <div class="card-header-actions">
                  <a 
                    href="https://coreui.io/vue/docs/components/card-components" 
                    class="card-header-action" 
                    rel="noreferrer noopener" 
                    target="_blank">
                    <small class="text-muted">docs</small>
                  </a>
                  <button class="btn " @click="isTeam =  !isTeam">Team</button>
                </div>
              </CCardHeader>
              <CCardBody>
                <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
                  <form action="" @submit.prevent="createNewProject()" style="min-height: 700px;">
                      <!-- Team -->
                      <div v-if="isTeam" class="col-9">
                        <div >
                              {{data.teams}}
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
                                              <option :key="employee.id" :value="employee.id" v-for="employee in employees" >{{employee.name}} </option>
                                          </select>
                                            <br>
                                            <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                                        </validation-provider>
                                    </CCol> 
                                  </CRow>
                              </div>
                        </div>
                      </div>
                      <!-- Equipment List -->
                      <CTabs v-else class="col-9">
                          <CTab  class="col" title="Details" active>
                              <div class="mt-4">
                                <div>
                                  <CListGroupItem class="mb-2" 
                                    v-for="(list, index) in data.equipment_list" :key="list.id"
                                    @click="detail_accord = index" 
                                  >
                                    <div 
                                      class="rounded-md bg-white my-1 c">
                                      <h5 class="m-0" v-text="list.name"></h5>
                                      <hr v-if="index === detail_accord" class="mt-2">
                                    </div>
                                    <CCollapse :show="index === detail_accord">
                                      <CCardBody>
                                        {{ list.project_details }} 
                                      </CCardBody>
                                    </CCollapse>
                                  </CListGroupItem>
                                </div>
                              </div>
                          </CTab>
                          <CTab  class="col" title="List" >
                              <div class="mt-4">
                                <div>
                                  <CListGroupItem class="mb-0" 
                                   v-for="(list, index) in data.equipment_list" :key="list.id"
                                    @click="list_accord = index" >
                                    <div 
                                      class="rounded-md bg-white my-1 c">
                                      <h5 class="m-0" v-text="list.name"></h5>
                                    </div>
                                    <CCollapse :show="index === list_accord">
                                      <CCardBody>
                                        {{ list }} {{list_accord}}
                                      </CCardBody>
                                    </CCollapse>
                                  </CListGroupItem>
                                </div>
                              </div>
                          </CTab>
                          <CTab  class="col" title="MakeUp Plans" >
                            
                              <div class="mt-4">
                                <CTabs>
                                  <div v-for="(makeup, index) in data.makeup_plans" :key="makeup.id">
                                    <CTab :title="makeup.name" style="min-width: 75px">
                                      <div class="my-3"> 
                                        <CListGroupItem class="mb-0" 
                                          v-for="(list, index) in makeup.field_list" :key="list.id"
                                          @click="list_accord = index" >
                                          <div 
                                            class="rounded-md bg-white my-1 c">
                                            <h5 class="m-0" v-text="list.name"></h5>
                                          </div>
                                          <CCollapse :show="index === list_accord">
                                            <CCardBody>
                                              {{list}}
                                               <div v-for="(question, id) in list.checklist_questions" :key="id">
                                                  <CListGroupItem 
                                                      class="px-0 hover-shadow-sm bg-light mb-2 border-none" style="height: 36px">
                                                      <div class="row mx-0 pb-2 ">
                                                        <div class="col-5">
                                                          <p class="text-sm truncate">{{question.name}} </p>
                                                        </div>
                                                        <div class="col-6">
                                                          <p class="text-sm truncate"> {{question.answers}}</p>
                                                        </div>
                                                        <div class="col-1">
                                                            <v-icon name="trash" class="mr-4"></v-icon>
                                                        </div>
                                                      </div>
                                                    </CListGroupItem>
                                                </div>
                                            </CCardBody>
                                          </CCollapse>
                                        </CListGroupItem>
                                      </div>
                                    </CTab> 
                                  </div>
                                </CTabs>
                              </div>
                            
                            
                          </CTab>
                          <CTab  class="col" title="Final Approvals" >
                             
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
      id: this.$route.params.name,
      activeTab: 0, 
      detail_accord: 0,
      list_accord: 1,
      isTeam: false,

      roles: Object.values(this.$store.state.roles.dataList),
      wells: Object.values(this.$store.state.wells.dataList),
      employees: Object.values(this.$store.state.groups.dataList),
      job_types: Object.values(this.$store.state.jobTypes.dataList),

      infos : [
        // {label: 'Well Name', value: this.data.well.name },
        // {label: 'Job Type', value: this.data.job_type.name },
        // {label: 'Job Number', value: this.data.job_number },
        // {label: 'Job Start', value: this.data.job_start },
        // {label: 'Planned Loadout', value: this.data.planned_loadout }
      ],
      
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
    ...mapState("projects", {
        loading: state => state.loading,
        loadingDataList: state => state.loadingDataList,
        error: state =>  state.error,
        success: state =>  state.success,
        validationErrors: state =>  state.validationErrors,
        data: state =>  state.data,
        dataList: state => state.dataList,
        dataListTotal: state =>  state.dataListTotal,
        dataListLastPage: state =>  state.dataListLastPage,
    })
  },

  methods: {

    loadRecords(){
      this.$store.dispatch('projects/view', this.id)
      .then(() => {
        console.log(this.data);
         this.infos = [
            {label: 'Well Name', value: this.data.well.name },
            {label: 'Job Type', value: this.data.job_type.name },
            {label: 'Job Number', value: this.data.job_number },
            {label: 'Job Start', value: this.data.job_start },
            {label: 'Planned Loadout', value: this.data.planned_loadout }
          ]
      });
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
