<template>
  <div>
    <div class="">
        <div class="row">
            <div class="mt-2 mb-4">
              <h4 class="h4 ml-3">Overview</h4>
            </div>
        </div> 
        <div class="row">
            <div v-for="(overview, i) in overviews" :key="i"
                class="col-lg-3 col-md-6 col-sm-12 cursor-pointer">
                <CCard style="margin-right: -6px !important; margin-left: -6px !important;"
                  class="hover-shadow-md box-croxx  hove:bg-gray-100">
                  <CCardBody>
                    <div class="flex flex-row p-2">
                      <div class="py-2 mx-2">
                          <div class="bg-blue-200 w-10 h-10 inline-block align-middle rounded-full text-white">
                             <CIcon :name="overview.icon"  class="mx-auto overview-icon"/>
                          </div>
                      </div>  
                      <div class="pl-2">
                        <h6 class="h6 font-bold" v-text="overview.name"></h6>
                        <h5 class="h4" v-text="overview.total">12900</h5>
                      </div>
                    </div> 
                  </CCardBody>
                </CCard> 
            </div>
        </div>
        <div class="row">
            <div class="mt-2 mb-3">
              <h4 class="h4 ml-3">Recents Projects</h4>
            </div>
        </div> 
        <div class="row">
          <div  v-for="(overview, i) in overviews" :key="i"
            class="col-lg-3 col-md-6 col-sm-12 cursor-pointer">
              <div class="card hover-shadow-md box-croxx ">
                <div class="card-body mx-auto text-center ">
                  <p class="font-bold py-2">DP-20d WO Lower Completion</p>
                  <vue-ellipse-progress class="my-2" :size="150" :thickness="14" emptyThickness="10%"
                  :progress="25+i"/>
                  <div class="py-2">
                    <p>Overall Progress</p>
                    <small>more</small> 
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div class="row ">
          <div class="col-md-6 col-sm-12">
            <div class="">
              <div class="mt-2 mb-3">
                <h4 class="h4">Task Assigned</h4>
              </div>
              <div class="">
                <CListGroup  class="my-1">
                  <CListGroupItem class="rounded-md bg-white my-1 ">
                    <div class="row mx-0">
                      <div class="col-8">
                        <h5 class="font-bold">Project Name</h5>
                      </div>
                      <div class="col-4">
                        <h5 class="font-bold"> Task</h5>
                      </div>
                    </div>
                  </CListGroupItem>
                          
                  <!-- <CListGroupItem color="secondary" accent="secondary" >This is a secondary list group item</CListGroupItem> -->

                  <CListGroupItem  v-for="task in taskList" :key="task.id"
                    class="rounded-md bg-white my-1 hover-shadow-sm">
                    <div class="row mx-0">
                      <router-link :to="'/projects/'+task.id">
                        <div class="col-8">
                          <h5 class="">{{task.well_id}} </h5>
                        </div>
                        <div class="col-4"> 
                          <h5 class=""> Dapibus</h5>
                        </div>
                      </router-link>
                    </div>
                   </CListGroupItem>
                </CListGroup>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-sm-12">
            <div class="">
              <div class="mt-2 mb-3">
                <h4 class="h4">Approvals</h4>
              </div>
              <div class="">
                <CListGroup class="my-1">
                  <CListGroupItem class="rounded-md bg-white my-1 ">
                    <div class="row mx-0">
                      <div class="col-6">
                        <h5 class="font-bold">Project Name</h5>
                      </div>
                      <div class="col-6">
                        <h5 class="font-bold"> Task Assigned</h5>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem class="rounded-md bg-white my-1 hover-shadow-sm">
                    <div class="row mx-0">
                      <div class="col-6">
                        <h5 class="">Dapibus ac facilisis in </h5>
                      </div>
                      <div class="col-6">
                        <h5 class=""> Dapibus ac Assigned</h5>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem  class="rounded-md bg-white my-1 hover-shadow-sm">
                    <div class="row mx-0">
                      <div class="col-6">
                        <h5 class="">Morbi leo risus </h5>
                      </div>
                      <div class="col-6">
                        <h5 class=""> Dapibus ac Assigned</h5>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem class="rounded-md bg-white my-1 hover-shadow-sm">
                    <div class="row mx-0">
                      <div class="col-6">
                        <h5 class="">Porta ac consectetur ac </h5>
                      </div>
                      <div class="col-6">
                        <h5 class=""> Dapibus ac Assigned</h5>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem class="rounded-md bg-white my-1 hover-shadow-sm">
                    <div class="row mx-0">
                      <div class="col-6">
                        <h5 class="">Porta ac consectetur ac </h5>
                      </div>
                      <div class="col-6">
                        <h5 class=""> Dapibus ac Assigned</h5>
                      </div>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem class="rounded-md bg-white my-1 hover-shadow-sm">
                    <div class="row mx-0">
                      <div class="col-6">
                        <h5 class="">Porta ac consectetur ac </h5>
                      </div>
                      <div class="col-6">
                        <h5 class=""> Dapibus ac Assigned</h5>
                      </div>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </div>
            </div>

          </div>
        </div>
        
        <div class="row">
            <div class="mt-2 mb-3">
              <h4 class="h4 ml-3">Upcoming Events</h4>
            </div>
        </div> 

        <div class="row">
          <div class="col-md-4 col-sm-12">
            <CListGroup class="my-1" accent> 
                <CListGroupItem color="primary" accent="primary" class="rounded-md bg-white mb-1 hover-shadow-sm">
                  <h5 class="h5 bold">Weekly Standup</h5>
                  <p>Lorem ipsum dolor sit amet consectetur  adipisicing elit.</p>
                </CListGroupItem>
                <CListGroupItem color="secondary" accent="secondary" class="rounded-md bg-white my-1 hover-shadow-sm">
                  <h5 class="h5 bold">Team Meeting</h5>
                  <p>Lorem ipsum dolor sit amet consectetur  </p>
                </CListGroupItem>
                <CListGroupItem color="primary" accent="primary" class="rounded-md bg-white my-1 hover-shadow-sm">
                  <h5 class="h5 bold">Audit Team Standup</h5>
                  <p>Lorem ipsum dolor sit amet consectetur  adipisicing elit. </p>
                </CListGroupItem>
                <CListGroupItem color="info" accent="info" class="rounded-md bg-white mt-1 hover-shadow-sm">
                  <h5 class="h5 bold">Stakeholders Meeting</h5>
                  <p>Lorem ipsum dolor sit amet  </p>
                </CListGroupItem>
            </CListGroup>
          </div>
          <div class="col-md-8 col-sm-12">
            <v-calendar
              class="custom-calendar max-w-full"
              :masks="masks"
              :attributes="attributes"
              disable-page-swipe
              is-expanded
              style="height:370px;"
            >
              <template v-slot:day-content="{ day, attributes }">
                <div class="flex flex-col h-full z-10 overflow-hidden">
                  <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
                  <div class="flex-grow overflow-y-auto overflow-x-auto">
                    <p
                      v-for="attr in attributes"
                      :key="attr.key"
                      class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                      :class="attr.customData.class"
                    >
                      {{ attr.customData.title }}
                    </p>
                  </div>
                </div>
              </template>
            </v-calendar>
          </div> 
        </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.overview-icon{
    color: black;
    width: 2rem !important;
    height: 1.5rem !important;
    top: 4px;
    left: 4px;
    position: relative;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
.custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #F0F0F7;;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  width: 100%;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    // padding: 0 5px 3px 5px;
    padding: 6px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    border: 1px solid black;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
}
</style>


