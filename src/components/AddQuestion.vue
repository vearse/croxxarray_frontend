<template>
  <div class="">
    <div class="mt-4">
       <CButton type="button"  class="bg-gray-200 " @click="question.isquestion = true"> Add Questions  <v-icon name="plus-circle" scale="1.25" class="pl-2 pt-1"></v-icon></CButton>
    </div>
    <!-- Create -->
    <CModal
      :show.sync="question.isquestion"
      :centered="true"
    >
      <template slot="header">
          <h5 class="h5 bold">{{ (question.editmode) ? 'Edit' : 'Add'  }} Question</h5>
          <button type="button" aria-label="Close" class="close text-danger" @click="question.isquestion=false"	>X</button>
      </template>
      <validation-observer ref="question" v-slot="{ invalid }">
          <form action="" > 
              <CRow>
                <CCol sm="12">
                   <validation-provider  name="Question" rules="required|min:3|max:100"
                    v-slot="validationContext">
                      <CInput
                        v-model="question.name" label="Question"  
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        placeholder="Enter your Question"
                      />
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <CRow>
                <CCol sm="12">
                    <validation-provider name="Input Type" rules="required" v-slot="validationContext">
                        <CSelect 
                          label="Input Type"  label-class="required"
                          :value.sync="question.type"
                          :invalid-feedback="validationContext.errors[0]"
                          :class="{ 'is-invalid': validationContext.errors[0] }"
                          :options="input_types"
                          placeholder="Select Input Type"
                        />
                      <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                    </validation-provider>
                </CCol> 
              </CRow>
              <CRow>
                <CCol sm="12">
                   <validation-provider  name="Measure"  rules="required"  v-slot="validationContext">
                      <CSwitch
                        class="mr-1"
                        color="primary"
                        label="Add Unit" inline
                        @update:checked="toggleMeasure()"
                        :value.sync="question.measure"
                        :checked="question.measure"
                        shape="pill"
                      /> 
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
 
                <CCol sm="12" v-if="question.measure">
                   <validation-provider  name="Unit" rules="max:2"
                    v-slot="validationContext">
                      <CInput
                        v-model="question.unit" label="Unit"  horizotal
                        :invalid-feedback="validationContext.errors[0]"
                        :class="{ 'is-invalid': validationContext.errors[0] }"
                        placeholder="cm"
                      />
                    <span class="text-error" v-if="validationContext.errors[0]">{{validationContext.errors[0]}}</span>
                  </validation-provider>
                </CCol> 
              </CRow>
              <div class="py-3 float-right">
                  <CButton type="button" button="submit" @click="addNewQuestion" :disabled="invalid"
                      class="bg-primary text-white px-4 rounded-10p mr-3  shadow-sm">{{ (question.editmode) ? 'Update' : 'Save'  }} </CButton>
              </div>
          </form>
      </validation-observer>
    </CModal>

  </div>
</template>

<script>
export default {
  name: 'AddQuestion',

  props: {
    // isquestion: { 
    //   type: Boolean,
    //   required: true,
    // }
  },

  data() {
    return {
     input_types: [
        { value: 'textbox', label: 'Textbox Input'}, 
        { value: 'radio', label: 'Choice'}, 
        { value: 'checkbox', label: 'Checkbox '}, 
        { value: 'upload', label: 'Upload '}, 
        { value: 'textarea', label: 'Textarea Input'}, 
        { value: 'date', label: 'Date '}, 
        { value: 'dropdown', label: 'Dropdown '}, 
      ], 
      question:{
        isquestion: false,
        editmode: false,
        measure: false,
        name: '',
        type: '',
        unit: ''
      }
    }
  },

  methods: {
    addNewQuestion(){
       this.$emit('newQuestion', this.question);
       this.question ={
        isquestion: false,
        editmode: false,
        measure: false,
        name: '',
        type: '',
        unit: ''
      }
    },

    toggleMeasure(){
      this.question.measure = !this.question.measure;
    }
  }
}
</script>

<style>

</style>