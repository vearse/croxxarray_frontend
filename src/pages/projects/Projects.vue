<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <h4 class="h4 ml-3">{{$route.name}}</h4>
        </div> 
        <div class="my-3">
            <div class="row">
              <div  v-for="(overview, i) in overviews" :key="i"
                class="col-lg-3 col-md-6 col-sm-12 cursor-pointer">
                  <div class="card hover-shadow-md box-croxx ">
                    <div class="card-body mx-auto text-center ">
                      <p class="font-bold py-2">DP-2{{i}}d WO Lower Completion</p>
                      <vue-ellipse-progress class="my-2" :size="150" :thickness="14" emptyThickness="10%"
                      :progress="20+(5*i)"/>
                      <div class="py-2">
                        <p>Overall Progress</p>
                        <small>more</small> 
                      </div>
                    </div>
                  </div>
              </div>
            </div>
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
  name: 'Projects',
  components: {},

  data () {
    return {
      tabs: [
        'Wells Data',
        'Equipment List',
        'Team'
      ],
      activeTab: 0,
      form : {
        well_id: null, 
        job_type_id: null,
        job_number: null,
        job_tart: null,
        planned_loadout: null
      },
      overviews: [ 
        {name: 'Total Projects', total: 730, icon: 'cil-gift'}, 
        {name: 'Control List', total: 1900, icon: 'cil-chart-pie'},
        {name: 'Users', total: 900, icon: 'cil-user'}, 
        {name: 'Template', total: 1370, icon: 'cil-view'},
        {name: 'Total Projects', total: 730, icon: 'cil-gift'}, 
        {name: 'Control List', total: 1900, icon: 'cil-chart-pie'},
        {name: 'Users', total: 900, icon: 'cil-user'}, 
        {name: 'Template', total: 1370, icon: 'cil-view'},
        {name: 'Total Projects', total: 730, icon: 'cil-gift'}, 
        {name: 'Control List', total: 1900, icon: 'cil-chart-pie'},
        {name: 'Users', total: 900, icon: 'cil-user'}
        // {name: 'Template', total: 1370, icon: 'cil-view'},
        // {name: 'Users', total: 900, icon: 'cil-user'}, 
        // {name: 'Template', total: 1370, icon: 'cil-view'},
      ],
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

    createNewProject(){

    }
  }
}
</script>
