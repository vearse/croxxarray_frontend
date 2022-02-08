<template>
  <div>
    <div class="container">
        <div class="row mt-2 mb-4 ">
            <div class="col-8">
              <h4 class="h4 ml-3">Configurations</h4>
            </div>
            <div class="col-4">
            </div> 
        </div>  
        <div class="row">
            <div v-for="(config, i) in configurations" :key="i" 
                 class="col-lg-4 col-md-6 col-sm-12 cursor-pointer">
                <CCard style="height: 130px" class="hover-shadow-md box-croxx">
                  <CCardBody>
                    <router-link :to="config.route" class="card-link">
                    <div class="py-2">
                      <h5 class="h5 text-primary">{{config.name}}
                          <span class="float-right mr-3">
                          
                          </span>
                        </h5>
                      <p>{{config.description}}</p>
                    </div> 
                    </router-link>
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

export default {
  name: 'ProjectDatabase',
  components: {},

  data () {
    return {

       configurations: [
         {name: 'Groups', route: '/groups', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Roles', route: '/roles', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Business Units', route: '/segments', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Subcomponent Types', route: '/components/types', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'},
         {name: 'Subcomponent Categories', route: '/components/categories', description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit'}
       ]
    }
  }
}
</script>
