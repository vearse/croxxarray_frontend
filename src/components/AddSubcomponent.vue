<template>
  <div class="">
    <div class="mt-4">
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
        <CListGroupItem v-for="(subcomponent, i) in subcomponent_dataList" :key="subcomponent.id"
          class="bg-white" style="height:30px;">
          <input id="uid-kqjzgs10s7p" type="checkbox" v-model="fields" class="form-check-input" :value="subcomponent.id">
            <div class="row mx-0">
              <div class="col-6">
                <h5 class="font-bold">{{subcomponent.name}}</h5>
              </div>
              <div class="col-4">
                <h5 class="font-bold"> {{subcomponent.id}}</h5>
              </div>
              <div class="col-2">
                <h5 class="font-bold"> </h5>
              </div>
            </div>
        </CListGroupItem>
      </CListGroup>
       <CButton type="button" color="primary" @click="onAddField"> Add </CButton>
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
      fields: [
        {id: '', default: ''}
      ],
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
      this.$emit('addsubcomponent', this.fields);
      this.isfield =false;
    }
  }
}
</script>

<style>

</style>