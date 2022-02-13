<template>
  <div class="">
    <div class="mt-4">
        <CButton type="button"  class="text-blue bg-transparent " @click="isfield=true"> Add Fields <CIcon class="pl-2" name="cil-plus"/> </CButton>
       <!-- <CButton type="button"  class="bg-blue-200 " @click="question.isquestion = true"> Add Questions <CIcon class="pl-2" name="cil-plus"/> </CButton> -->
    </div>
    <!-- Create -->
    <CModal
      :show.sync="isfield"
      :centered="true"
    >
      <template slot="header">
          <h5 class="h5 bold">Add Field</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="isfield=false"	>X</button>
      </template>
      

    </CModal>

  </div>
</template>

<script>
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
    }
  },

  methods: {
    addNewQuestion(){
       this.$emit('newQuestion', this.question)
    },

    toggleMeasure(){
      this.question.measure = !this.question.measure;
    }
  }
}
</script>

<style>

</style>