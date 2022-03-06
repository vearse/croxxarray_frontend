<template>
  <div class="">
    <div class="mt-4">
        <CButton type="button"  class="text-blue bg-transparent" @click="isfield=true"> Add Fields <CIcon class="pl-2" name="cil-plus"/> </CButton>
       <!-- <CButton type="button"  class="bg-blue-200 " @click="question.isquestion = true"> Add Questions <CIcon class="pl-2" name="cil-plus"/> </CButton> -->
    </div>
    <!-- Create -->
    <CModal
      :show.sync="isfield"
      :centered="true"
    >
      <template slot="header">
          <h5 class="h5 bold">Add Fields</h5>
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
        <CListGroupItem v-for="(checklist, i) in checklist_dataList" :key="checklist.id"
          :class="{'bg-blue-200 ' : fields.includes(checklist.id) , 'bg-white': !fields.includes(checklist.id)}"
          class="" style="height:45px;    border-right: none; border-left: none;">  
            <!-- {{fields.includes(checklist.id)}} -->
            <div class="d-flex mx-0"> 
              <div class="col-7">
               <input id="uid-kqjzgs10s7p" ref="checklist"  type="checkbox" v-model="fields" class="form-check-input d-non" :value="checklist.id">
                <h5 class="font-bold">{{checklist.name}}</h5>
              </div>
              <div class="col-3">
                <h5 class="font-bold"> {{checklist.id}}</h5>
              </div>
              <div class="col-2">
                <h5 class="font-bold"> </h5>
              </div>
            </div>
            <!-- {{ checklist_dataList }} -->
        </CListGroupItem> 
      </CListGroup>
      <div class="float-right mt-4 mb-2">
          <CButton type="button" color="primary" class="px-3 py-2" @click="onAddField"> Add </CButton>
      </div>
    </CModal>
 
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default { 
  name: 'AddField',

  props: {
    // isfield: { 
    //   type: Boolean,
    //   required: true,
    // }
  },

  data() {
    return {
      isfield:false,
      // checklist: Object.values(this.$store.state.checklist.dataList),
      fields: [],
    }
  },

  computed: {
    ...mapState('checklist', {
        checklist_dataList: state =>state.dataList,
        checklist_dataListTotal: state => state.dataListTotal,
        checklist_dataListLastPage: state => state.dataListLastPage,
        checklist_loadingDataList: state =>state.loadingDataList,
    })
  },

  mounted(){
    this.loadChecklist();
  },

  methods: {
    loadChecklist(){
      let payload = {};
      this.$store.dispatch('checklist/list', payload);
    },

    onAddField(){
      this.$emit('addChecklist', this.fields);
      this.isfield =false;
    }
  }
}
</script>

<style>

</style>