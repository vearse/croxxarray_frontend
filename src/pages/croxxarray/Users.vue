<template>
  <CRow>
    <CCol col="12" xl="12">
      <div class="row my-3">
          <div class="col-8">
            <h4 class="h4">{{ $route.name }}</h4>
          </div>
      </div>
      <CCard class="rounded-xl" style="min-heught: 400px;">
        <CCardBody>
            <div class="p-2">
                <div class="header clearfix">
                  <div class="float-left"> 
                    <div class="">
                      <CInput @change="handleDataListSearch" class="rounded-md " style="width:300px; height:40px;" placeholder="Search">
                        <template #prepend>
                          <div class="px-3 pt-1 border" color="gray">
                            <CIcon class="" name="cil-magnifying-glass"/> 
                          </div>
                        </template>
                      </CInput>
                    </div> 
                  </div>
                  <div class=" float-right">
                    <CButton class="bg-croxx-secondary rounded-10p mr-3 w-24 shadow-sm">  <router-link :to="'/create/user'" class="card-link" > Create </router-link> </CButton>
                    
                    <!-- <CButton class="bg-croxx-import rounded-10p w-24 shadow-sm" >Duplicate </CButton> -->
                  </div>
                </div>
            </div>

            <div class="col-12">
              <div  small="true">
                <div class="position-relative table-responsive">
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th class="inline-table-head"><div></div></th>
                        <th class="inline-table-head"><div>Name</div></th>
                        <th class="inline-table-head"><div>Client</div></th>
                        <th class="inline-table-head"><div>Segment</div></th>
                        <th class="inline-table-head"><div>Groups</div></th>
                      </tr>
                    </thead>
                    <tbody class="position-relative">
                      <tr v-if="loadingDataList || dataList.length < 1">
                        <td data-v-431cdece="" colspan="6">
                          <div data-v-431cdece="" class="text-center my-5">
                            <h2 data-v-431cdece="" v-if="loadingDataList"> Loading <svg data-v-431cdece="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="text-danger mb-2 c-icon c-icon-custom-size" width="30"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" class="ci-primary"></path></svg></h2>
                            <h2 data-v-431cdece="" v-else-if="dataList.length < 1"> No Items <svg data-v-431cdece="" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" class="text-danger mb-2 c-icon c-icon-custom-size" width="30"><path fill="var(--ci-primary-color, currentColor)" d="M425.706,86.294A240,240,0,0,0,86.294,425.705,240,240,0,0,0,425.706,86.294ZM256,48A207.1,207.1,0,0,1,391.528,98.345L98.345,391.528A207.1,207.1,0,0,1,48,256C48,141.309,141.309,48,256,48Zm0,416a207.084,207.084,0,0,1-134.986-49.887l293.1-293.1A207.084,207.084,0,0,1,464,256C464,370.691,370.691,464,256,464Z" class="ci-primary"></path></svg></h2>
                          </div>
                        </td>
                      </tr>
                      <tr v-else 
                          v-for="(item, i) in dataList" :key="i">
                          <td > 
                            <div role="group" class="custom-control custom-checkbox">
                              <input id="uid-ya7qse3inbb" type="checkbox" name="Option" class="custom-control-input" 
                                  v-model="item.id" :value="item.id">
                              <label for="uid-ya7qse3inbb" class="custom-control-label">  </label>
                            </div>
                          </td> 
                          <td @click="rowClicked(item)" class=""> 
                            <p class="font-bold"> {{item.firstname}} {{item.lastname}}    </p>  
                            <p> {{item.email}} </p>
                          </td>  
                          <td @click="rowClicked(item)" class=""> <span v-if="item.client"> {{item.client.name}}</span> </td>
                          <td @click="rowClicked(item)" class=""> <span v-if="item.segment"> {{item.segment.name}}</span> </td>
                          <td @click="rowClicked(item)" class=""> <span v-if="item.role"> {{item.role.name}}</span> </td>
                      </tr>
                    </tbody> 
                  </table>

                  <div class="my-3" v-if="tableFilters.page > 1">
                    
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
          <!-- <CDataTable
            hover
            striped
            :items="data"
            :fields="fields"
            :items-per-page="5"
            clickable-rows
            :active-page="activePage"
            @row-clicked="rowClicked"
            :pagination="{ doubleArrows: false, align: 'center'}"
            @page-change="pageChange"
          >
            <template #status="data">
              <td>
                <CBadge :color="getBadge(data.item.status)">
                  {{data.item.status}}
                </CBadge>
              </td>
            </template>
          </CDataTable> -->
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import usersData from './UsersData'
import { mapState } from 'vuex'
import _ from "lodash";

export default {
  name: 'Users',
  data () {
    return {
      tableFilters: {
        per_page: 25,
        page: 1, 
        search: null, 
        sort_by: "created_at",
        sort_dir: "desc"
      },
      activePage: 1
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page)
        }
      }
    }
  },
  
  computed: {
    ...mapState('users', {
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
  mounted(){
    this.loadRecords();
  },

  methods: {

    handleDataListSearch: _.debounce(function(searching) {
      console.log('Searching ', searching);
      this.tableFilters.search = searching;
      this.tableFilters.page = 1;
      this.loadRecords();
    }, 2000),


    loadRecords(){
      let payload = {
          ...this.tableFilters
      };
      this.$store.dispatch("users/list", payload);
    },

    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },

    rowClicked (item, index) {
      this.$router.push({path: `users/${item.id + 1}`})
    },

    pageChange (val) {
      this.$router.push({ query: { page: val }})
    }
  }
}
</script>