<script>
import { mapState } from 'vuex';

export default { 
  name: 'Dashboard',
  components: {
  },
  data () {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      overviews: [ 
        {name: 'Total Projects', total: 730, icon: 'cil-gift'}, 
        {name: 'Control List', total: 1900, icon: 'cil-chart-pie'},
        {name: 'Users', total: 900, icon: 'cil-user'}, 
        {name: 'Template', total: 1370, icon: 'cil-view'},
      ],

      taskList: [],
      tableFilters: {
        per_page: 25,
        page: 1, 
        search: null,
        sort_by: "created_at",
        sort_dir: "desc"
      },

      masks: {
        weekdays: 'WWW',
      },
      attributes: [
        {
          key: 1,
          customData: {
            title: 'Lunch with mom.',
            class: 'bg-red-600 text-white',
          },
          dates: new Date(year, month, 1),
        },
        {
          key: 2,
          customData: {
            title: 'Take Noah to basketball practice',
            class: 'bg-blue-500 text-white',
          },
          dates: new Date(year, month, 10),
        },
        {
          key: 2,
          customData: {
            title: 'Take Noah to basketball practice',
            class: 'bg-indigo-500 text-white',
          },
          dates: new Date(year, month, 20),
        },
      ]
    }
  },

  computed: {
      ...mapState("projects", {
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
  
  mounted() {
    this.loadUserTask();
  },

  methods: {
    color (value) {
      let $color
      if (value <= 25) {
        $color = 'info'
      } else if (value > 25 && value <= 50) {
        $color = 'success'
      } else if (value > 50 && value <= 75) {
        $color = 'warning'
      } else if (value > 75 && value <= 100) {
        $color = 'danger'
      }
      return $color
    },

    loadUserTask(){
      let payload = {
        per_page: 6,
        page: 1, 
        search: null,
        sort_by: "created_at",
        sort_dir: "desc"
      }
      this.$store.dispatch('projects/list', payload)
      .then((data) => {
        console.log(data);
        this.taskList = this.$store.state.projects.dataList;
      });
    }
  }
}
</script>
