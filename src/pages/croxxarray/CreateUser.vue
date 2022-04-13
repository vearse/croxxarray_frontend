<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <h4 class="h4 ml-3">Create User</h4>
        </div> 
        <div class="my-3">
            <CCard  class="box-croxx">
              <CCardBody>
                <validation-observer ref="form" v-slot="{ invalid, handleSubmit }">
                  <form action="" @submit.prevent="handleSubmit(createNewUser)">
                    <div class="mx-auto my-4" style="max-width:500px">
                        <div class="my-3">
                          <img src="" alt=""  class="img img-circle text-center" 
                             @click="$refs.fileInputPhoto.click()" style="width:150px; height: 150px;"  />
                           
                          <!-- PHOTO UPLOAD FROM FIELDS -->
                          <input
                            ref="fileInputPhoto"
                            style="display: none;"
                            accept="image/*"
                            type="file"
                            @change="selectPhotoFile"
                          />
                        </div>

                        <div class="my-0">
                          <validation-provider  name="Name" rules="required|min:3"  v-slot="validationContext">
                            <CInput size="lg" type="text"
                              :invalid-feedback="validationContext.errors[0]"
                              :class="{ 'is-invalid': validationContext.errors[0] }"
                              v-model="form.name" label="Name"/>
                            <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                          </validation-provider>
                        </div>

                        <div class="my-0">
                          <validation-provider  name="Email" rules="required|email"  v-slot="validationContext">
                            <CInput size="lg" type="text"
                              :invalid-feedback="validationContext.errors[0]"
                              :class="{ 'is-invalid': validationContext.errors[0] }"
                               v-model="form.email" label="Email"/>
                            <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                          </validation-provider>
                        </div>

                        <div class="my-0">
                          <validation-provider  name="Username" rules="required|min:3"  v-slot="validationContext">
                            <CInput size="lg" type="text"
                              :invalid-feedback="validationContext.errors[0]"
                              :class="{ 'is-invalid': validationContext.errors[0] }"
                               v-model="form.username" label="Username"/>
                            <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                          </validation-provider>
                        </div>

                        <div class="">
                            <validation-provider name="Client" rules="required" v-slot="validationContext">
                              <label for="">Client</label>
                              <select 
                                  :invalid="validationContext.errors[0]" 
                                  :class="{ 'is-invalid': validationContext.errors[0] }"
                                  v-model="form.client_id" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                  <option value="" selected="selected"> Select Client </option> 
                                  <option :key="client.id" :value="client.id" v-for="client in clients" >{{client.name}} </option>
                              </select>
                                <br><span class="text-error mt-1" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                            </validation-provider>
                        </div>
                        <div class="">
                            <validation-provider name="Role" rules="required" v-slot="validationContext">
                              <label for="">Role</label>
                              <select 
                                  :invalid="validationContext.errors[0]" 
                                  :class="{ 'is-invalid': validationContext.errors[0] }"
                                  v-model="form.role_id" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                  <option value="" selected="selected"> Select Role </option> 
                                  <option :key="role.id" :value="role.id" v-for="role in roles" >{{role.name}} </option>
                              </select>
                                <br><span class="text-error mt-1" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                            </validation-provider>
                        </div> 
                        <div class="">
                            <validation-provider name="Segment" rules="required" v-slot="validationContext">
                              <label for="">Segment</label>
                              <select 
                                  :invalid="validationContext.errors[0]" 
                                  :class="{ 'is-invalid': validationContext.errors[0] }"
                                  v-model="form.segment_id" id="uid-mu3370ovqhi" vertical="" class="form-control form-control-lg">
                                  <option value="" selected="selected"> Select Segment </option> 
                                  <option :key="segment.id" :value="segment.id" v-for="segment in segments" >{{segment.name}} </option>
                              </select>
                                <br><span class="text-error mt-1" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                            </validation-provider>
                        </div>
                        
                        <div class="my-0">
                          <validation-provider  name="Password" rules="required|min:8"  v-slot="validationContext">
                            <CInput size="lg" type="password"
                              :invalid-feedback="validationContext.errors[0]"
                              :class="{ 'is-invalid': validationContext.errors[0] }"
                              v-model="form.password"  label="Password"/>
                            <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                          </validation-provider>
                        </div>

                        <div class="d-block mt-3 mb-5">
                            <div class="float-left">
                              <button>Cancel</button>
                            </div>
                            <div class="float-right">
                                 <CButton type="submit" color="primary"> Save </CButton>
                            </div>
                        </div>
                    </div>
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
      segments: Object.values(this.$store.state.segments.dataList),
      clients: Object.values(this.$store.state.clients.dataList),
      job_types: Object.values(this.$store.state.jobTypes.dataList),
      
      form : {
        photo: '',
        name: "",
        email: "",
        username: "",
        client_id: "",
        role_id: "",
        segment_id: "",
        password: ""
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

    selectPhotoFile(e) {
      this.form.photo = e.target.files[0];
      console.log(this.form.photo)
      // this.uploadPhoto();
    },

    createNewUser(){
      console.log(this.form);
      
      this.$store.dispatch("users/create", this.form)
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
