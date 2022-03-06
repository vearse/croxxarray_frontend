<template>
  <div>
    <div class="container">
        <div class="row my-3">
            <div class="col-12">
              <h4 class="h4">{{ $route.name }}</h4>
            </div>
            <div class="col-12">
                <CNav variant="tabs">
                  <CNavItem to="/assembly"  >
                    Subcomponent
                  </CNavItem>
                  <CNavItem to="/assembly/subassembly">
                    Sub-assembly
                  </CNavItem>
                  <CNavItem to="/assembly/checklist" active>
                    Checklist
                  </CNavItem>
                </CNav>
            </div>
        </div>  
        <div class="row">
            <div class="col">
              <CCard class="rounded-xl p-0" style="min-height: 400px;">
                <CCardBody> 
                  <div class="p-2">
                      <div class="header clearfix">
                        <div class="float-left"> 
                          <div class="">
                            <CInput class="rounded-md " style="width:300px; height:40px;" placeholder="Search">
                              <template #prepend>
                                <div class="px-3 pt-1 border" color="gray">
                                  <CIcon class="" name="cil-magnifying-glass"/> 
                                </div>
                              </template>
                            </CInput> 
                          </div> 
                        </div>
                        <div class=" float-right">
                          <CButton class="bg-croxx-secondary rounded-10p mr-3 w-24 shadow-sm">  <router-link :to="'/assembly/checklist/create'" class="card-link" > Create </router-link> </CButton>
                         
                          <!-- <CButton class="bg-croxx-import rounded-10p w-24 shadow-sm" >Duplicate </CButton> -->
                        </div>
                      </div>
                  </div>
                  <div class="col-12">
                    <div class="">
                      <div  small="true">
                        <div class="position-relative table-responsive">
                          <table class="table table-hover">
                            <thead> 
                              <tr>
                                <th class="inline-table-head"><div></div></th>
                                <th class="inline-table-head"><div>Name</div></th>
                                <th class="inline-table-head"><div>Questions</div></th>
                                <th class="inline-table-head"><div>Attn/Access</div></th>
                                <th class="inline-table-head"><div>Author</div></th>
                              </tr>
                            </thead>
                            <tbody class="position-relative">
                            
                              <tr v-if="dataList.length < 1">
                                <td data-v-431cdece="" colspan="6">
                                  <div data-v-431cdece="" class="text-center my-5">
                                    <!-- <h2 data-v-431cdece="" v-if="loadingDataList"> Loading <svg data-v-431cdece="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="text-danger mb-2 c-icon c-icon-custom-size" width="30"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" class="ci-primary"></path></svg></h2> -->
                                    <h2 data-v-431cdece="" v-if="dataList.length < 1"> No Items <svg data-v-431cdece="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="text-danger mb-2 c-icon c-icon-custom-size" width="30"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" class="ci-primary"></path></svg></h2>
                                  </div>
                                </td>
                              </tr>
                              <tr v-else
                                
                                  v-for="(item, i) in dataList" :key="i"> 
                                  <td >
                                    <div role="group" class="custom-control custom-checkbox">
                                      <input id="uid-ya7qse3inbb" type="checkbox" name="Option 1" class="custom-control-input" value="[object Object]">
                                      <label for="uid-ya7qse3inbb" class="custom-control-label">  </label>
                                    </div>
                                  </td>
                                  <td class="">{{item.id}} {{item.name}} </td> 
                                  <td class=""> {{item.total_questions}} </td> 
                                  <td class=""> 
                                      <div  v-for="(access) in item.checklist_access" :key="access.id">
                                        <span class="mr-2">  {{access.name}}, </span>
                                      </div>
                                  </td> 
                                  <td class=""> 
                                       <span v-if="item.author">{{item.author.firstname}} {{item.author.lastname}}</span>   <br>
                                       {{ item.created_at  | moment("Do MMMM, YYYY H i") }}
                                   </td>
                              </tr> 
                            </tbody>
                          </table> 
 
                          <div class="my-3"> 
                            
                            <CPagination
                              :activePage.sync="tableFilters.page"
                              :pages="dataListLastPage"
                              v-on:update-activePage="handlePageChange"
                              :goto="true"
                              align="end" 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CCardBody>
              </CCard>
            </div>
        </div>
    </div>
  </div>
</template>
<style scoped>

</style>

<script>
import { mapState } from 'vuex'
import usersData from '../../views/users/UsersData' 

export default {
  name: 'Clients',
  components: {  },

  data () {
    return {
      createModal: false,
      detailModal: false,
      tableFilters: {
        per_page: 2,
        page: 1, 
        search: null,
        sort_by: "created_at",
        sort_dir: "desc"
      },
      items: usersData,
      form: {
        name: '',
        description: '',
        qcp_ip: '',
      }
    }
  },

  mounted() {
    this.loadRecords()
  }, 

  computed:{
      ...mapState('checklist', {
        loading: state =>state.loading,
        loadingDataList: state =>state.loadingDataList,
        error: state => state.error,
        success: state => state.success,
        validationErrors: state => state.validationErrors,
        data: state => state.data,
        dataList: state =>state.dataList,
        dataListTotal: state => state.dataListTotal,
        dataListLastPage: state => state.dataListLastPage,
      })   
  },

  methods: {
    handlePageChange(e){
      console.log(e)
    },

    createNewClient(){
      console.log(this.form);
      this.$store.dispatch('checklist/create', this.form);
    },

    loadRecords(){
      let payload = {};
      this.$store.dispatch('checklist/list', payload);
    }
  }
}
</script>
