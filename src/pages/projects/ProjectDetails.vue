<template>
  <div>
    <div class="container-fluid">
        <div class="row my-3">
          <div class="col-6"> 
            <h4 class="h4">{{$route.params.name}}</h4>
          </div>
          <div class="col-6"></div>
        </div>
        <div class="row mt-2 mb-4">
            <div  style="width: 18.5%;margin-right: 15px !important;"  class="" v-for="i in 5" :key="i">
              <CCard style="margin-right: -6px !important; margin-left: -6px !important;"
                class="hover-shadow-md box-croxx  hove:bg-gray-100">
                <CCardBody>
                  <div class="flex flex-row">
                    <div class="px-2">
                      <h6 class="h6 font-bold">Well Name</h6>
                      <h5 class="h5">12900</h5>
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
                      <div v-if="isTeam" class="col-9">
                        <div >
                            
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
                      <CTabs v-else class="col-9">
                          <CTab  class="col" title="List" active>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam harum adipisci animi quos repellendus assumenda nulla vitae quaerat, voluptate dicta debitis odio, iusto explicabo error officia sapiente soluta commodi numquam.</p>
                          </CTab>
                          <CTab  class="col" title="Details" >
                            <p>Dons</p>
                          </CTab>
                          <CTab  class="col" title="MakeUp Plans" >
                             
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
      activeTab: 0,
      isTeam: false,
      roles: Object.values(this.$store.state.roles.dataList),
      wells: Object.values(this.$store.state.wells.dataList),
      employees: Object.values(this.$store.state.groups.dataList),
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
