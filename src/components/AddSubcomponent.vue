<template>
  <div class="">
    <div class="mt-=4">
        <CButton type="button"  class="text-blue bg-transparent" @click="isfield=true"> Add Subcomponent <CIcon class="pl-2" name="cil-plus"/> </CButton>
       <!-- <CButton type="button"  class="bg-blue-200 " @click="question.isquestion = true"> Add Questions <CIcon class="pl-2" name="cil-plus"/> </CButton> -->
    </div>
    <!-- Create -->
    <CModal
      :show.sync="isfield"
      :centered="true"
    >
      <template slot="header">
          <h5 class="h5 bold">Add Subcomponent</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="isfield=false;">X</button>
      </template>
      <CListGroup class="my-1">
        <div>
            <div class=" header"> 
              <span class="">
                <CInput  
                  class="float-right rounded-md w-full" style=" height:40px;" placeholder="Search">
                  <template #append>
                    <div class="px-3 pt-1 border" color="gray">
                      <CIcon class="" name="cil-magnifying-glass"/> 
                    </div>
                  </template>
                </CInput>
              </span>
            </div>
        </div>
        <CListGroupItem v-for="(subcomponent, i) in subcomponent_dataList" :key="subcomponent.id"
          :class="{'bg-blue-200 ' : fields.includes(subcomponent.id) , 'bg-white': !fields.includes(subcomponent.id)}"
          class="" style="height:45px;    border-right: none; border-left: none;">  
            <!-- {{fields.includes(subcomponent.id)}} -->
            <div class="d-flex mx-0"> 
              <div class="col-7">
               <input id="uid-kqjzgs10s7p" ref="subcomponent"  type="checkbox" v-model="fields" class="form-check-input d-non" :value="subcomponent.id">
                <h5 class="font-bold">{{subcomponent.name}}</h5>
              </div>
              <div class="col-3">
                <h5 class="font-bold"> {{subcomponent.id}}</h5>
              </div>
              <div class="col-2">
                <h5 class="font-bold"> </h5>
              </div>
            </div>
            <!-- {{ subcomponent_dataList }} -->
        </CListGroupItem>
      </CListGroup>

      <div class="float-right mt-4 mb-2">
          <!-- <CButton type="button" color="primary" class="px-3 py-2" @click="onAddField"> Add </CButton> -->
            <CButton type="button" color="primary" @click="onAddField"> Add </CButton>
      </div>
    </CModal>
 
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default { 
  name: 'AddSubcomponent',

  props: {
    // isfield: { 
    //   type: Boolean,
    //   required: true,
    // }
  },

  data() {
    return {
      isfield:false,
      // subcomponent: Object.values(this.$store.state.subcomponent.dataList),
        // {id: '', default: ''}÷
      fields: [  ],
    }
  },

  computed: {
    ...mapState('subcomponent', {
        subcomponent_dataList: state =>state.dataList,
        subcomponent_dataListTotal: state => state.dataListTotal,
        subcomponent_dataListLastPage: state => state.dataListLastPage,
        subcomponent_loadingDataList: state =>state.loadingDataList,
    })
  },

  created(){
    this.loadSubcomponent();
  },

  methods: {
    loadSubcomponent(){
      let payload = {};
      this.$store.dispatch('subcomponent/list', payload);
    },

    onAddField(){
      this.$emit('addSubcomponent', this.fields);
      this.isfield =false;
    }
  }
}
</script>

<style>

</style>